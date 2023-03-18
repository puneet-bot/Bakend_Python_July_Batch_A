const express           = require('express');
const app               = express();
const port              = 8000;

app.use('/',require('./routes'));

app.listen(port,()=>{
    console.log(`App Running on port: ${port}`);
})





