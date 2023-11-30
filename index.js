// Memanggil package
const express = require('express')
// Memanggil file buatan sendiri
const bookRouter = require('./routes/book-route')
const authorRouter = require('./routes/author-route')
const authRouter = require('./routes/auth-router')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const accessTokenSecret = '2023-WikramA-exp'

// Menjalankan framework express
const app = express()
// Memberitahu kalau project express ini ketika mengirmkan data. Hanya bisa menggunakan format json
app.use(express.json())
// Mengubah req dari url menjadi tipe format json, dan membaca karakter khusus sebagai string
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(cors())

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized' })
        }
        next()
    })
}

const PORT = 3000

app.use('/auth', authRouter)
app.use('/book', bookRouter)
app.use('/author', authorRouter)
app.get('/book/:id/:bookname/:year', (req, res) => {
    res.send(req.params)
})
app.get('/filter', (req, res) => {
    res.send(req.query)
})

// app.get('/', (req, res) => res.send('Hello World'))
// app.get('/wikrama', (req, res) => res.send('Hello Wikrama'))
// app.get('/about', (req, res) => res.send('Halo ini adalah halaman about'))

app.listen(PORT, () => 
    console.log(`Server berjalan di http://localhost:${PORT}`)
)