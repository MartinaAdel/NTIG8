const Role = require('../../database/models/roles.model')
class MyRoles {
    static addRole = async (req, res) => {
        try {
            let role = new Role(req.body)
            await role.save()
            res.status(200).send({
                apiStatus: true,
                data: role,
                message: "role added"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in add role"
            })
        }
    }
    static getAll = async (req, res) => {
        try {
            let data = await Myroles.find()
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
                message: "error in show all data"
            })
        }
    }

}

module.exports = MyRoles

