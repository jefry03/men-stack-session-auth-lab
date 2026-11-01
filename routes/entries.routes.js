const router = require("express").Router();
const Entry = require("../models/entry.js");
const isSignedIn = require("../middleware/is-signed-in.js");
router.get("/new", isSignedIn, async (req, res) => {
res.render("entries/new.ejs");
})
router.post('/', isSignedIn, async (req, res) => {
    try {
        await Entry.create({
            title: req.body.title,
            entryBody: req.body.entryBody,
            isPublic: req.body.isPublic === 'on',
            owner: req.session.user._id
        })
        res.redirect('/my-entries')
    } catch (error) {
        console.log(error)
        res.redirect('/entries/new')
    }
})
router.get('/', async (req, res) => {
    try {
        const entries = await Entry.find
        ({ isPublic: true }).populate('owner', 'username')
        res.render('entries/all-entries.ejs', { entries })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
module.exports = router;