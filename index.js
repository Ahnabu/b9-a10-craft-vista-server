const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cn1yph8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const data = [
    {
        "image_url": "https://i.ibb.co/N2Jw9JT/image.png",
        "item_name": "Handmade Greeting Cards Set",
        "subcategory_Name": "Card Making",
        "short_description": "Set of 10 handmade greeting cards for various occasions.",
        "price": 12.99,
        "rating": 4.5,
        "customization": "Yes",
        "processing_time": "1-2 business days",
        "stockStatus": "In stock",
        "User_Email": "user1@example.com",
        "User_Name": "Alice"
    },
    {
        "image_url": "https://i.ibb.co/6w7Xqjg/image.png",
        "item_name": "Scrapbooking Kit",
        "subcategory_Name": "Scrapbooking",
        "short_description": "Complete kit with scrapbooking papers, embellishments, and tools.",
        "price": 29.99,
        "rating": 4.7,
        "customization": "No",
        "processing_time": "3-5 business days",
        "stockStatus": "In stock",
        "User_Email": "user2@example.com",
        "User_Name": "Bob"
    },
    {
        "image_url": "https://i.ibb.co/kmf1jKw/image.png",
        "item_name": "Paper Quilling Starter Kit",
        "subcategory_Name": "Paper Quilling & Origami",
        "short_description": "Beginner-friendly kit with paper strips and tools for quilling and origami projects.",
        "price": 19.99,
        "rating": 4.8,
        "customization": "No",
        "processing_time": "2-3 business days",
        "stockStatus": "In stock",
        "User_Email": "user3@example.com",
        "User_Name": "Charlie"
    },
    {
        "image_url": "https://i.ibb.co/jkWZFTT/image.png",
        "item_name": "Glass Painting Kit",
        "subcategory_Name": "Glass Painting",
        "short_description": "Kit with glass paints and brushes for creating beautiful painted glass artworks.",
        "price": 49.99,
        "rating": 4.6,
        "customization": "Yes",
        "processing_time": "5-7 business days",
        "stockStatus": "In stock",
        "User_Email": "user4@example.com",
        "User_Name": "David"
    },
    {
        "image_url": "https://i.ibb.co/fGq7p6M/image.png",
        "item_name": "Handmade Glass Beads",
        "subcategory_Name": "Lampworking",
        "short_description": "Artisan-made glass beads perfect for jewelry making.",
        "price": 12.99,
        "rating": 4.9,
        "customization": "Yes",
        "processing_time": "3-4 business days",
        "stockStatus": "In stock",
        "User_Email": "user5@example.com",
        "User_Name": "Emily"
    },
    {
        "image_url": "https://i.ibb.co/GnkV4RY/image.png",
        "item_name": "Stained Glass Art Kit",
        "subcategory_Name": "Glass Dying & Staining",
        "short_description": "DIY kit for creating beautiful stained glass artworks at home.",
        "price": 39.99,
        "rating": 4.7,
        "customization": "Yes",
        "processing_time": "4-6 business days",
        "stockStatus": "Made to Order",
        "User_Email": "user6@example.com",
        "User_Name": "Frank"
    }
]


// server link : https://a10-server-2b2043hi4-abu-horairas-projects.vercel.app
// sesh e deploy kore local host gula re update kore dite hobe.
//// mongoimport --db artCollection --collection arts --file path/to/data.json --jsonArray
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const artCollection = client.db('artCollection').collection('arts');
        app.get('/arts', async (req, res) => {

            const cursor = artCollection.find();
            const result = await cursor.toArray();

            res.send(result);
        })
        app.post('/addArt', async (req, res) => {
            const newArt = req.body;
            const arts = await artCollection.insertOne(newArt)
            res.send(arts)
        })
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await artCollection.findOne(query);
            res.send(result);
        })

        app.get('/myArt/:email', async (req, res) => {
            const email = req.params.email
            console.log(req.params);
            const result = await artCollection.find({ User_Email: email }).toArray()
           
        

            res.send(result)
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
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
