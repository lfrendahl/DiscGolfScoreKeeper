const { MongoClient }  = require('mongodb');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 2121
require('dotenv').config()


//MONGOCLIENT
const uri = process.env.DB_STRING;
const client = new MongoClient(uri);


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//Routes go here

//READ:

app.get('/', async (req, res) => {
    let players = await client.db('DiscGolfScoreKeeper')
                        .collection('players')
            .find().sort({score: 1}).toArray()
   
    return res.render('index.ejs', {info: players})
    })
   


//CREATE /addPlayer 
app.post('/addPlayer', async (req, res) => {
   await client.db('DiscGolfScoreKeeper')
                        .collection('players')
                        .insertOne({playerName: req.body.playerName, score: 0})
        console.log('New player added')
    return res.redirect('/')
    })



//UPDATE - RAISE score
app.put('/addOneStroke', async (req, res) => {
    await client.db('DiscGolfScoreKeeper')
                        .collection('players')
                        .updateOne({playerName: req.body.playerNameCur, score: req.body.scoreCur},{
        $set: {
            score:req.body.scoreCur + 1
        }
    },{
       sort: {_id: -1},
       upsert: true 
    })
    
        console.log('Added a stroke to score')
        res.json('Stroke added')
})


//UPDATE - LOWER score
app.put('/removeOneStroke', async (req, res) => {
    await client.db('DiscGolfScoreKeeper')
                    .collection('players')
                    .updateOne({playerName: req.body.playerNameCur, score: req.body.scoreCur},{
        $set: {
            score:req.body.scoreCur - 1
        }
    },{
       sort: {_id: -1},
       upsert: true 
    })
        console.log('Removed a stroke from score')
        res.json('Stroke removed')
    })

//DELETE: deleteOne
app.delete('/deletePlayer', async(req, res) => {
    await client.db('DiscGolfScoreKeeper')
                    .collection('players')
                    .deleteOne({playerName: req.body.playerNameCur || ''})
        console.log('Player deleted')
        res.json('Player deleted')
})








/*OLD CONNECT
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'DiscGolfScoreKeeper'

    app.get('/',(request, response) =>{
    db.collection('players').find().sort({score: 1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data})
    })
    .catch(error => console.error(error))
})
//CREATE /addPlayer 
app.post('/addPlayer', (request, response) => {
    db.collection('players').insertOne({playerName: request.body.playerName, score: 0})
    .then(result => {
        console.log('New player added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

//UPDATE - RAISE score
app.put('/addOneStroke', (request, response) => {
    db.collection('players').updateOne({playerName: request.body.playerNameCur, score: request.body.scoreCur},{
        $set: {
            score:request.body.scoreCur + 1
        }
    },{
       sort: {_id: -1},
       upsert: true 
    })
    .then(result => {
        console.log('Added a stroke to score')
        response.json('Stroke added')
    })
    .catch(error => console.error(error))
})

//UPDATE - LOWER score
app.put('/removeOneStroke', (request, response) => {
    db.collection('players').updateOne({playerName: request.body.playerNameCur, score: request.body.scoreCur},{
        $set: {
            score:request.body.scoreCur - 1
        }
    },{
       sort: {_id: -1},
       upsert: true 
    })
    .then(result => {
        console.log('Removed a stroke from score')
        response.json('Stroke removed')
    })
    .catch(error => console.error(error))
})

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
}) 

//DELETE: deleteOne
app.delete('/deletePlayer', (request, response) => {
    db.collection('players').deleteOne({playerName: request.body.playerNameCur || ''})
    .then(result => {
        console.log('Player deleted')
        response.json('Player deleted')
    })
    .catch(error => console.error(error))*/


//Connect to the database before listening MONGOCLIENT
client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});
