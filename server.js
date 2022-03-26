const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5001
// const cors = require('cors')

const app = express()

connectDB()

// init middleware
// allows us to get data within bodies of req/res
app.use(express.json({ extended: false }))
// app.use(cors())

app.get('/', (req, res) => res.send('squib API Running'))

// define routes

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
