const router = require("express").Router()
const entry =require("../models/entry.js")
const isSignedIn = require("../middleware/is-signed-in.js")

router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

router.get('/my-entries', isSignedIn, async (req, res) => {
    try {
        const entries = await entry.find({ owner: req.session.user._id })
        res.render('entries/my-entries.ejs', { entries })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router;
