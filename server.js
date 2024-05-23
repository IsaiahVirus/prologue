const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname));
const fs = require('fs');
const { MongoClient, Binary, ServerApiVersion } = require('mongodb');
 
 
const uri = "mongodb+srv://claudewalker:pUDjRAFnq18TXnp6@prologue-entries.dwlc0le.mongodb.net/?retryWrites=true&w=majority&appName=prologue-entries";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function connectToMongoDB() {
    try {
      await client.connect();
      console.log("Connected successfully to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async function closeMongoDBConnection() {
    try {
      await client.close();
      console.log("MongoDB connection closed.");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
      throw error;
    }
  }


const multer = require('multer');
const port = 5000;


const upload = multer({ dest: 'uploads/' });

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("entries").collection("_submission").findOne({ authorName: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

findOneListingByName(client, "sdf");


async function submitFormSubmission(email, authorName, genre, attachmentPath, fileData) {
    try {
      const submission = {
        email,
        authorName,
        genre,
        reviewStatus: "New",
        comments: '',
        attachment: attachmentPath,
        fileData: fileData ? new Binary(fileData) : null
      };
  
      await connectToMongoDB();
      const result = await client.db("entries").collection("_submission").insertOne(submission);
      console.log(`New listing created with the following id: ${result.insertedId}`);
    } catch (error) {
      console.error('Error saving form data:', error);
      throw error;
    } finally {
      await closeMongoDBConnection();
    }
  }
  
  app.post('/submit-form', upload.single('attachment'), async (req, res) => {
    try {
      const { email, authorName, genre } = req.body;
      let attachmentPath = '';
      let fileData;
  
      if (req.file) {
        attachmentPath = req.file.path;
        fileData = fs.readFileSync(attachmentPath);
      }
  
      await submitFormSubmission(email, authorName, genre, attachmentPath, fileData);
      res.send('Form data saved successfully!');
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.listen(port, async () => {
    await connectToMongoDB();
    console.log(`Server is running on http://localhost:${port}`);
  });

  async function getAllEntries() {
    let client;
    try {
      // Connect to MongoDB
      client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      
      // Access the database and collection
      const db = client.db("entries");
      const collection = db.collection("_submission");
  
      // Retrieve all entries
      const docs = await collection.find({}).toArray();
  
      // Extract required fields and return
      const entries = docs.map(doc => ({
        authorName: doc.authorName,
        reviewStatus: doc.reviewStatus,
        genre: doc.genre
      }));
      console.log(entries);
      return entries;
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    } finally {
      // Close the connection
      if (client) {
        await client.close();
      }
    }
  }

  app.get('/entries', async (req, res) => {
    try {
      const entries = await getAllEntries();
      res.json(entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).send('Internal server error');
    }
  });