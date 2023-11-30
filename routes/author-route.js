const express = require("express")
const router = express.Router()
const authorController = require('../controller/author-controller')

router.get('/', authorController.getAuthors)
router.get('/:id', authorController.getAuthor)
router.post('/', authorController.addAuthor)
router.put('/:id', authorController.editAuthor)
router.delete('/:id', authorController.deleteAuthor)

// router.get('/', (req, res) => {
//     res.send('get author code')
// }) 
// router.post('/', (req, res) => {
//     res.send('post author code')
// }) 
// router.put('/', (req, res) => {
//     res.send('put author code')
// }) 
// router.delete('/', (req, res) => {
//     res.send('delete author code')
// })

module.exports = router