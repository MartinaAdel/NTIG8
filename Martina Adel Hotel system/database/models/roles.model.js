const mongoose = require('mongoose')

// i have 4 roles
//  super admin
//  admin
//  receptionist
//  user

const rolesSchema = new mongoose.Schema({
    roleTitle:{
        type:String, 
        unique:true, 
        required:true, 
        trim:true
    }
})

const Myroles = mongoose.model('Myroles', rolesSchema)
module.exports=Myroles