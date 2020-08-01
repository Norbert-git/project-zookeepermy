const Enclosure = require('../models/enclosure')
const Animal = require('../models/animal') // in case we decide to delete animals when enclosures are deleted

const newView = (req, res) => {
    res.render('enclosures/new.ejs')
}

const create = async (req, res) => {
    try {
        await Enclosure.create(req.body)
        res.redirect('/enclosures')
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const index = async (req, res) => {
    try {
        const allEnclosures = await Enclosure.find({})
        res.render('enclosures/index.ejs', {
            enclosures: allEnclosures
        })
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const show = async (req, res) => {
    try {
        const foundEnclosure = await Enclosure.findById(req.params.id)
            .populate('animals')
            // .populate('comments')
        res.render('enclosures/show.ejs', {
            enclosure: foundEnclosure
        })
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const deleteData = async (req, res) => {
    try {
        const deletedEnclosure = await Enclosure.findByIdAndDelete(req.params.id)
        // what do we do with the animals??? 
        // move them to unspecified enclosure?
        // delete them entirely?
        Animal.deleteMany({
            _id: {
                $in: deletedEnclosure.animals
            }
        })
        
        res.redirect('/enclosures')
    
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const edit = async (req, res) => {
    try {
        const foundEnclosure = await Enclosure.findById(req.params.id)
        res.render('enclosures/edit.ejs', {
            enclosure: foundEnclosure
        })
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const update = async (req, res) => {
    try {
        await Enclosure.findOneAndUpdate(req.params.id, req.body)
        res.redirect('/enclosures/' + req.params.id)
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

module.exports = {
    new: newView,
    create,
    index,
    show,
    delete: deleteData,
    edit,
    update
}