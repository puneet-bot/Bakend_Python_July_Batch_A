const    mongoose      =   require('mongoose');
mongoose.connect(`mongodb+srv://amit917480:ZFjZXc0monj2uIVL@cluster0.va40ryr.mongodb.net/Google_Contacts`);
const   db             =   mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting Database"));
db.once('open',function(){
    console.log("DB is Connected!");
});
module.exports=db;