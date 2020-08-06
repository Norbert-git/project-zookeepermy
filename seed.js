require('dotenv').config()
const mongoose = require('mongoose')
const db = require('./models')
const animals = require('./controllers/animals')

const enclosures_list = [
    {
        "name": "Lions",
        "keeper": "Beverly",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/SUhB9xf"
    }, {
        "name": "Tigers",
        "keeper": "Worf",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/vR5Nl9X"
    }, {
        "name": "Bears",
        "keeper": "Will",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/dl6U8Eb"
    }, {
        "name": "Elephants",
        "keeper": "Data",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/s8Lgca4"
    }, {
        "name": "Wolves",
        "keeper": "Geordi",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/QYCzdxp"
    },  {
        "name": "Reptiles",
        "keeper": "Deanna",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/Iur6cpI"
    },  {
        "name": "Primates",
        "keeper": "Jean-Luc",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/RxIn1q4"
    },  {
        "name": "Birds",
        "keeper": "Wesley",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/DevN12D"
    }, {
        "name": "Dolphins",
        "keeper": "Geordi",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": "https://imgur.com/vJPr97h"
    }   
]

class Animal {
    constructor(name, species, keeper, img, index) {
        this.name = name
        this.species = species
        this.age = Math.floor(Math.random() * 10) + 1
        this.lastChecked = new Date()
        this.lastKeeper = keeper
        this.comments = 'None'
        this.currentMeds = 'None'
        this.img = img,
        this.enclosureIndex = index
    }
}

//#region Animal Names
const lions = ["Simba", "Mufasa", "Scar", "Nala", "Georgia", "Nelly"]
const tigers = ["Sheeba", "Milo", "Otis", "Jimmy", "Tokiko"]
const bears = ["Griz", "Bubba", "Eddie", "Saphron", "Wally"]
const elephants = ["Dumbo", "Alto", "Othello", "Clarissa", "Brock"]
const wolves = ["Baltar", "Perseus", "Doug", "Malik", "Jacob"]
const reptiles = ["Bilbo", "Sammy", "Smithe", "Alexi", "Saruman", "Greg"]
const primates = ["Jane", "Tarzan", "Kerchak", "George", "Uyen"]
const birds = ["Tucan", "Sam", "Iago", "Smiley", "Bob", "Stephano"]
const dolphins = ["Flipper", "Darwin", "Shimmer", "Dieter", "Molly"]
//#endregion

// TODO: add enclosure indexes
const animals_list = [
    ...lions.map(lion => {
        return new Animal(lion, 'Lion', 'Toki', 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/E0F0/production/_112548575_gettyimages-492611032-1.jpg', 0)
    }),
    ...tigers.map(tiger => {
            return new Animal(tiger, 'Tiger', 'James', 'https://c402277.ssl.cf1.rackcdn.com/photos/18134/images/priority_species/Medium_WW226365.jpg?1574452099', 1)
    }),
    ...bears.map(bear => {
        return new Animal(bear, 'Bear', 'Manny', 'https://i.guim.co.uk/img/media/bcd9b1ca747ed4d274a70eb884f70ef91f5d313b/0_81_1440_864/master/1440.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=112135b354f88abd3187c3bdba0a9e99', 2)
    }),
    ...elephants.map(elephant => {
        return new Animal(elephant, 'Elephant', 'Norbert', 'https://i0.wp.com/africanelephantjournal.com/wp-content/uploads/2020/02/190124_Tim_Ryan_Wilkie.jpg.jpg?fit=2048%2C1280&ssl=1', 3)
    }),
    ...wolves.map(wolf => {
        return new Animal(wolf, 'Wolf', 'Jelani', 'https://img.apmcdn.org/5d713a4d4e43cf212c9a4792aa2f68aa954d1731/square/588c9d-20171019-wolf.jpg', 4)
    }),
    
    ...reptiles.map(reptile => {
        return new Animal(reptile, 'Reptile', 'Marissa', 'https://images.earthtouchnews.com/media/385812/Palmatogecko-rangei_Namib-gecko_2014_08_19.jpg', 5)
    }),
    ...primates.map(primate => {
        return new Animal(primate, 'Primate', 'Seth', 'https://www.sustainability-times.com/wp-content/uploads/thumbs/photo-1540573133985-87b6da6d54a9-38rh6ylbrs98vl3ftqg5xc.jpg', 6)
    }),
    ...birds.map(bird => {
        return new Animal(bird, 'Bird', 'Christy', 'https://ichef.bbci.co.uk/news/1024/branded_news/67CF/production/_108857562_mediaitem108857561.jpg', 7)
    }),
    ...dolphins.map(dolphin => {
        return new Animal(dolphin, 'Dolphin', 'Uyen', 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/06/931/524/Dolphin-istock.jpg?ve=1&tl=1', 8)
    })
]

const seedDb = async () => {
    console.log('running seedDb')
    try {
        // create enclosures
        await db.Enclosure.deleteMany({})
        console.log('removed all enclosures')
        const enclosures = await db.Enclosure.create(enclosures_list)
        console.log('recreated all enclosures')
        console.log(`created ${enclosures.length} enclosures`)
        // create animals
        await db.Animal.deleteMany({})
        console.log('removed all animals')
        const animals = await db.Animal.create(animals_list)
        console.log('recreated all animals')
        console.log(`created ${animals.length} animals`)
        
        // assign animals based on enclosure index
        const allEnclosures = await db.Enclosure.find({})
        // console.log('allEnclosures:') // TODO: remove
        // console.log(allEnclosures) // TODO: remove
        const allAnimals = await db.Animal.find({})
        // console.log('allAnimals:') // TODO: remove
        // console.log(allAnimals) // TODO: remove
        for (let i = 0; i < animals_list.length; i++) {
            const animalToAdd = await db.Animal.findOne({'name': animals_list[i].name})
            console.log(animalToAdd)
            const animalEnclosure = allEnclosures[animals_list[i].enclosureIndex]
            console.log(animalEnclosure)
            await allEnclosures[animals_list[i].enclosureIndex].animals.push(animalToAdd._id)
            await allEnclosures[animals_list[i].enclosureIndex].save()
            
            // console.log(allEnclosures[animals_list[i].enclosureIndex])
        }
    } catch (err) {
        console.error(err)
    } finally {
        mongoose.connection.close()
    }
}

seedDb()