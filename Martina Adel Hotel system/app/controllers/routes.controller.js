const Myroutes = require('../../database/models/allRoutes.model')
class MyroutesX {
    static addRoute = async (req, res) => {
        try {
            let routes = new Myroutes(req.body)
            await routes.save()
            res.status(200).send({
                apiStatus: true,
                data: routes,
                message: "routes added"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in add route"
            })
        }
    }
    static getAll = async (req, res) => {
        try {
            let data = await Myroutes.find()
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
    static addRole = async (req, res) => {
        try {
            let _id = req.params.id
            let role = req.body.role
            let r = await Myroutes.findById(_id)
            r.roles = r.roles.concat(role)
            await r.save()
            res.status(200).send({
                apiStatus: true,
                data: r,
                message: "role added successfully"
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

}

module.exports = MyroutesX

