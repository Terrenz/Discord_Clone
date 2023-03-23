import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mongoData from './mongoData.js';
import Pusher from 'pusher';

// App config
const app = express();
const port = process.env.PORT || 8002;

const pusher = new Pusher({
 appId: "1266452",
 key: "3ad5c4d198734093731b",
 secret: "cd96641e3f49d82b80c4",
 cluster: "us2",
 useTLS: true
});

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
const mongoURI = 'mongodb+srv://admin:QbqHhb4QqCkhWPPW@cluster0.ztjzb.mongodb.net/discordDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
 useCreateIndex: true,
 useNewUrlParser: true,
 useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
 console.log('DB is connected')

 const changeStream = mongoose.connection.collection('conversations').watch()

 changeStream.on('change', (change) => {
  if (change.operationType === 'insert') {
   pusher.trigger('channels', 'newChannel', {
    'change': change
   });
  } else if (change.operationType === 'update') {
   pusher.trigger('conversation', 'newMessage', {
    'change': change
   })
  } else {
   console.log('Error triggering Pusher')
  }
 })
})

// API routes

app.get('/', (req, res) => {
 res.status(200).send('Hello World')
})

app.post('/new/channel', (req, res) => {
 const dbData = req.body;
 mongoData.create(dbData, (err, data) => {
  if (err) {
   res.status(500).send(err)
  } else {
   res.status(201).send(data)
  }
 })
})

app.get('/get/channelList', (req, res) => {
 mongoData.find((err, data) => {
  if (err) {
   res.status(500).send(err)
  } else {
   let channels = [];

   data.map((channelData) => {
    const channelInfo = {
     id: channelData.id,
     name: channelData.channelName,
    }
    channels.push(channelInfo)
   })
   res.status(201).send(channels)
  }
 })
})

app.post('/new/message', (req, res) => {
 const newMessage = req.body

 mongoData.updateOne(
  { _id: req.query.id },
  { $push: { conversation: req.body } },
  (err, data) => {
   if (err) {
    console.log('Error saving message...')
    console.log(err)

    res.status(500).send(err)
   } else {
    res.status(201).send(data)
   }
  }
 )
})

app.get('/get/data', (req, res) => {
 mongoData.find((err, data) => {
  if (err) {
   res.status(500).send(err)
  } else {
   res.status(200).send(data)
  }
 })
})

app.get('/get/conversation', (req, res) => {
 const id = req.query.id;

 mongoData.find({ _id: id }, (err, data) => {
  if (err) {
   res.status(500).send(err)
  } else {
   res.status(200).send(data)
  }
 })
})

// Listener

app.listen(port, () => {
 console.log(`Listening on localhost:${port}`)
})