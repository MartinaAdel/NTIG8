const Room = require('../../database/models/room.model')
class RoomClass {
    static add = async (req, res) => {
        try {
            const roomToAdd = new Room(req.body)
            await roomToAdd.save()
            res.status(200).send({
                apiStatus: true,
                data: roomToAdd,
                message: "room added"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                date: e.message,
                message: "error in add room"
            })
        }
    }
    static getMyRooms = async (req, res) => {
        try {
            // await req.user.populate({
            //     path:"userRooms"
            // }).execPopulate()

            const data = await Room.find()
            res.status(200).send({
                apiStatus: true,
                data: data,
                message: "data fetched"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in fetched data"
            })
        }
    }
    static changeStatus = async (req, res) => {
        try {
            const room = await Room.findById(req.params.id)
            if (!room) throw new Error("there is no room with id " + req.params.id)
            room.roomStatus = req.body.status
            await room.save()
            res.status(200).send({
                apiStatus: true,
                data: room,
                message: "room status updated"
            })

        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in change status"
            })
        }
    }
}
module.exports = RoomClass