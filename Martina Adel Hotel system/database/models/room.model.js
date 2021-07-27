const mongoose = require('mongoose')
const roomSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'User'
    // },
    roomNo:{
        type:Number,
        required:true,
        unique:true
    },
    floorNo:{
        type:Number,
        required:true
    },
    roomType: {
        type:String,
        enum: ['single', 'double', 'suite'],
        required:true
    },
    roomStatus:{
        type:String,
        enum: ['empty', 'reserved', 'busy']
    },
    Notes:{
        type:String,
        trim:true
    }
},
{timestamps:true}
)
const Room = mongoose.model('room', roomSchema)
module.exports = Room