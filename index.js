const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// User: Genius-car-mechanic
//Password: cGc4PTfte32QmOrj
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ijtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




const run = async () => {
    try {
        await client.connect();

        const database = client.db("carMechanic");
        const servicesCollection = database.collection("services");


        //GET API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });



        // POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('Hitting services', service)

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running Genius Server');
});

app.get('/hello', (req, res) => {
    res.send('hello updated here');
})

app.listen(port, () => {
    console.log('Running Genius Server on port ', port);
})