const connectToMongoo= require('./db.js');

const express = require('express');
var cors = require('cors')
const app = express()
connectToMongoo();
app.use(cors())
app.use(express.json());
// routes
app.use('/api/auth',require('./routes/auth'))

 app.use('/api/notes', require('./routes/notes'))
const port = 5000
app.listen(port, () => {
    console.log(`iNoteBook listening at http://localhost:${port}`)
  })