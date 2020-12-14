<<<<<<< HEAD
const express = require('express')
const router = express.Router()

const menuEditor = require('../menueditor/menuEditor')

router.get('/',menuEditor.SingleShowAll)
router.post('/search',menuEditor.SingleSearch)
router.post('/store',menuEditor.SingleStore)
router.post('/update',menuEditor.SingleUpdate)
router.post('/delete',menuEditor.SingleDelete)

module.exports = router
=======
const express = require('express')
const router = express.Router()

const menuEditor = require('../menueditor/menuEditor')

router.get('/',menuEditor.SingleShowAll)
router.post('/search',menuEditor.SingleSearch)
router.post('/store',menuEditor.SingleStore)
router.post('/update',menuEditor.SingleUpdate)
router.post('/delete',menuEditor.SingleDelete)

module.exports = router
>>>>>>> origin/00757034
