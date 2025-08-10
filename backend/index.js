const connectToMongo = require('./db'); 
connectToMongo(); 

const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()); 
//Available Routes 
// app.get('/', (req, res) => {
//   res.send('Hello Gouri!')
// })

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`inotebook backend listening on port ${port}`)
})
