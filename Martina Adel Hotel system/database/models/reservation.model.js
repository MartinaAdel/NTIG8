const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    checkIn:{
        type:Date,
    },
    checkOut:{
        type:Date,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Room'
    },
    services:[{
        service:{ type: String,trim: true}
    }]

},
{timestamps:true}
)
const Reservation = mongoose.model('Reservation', reservationSchema)
module.exports = Reservation