const mongoose=require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    birthdate:{
        type: String,
    },
    address1:{
        type: String,
    },
    address2:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    zip:{
        type: String,
    }
}, {
    timestamps: true
});

const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;