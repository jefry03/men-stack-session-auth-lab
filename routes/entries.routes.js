const router = require("express").Router();
const Entry = require("../models/entry.js");
const isSignedIn = require("../middleware/is-signed-in.js");

router.get('/new', (req, res) => {
  res.render('entries/new.ejs');
});

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




router.get('/:id/edit', isSignedIn, async (req, res) => {
    try {
        const entry = await Entry.findOne({
            _id: req.params.id,
            owner: req.session.user._id
        })
        if (!entry) return res.redirect('/entries')
        res.render('entries/edit.ejs', { entry })
    } catch (error) {
        console.log(error)
        res.redirect('/entries')
    }
})

router.put('/:id', isSignedIn, async (req, res) => {
    try {
        await Entry.findOneAndUpdate(
            { _id: req.params.id, owner: req.session.user._id },
            {
                title: req.body.title,
                entryBody: req.body.entryBody,
                isPublic: req.body.isPublic === 'on'
            },
            { runValidators: true }
        )
        res.redirect('/my-entries')
    } catch (error) {
        console.log(error)
        res.redirect('/entries')
    }
})


router.delete('/:id', isSignedIn, async (req, res) => {
    try {
        await Entry.findOneAndDelete({
            _id: req.params.id,
            owner: req.session.user._id
        })
        res.redirect('/my-entries')
    } catch (error) {
        console.log(error)
        res.redirect('/entries')
    }
})



module.exports = router;