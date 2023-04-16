const express           = require('express');
const app               = express();
const port              = 8000;
const layouts           = require('express-ejs-layouts');
const mongoose          = require('./config/mongoose');
const bodyParser        = require('body-parser');
const db                = require('./config/mongoose');
const session           = require('express-session');
const passport          = require('passport');
const passportLocal     = require('./config/passport');
const mongoStore        = require('connect-mongo');
const sassMiddleware    = require('node-sass-middleware');
const path              = require('path')

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'assets', 'scss')
  , dest: path.join(__dirname, 'assets', 'css')
  , debug: true
  , outputStyle: 'extended'
  , prefix:  '/css'
}));

app.use(bodyParser.urlencoded({ extended: false }))

//Using Express-ejs-layout feature 
app.use(layouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    name: 'Google_Contacts',
    // TODO change the secret before deployment in production mode
    secret: '12346',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: mongoStore.create({
        mongoUrl: db._connectionString,
        autoRemove: 'disabled'
      })
}));
app.use(express.static('assets'));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));


app.listen(port,()=>{
    console.log(`App Running on port: ${port}`);
})

