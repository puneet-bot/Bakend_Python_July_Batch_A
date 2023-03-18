const express           = require('express');
const app               = express();
const router            =   express.Router();

console.log('here in the router');
router.get('/',function(req,res){
    res.send('<h1>Hello from routes</h1>');
})

router.get('/sample',(request,response)=>{
    response.send('here in the sample file');
})

module.exports=router;