const express           = require('express');
const app               = express();
const port              = 8000;
const layouts           = require('express-ejs-layouts');
const mongoose          = require('./config/mongoose');
const bodyParser        = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

//Using Express-ejs-layout feature 
app.use(layouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/',require('./routes'));


app.listen(port,()=>{
    console.log(`App Running on port: ${port}`);
})

