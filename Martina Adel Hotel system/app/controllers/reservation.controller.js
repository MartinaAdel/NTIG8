const Reservation = require('../../database/models/reservation.model')
class ReservationClass {
    static add = async (req, res) => {
        try {
            const reservationToAdd = new Reservation(req.body)
            await reservationToAdd.save()
            res.status(200).send({
                apiStatus: true,
                data: reservationToAdd,
                message: "Reservation added"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                date: e.message,
                message: "error in add Reservation"
            })
        }
    }
    static getAllReservations = async (req, res) => {
        try {
            const data = await Reservation.find()
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
    
    static getMyReservations = async (req, res) => {
        try {
            const data = await req.user.populate({
                path:"userReservation"
            }).execPopulate()

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
    static cancel = async (req, res) => {
        try {
            let reservation = await Reservation.findById(req.params.id)
            if (!reservation) throw new Error("there is no reservation with id " + req.params.id)

            await reservation.remove()
            res.status(200).send({
                apiStatus: true,
                data: reservation,
                message: "reservation canceled"
            })

        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in canceled"
            })
        }
    }
}
module.exports = ReservationClass