const express = require('express');
const exphs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const conn = require('./db/conn');
require('dotenv').config();



const app = express();

//template engine
app.engine('handlebars', exphs.engine());
app.set('view engine', 'handlebars');

// set path
app.use(express.static('public'));

//body response
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

//models
const Tought = require('./models/Tought');
const User = require('./models/User');

//session middleware
app.use(session({
  name: "session",
  secret: "nosso_secret",
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function(){},
    path: require('path').join(require('os').tmpdir(), 'sessions'),
  }),
  cookie: false,
  maxAge: 360000,
  expires: new Date(Date.now() + 360000),
  httpOnly: true
}));

//flash messages
app.use(flash());

//set session to res
app.use((req, res, next) => {
  if(req.session.userid) {
    res.locals.session = req.session
  }
  next();
});

//import routes
const toughtsRoutes = require('./routes/toughtsRoutes');
const ToughtController = require('./controllers/ToughtController');
const authRoutes = require('./routes/authRoutes');

//routes
app.use('/toughts', toughtsRoutes);
app.use('/', authRoutes);

//import controller
app.get('/', ToughtController.showToughts);


// connect database
conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch(err => console.log(err))
