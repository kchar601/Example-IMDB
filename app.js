var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser');

var app = express();

const port = 3000;
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getMovies', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("movies").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const items = await client.db("movies").collection("movies").find().toArray();
    res.json(items);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
})

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})

app.get('/getUser', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      await client.connect();
      await client.db("test").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      const item = await client.db("test").collection("test").find({username: "kchar601"}).toArray();
      res.json(item);
      } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.post('/insertUser', async function (req, res) {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const item = {username: req.body.username};
  async function run() {
    try {
      await client.connect();
      await client.db("test").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const result = await client.db("test").collection("test").insertOne(item);
      res.json(result);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.post('/updateUser', async function (req, res) {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const user = {username: req.body.username};
  const email = {email: req.body.email};
  async function run() {
    try {
      await client.connect();
      await client.db("test").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const result = await client.db("test").collection("test").updateOne(email, {$set: user});
      res.json(result);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.post('/deleteUser', async function (req, res) {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const email = {email: req.body.email};
  async function run() {
    try {
      await client.connect();
      await client.db("test").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const result = await client.db("test").collection("test").deleteOne(email);
      res.json(result);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.get('/getSortedUsers', async function(req,res){
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const aggr = [{ '$sort': { 'lastName': -1 } }];
  async function run() {
    try {
      await client.connect();
      await client.db("test").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const items = await client.db("test").collection("test");
      const coll = items.aggregate(aggr);
      const result = await coll.toArray();
      res.json(result);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})