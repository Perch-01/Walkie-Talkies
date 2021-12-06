const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const socketio = require('socket.io');
const routes = require('./app/routes');
const databaseConfiguration = require('./app/config/database.config');
const corsOptions = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'HEAD',
    'OPTIONS',
    'PUT'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept',
  ],
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); //to parse requests of content type - application/json
app.use(bodyParser.urlencoded({ extended: true })); //parse requests of content-type - application/x-www-form-urlencoded

const database = require("./app/models");

const initial = async () => {
  //This is an initial function run after connecting to mongo
}

database.mongoose.connect(
  `mongodb+srv://${databaseConfiguration.USER}:${databaseConfiguration.PASSWORD}@cluster0.43s4t.mongodb.net/${databaseConfiguration.NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Successfully connected to the MongoDB database!");
    initial();
  }).catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use('/', routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(404).send({ error: "Route not found" })
  next();
});

// Port that listens for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: [
      'GET',
      'POST',
      'HEAD',
      'OPTIONS',
      'PUT'
    ]
  }
});
const activeUsers = {};
io.on('connection', socket => {
  //console.log('New connection');
  socket.on('login', data => {
    activeUsers[data?.userId] = {
      socketId: socket?.id,
      ...data,
    };
    io.emit('updatedActiveUsers', Object.keys(activeUsers));
  });
  socket.on('logout', () => {
    //console.log('User logged out');
    const keys = Object.keys(activeUsers);
    for (let i = 0; i < keys.length; i++)
      if (activeUsers[keys[i]].socketId == socket?.id) {
        delete activeUsers[keys[i]];
        break;
      };
    io.emit('updatedActiveUsers', Object.keys(activeUsers));
  });
  socket.on('sendMessageSocketIO', data => {
    const { friendId } = data;
    const keys = Object.keys(activeUsers);
    const index = keys.indexOf(friendId);
    if (index != -1) {
      const currentSocketIO_ID = activeUsers[keys[index]]?.socketId;
      io.to(currentSocketIO_ID).emit('recieveMessageSocketIO', data)
    }
  })
  socket.on('disconnect', () => {
    //console.log('User disconnected');
    const keys = Object.keys(activeUsers);
    for (let i = 0; i < keys.length; i++)
      if (activeUsers[keys[i]].socketId == socket?.id) {
        delete activeUsers[keys[i]];
        break;
      }
    io.emit('updatedActiveUsers', Object.keys(activeUsers));
  })
});
