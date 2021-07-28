const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const macaddress = require('macaddress');

const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    Lname: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    password: {
        type: String,
        trim: true,
        required: true,
        //match:
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid Email')
        }
    },
    phone: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'ar-EG')) throw new Error('Invalid Phone')
        }
    },
    nationalID: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isNumeric(value, { no_symbols: true }).isLength({ min: 14, max: 14 })) throw new Error('Invalid NationalID')
        }
    },
    address:
    {
        type: String,
        trim: true

    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Myroles',
        default: "60febd5f3944df6ec529eaf9"          //defualt id of role "user"
    },
    tokens: [{
        token: { type: String },
        macAddress: { type: String, unique: true }
    }]
})
// hide some data
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    deletedElements = ["password", "tokens"]
    deletedElements.forEach(element => {
        delete user[element]
    });
    return user
}

userSchema.pre('save', async function () {
    let user = this
    if (this.isModified('password') || this.isNew) {
        let salt = await bcrypt.genSalt(10)
        if (!salt) throw new Error('invalid salt')
        let hash = await bcrypt.hash(user.password, salt)
        if (!hash) throw new Error('invalid hash')
        user.password = hash
    }
})

//login
userSchema.statics.findByCreditionals = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('invalid email')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('invalid password')
    return user
}
//generate token
userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWTKEY)
    let obj = {}
    await macaddress.one(function (err, mac) {
        if (err) throw new Error('error in get mac address')
        console.log("Mac address for this host: %s", mac);
        obj = {
            token: token,
            macAddress: mac
        };
        user.tokens = user.tokens.concat(obj)
    });
    
    await user.save()
    return token
}
//relation
userSchema.virtual('userReservation', {
    ref: "Reservation",
    localField: "_id",
    foreignField: "userId"
})
//cascade relations

const User = mongoose.model('User', userSchema)
module.exports = User