const express = require("express")
const router = express.Router()
const bookController = require('../controller/book-controller')

router.get('/', bookController.getBooks)
router.get('/:id', bookController.getBook)
router.post('/', bookController.addBook)
router.put('/:id', bookController.editBook)
router.delete('/:id', bookController.deleteBook)

// router.get('/', (req, res) => {
//     res.send('get book code')
// })
// router.post('/', (req, res) => {
//     res.send('post book code')
// })
// router.put('/', (req, res) => {
//     res.send('put book code')
// })
// router.delete('/', (req, res) => {
//     res.send('delete book code')
// })

module.exports = router