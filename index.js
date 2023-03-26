const express= require('express');
const path=require('path');
const port=8000;

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));

app.get('/google',function(req,res)
{
    return res.render('google',{title:"google page"});
}

);
