//development functions:
//for fun




global.thisLine = () => {
  const e = new Error();
  const regex = /\((.*):(\d+):(\d+)\)$/
  const match = regex.exec(e.stack.split("\n")[2]);
  return ":" + match[2];
}

global.echo = (filename, ...objects) => {
  let file = filename.replace(__dirname, "");
  console.log(file + " ", ...objects);
};
//end development functions

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');


//multer 
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    //file upload destination
    if(file.mimetype == 'image/jpeg'){
    callBack(null, 'upload/backgrounds')
    }
    else if(file.mimetype == 'audio/mpeg'){
      callBack(null, 'upload/audio')
    }

  },
  //filename on upload
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })


require('dotenv').config();


import expressAdapter from './src/express-callback'; 
import { listSceneProps } from './src/controllers/prop';
import { listSessions, postSession, listActiveSession }  from './src/controllers/session';
import { postScene, listAllScenes } from './src/controllers/scene';
import { listAllUsers, postUser } from './src/controllers/user';
import { pathToFileURL } from 'url';

app.use(express.static(process.cwd() + "/frontend/angular/dist/HU3Deck"));
app.use(express.static(process.cwd() + "/frontend/vr"));
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.get('/sessions/:id', expressAdapter(listSessions));
app.get('/session/active', expressAdapter(listActiveSession));
app.post('/sessions/create', expressAdapter(postSession));

//scene
app.get('/scenes', expressAdapter(listAllScenes));
app.post('/scenes/create', expressAdapter(postScene));
app.get('/scene/:id/props', expressAdapter(listSceneProps));

//user
app.get('/users', expressAdapter(listAllUsers));
app.post('/users/create', expressAdapter(postUser));


app.get('/vr-environment', (req, res) => {
  res.sendFile(__dirname + "/frontend/vr/index.html");
});

app.get('/*', (req, res) => {
  res.sendFile(process.cwd() + "/frontend/angular/dist/HU3Deck/index.html");
});


//multer
app.post('/file', upload.fields([{
    name: 'file', maxCount: 1
},{
    name: 'audio', maxCount: 1
}]), function(req, res, next) {
  const files = req.files;
  console.log(files);
  if(!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files);
});


io.on('connection', (s) => {
  console.log('a user connected');
  
  s.on("change scene", (data) => {
    io.emit('change background', data); 
  });
  
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});