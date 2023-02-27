const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wxn0c7p.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run () {
  try{
    const productCollection = client.db('emaJohn').collection('products')

    app.get('/products', async(req, res) =>{
        const query ={}
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
    })
  }
  finally{

  }

}
run().catch(err => console.error(err));


app.get('/', (req, res) =>{
    res.send('ema jhon server is running')
})


app.listen(port, ()=>{
    console.log(`ema jhon runnin on : ${port}`)
})