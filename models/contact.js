const mongoose=require('mongoose');
const multer        =require('multer');
const path          =require('path');
const CONTACT_PATH   =path.join('/uploads');


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
    },
    image:{
        type:String
    }
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',CONTACT_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  contactSchema.statics.uploadedAvatar=multer({ storage: storage }).single('profile');
  contactSchema.statics.avatarPath=CONTACT_PATH;
const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;