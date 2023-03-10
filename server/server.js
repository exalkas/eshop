const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

require('dotenv').config()

const dbConnect = require('./config/db')
dbConnect() // connects to db

app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN || '*'
}))

app.use(cookieParser())
app.use(express.json()) // needed to parse the body of the request

app.use('/users', require('./routes/userRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/categories', require('./routes/categoryRoutes'))

app.get('/', (req, res) => {
    console.log('Hello from route')

    res.send('Hello from express')
})

// syntax app.use('path', express.static('storedpathofthefile'))
app.use('/images', express.static('./server/uploads'))

const port = process.env.PORT || 4001
app.listen(port, () => console.log('Server is up and running at port', port))

// app.use(express.static('client/build'));

// if( process.env.NODE_ENV === 'production' ) {

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }