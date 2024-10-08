const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { text } = require('express');

// Course selling payment
// const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
// ------------------------

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.00oqpy6.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const demoCourses = client.db('alloy').collection('demo');
        const communityPost = client.db('alloy').collection('community');


        // Demo course .....api
        app.get('/demoCourses', async (req, res) => {
            const result = await demoCourses.find().toArray();
            res.send(result);
        })

        // insert communityPost to database 
        app.post('/communityPost', async (req, res) => {
            const newPost = req.body;
            const result = await communityPost.insertOne(newPost);
            res.send(result);
        })

        // communityPost get
        app.get('/communityPost', async (req, res) => {
            const result = await communityPost.find().toArray();
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('alloy is running')
})

app.listen(port, () => {
    console.log(`alloy API is running on port: ${port}`)
})

