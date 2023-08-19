const       nodeMailer      =       require('nodemailer');
const       ejs             =       require('ejs');
const       path            =       require('path');
const      secret           =       require('../config/secret');

let transporter = nodeMailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:secret.email,
        pass:secret.password
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in creating template",err);
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}