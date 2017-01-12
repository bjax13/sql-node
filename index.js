const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const connectionString = "postgress://localhost/massive-node-project";
const massiveInstance = massive.connectSync({connectionString:connectionString});

const app = module.exports = express();
const config = require('./config');

app.set('db',massiveInstance);

const db = app.get('db');

app.use(bodyParser.json());
app.use(cors());

app.get('/api/products', function (req, res) {

  if (req.query.id) {
    db.read_product([req.query.id],function (err, response) {
      if (err) {
        res.status(500).send(err);
      }else {
        res.status(200).send(response);
      }
    });
  }else {
    db.read_products(function (err, response) {
      if (err) {
        res.status(500).send(err);
      }else {
        res.status(200).send(response);
      }
    });
  }
});

app.put('/api/product', function (req, res) {
  console.log(req.body);
  if (req.body.id && req.body.description) {
    db.update_product([req.body.id,req.body.description], function (err, response) {
      if (err) {
        res.status(500).send(err);
      }else {
        res.status(200).send('Successfully updated id:'+req.body.id+' to -'+req.body.description);
      }
    });
  }else {
    res.status(300).send('need ID and description to update discription.');
  }
});



app.post('/api/products', function (req, res) {
  console.log(req.body);
  const newProduct = req.body;
  db.create_product([newProduct.name, newProduct.description, newProduct.price, newProduct.imgUrl],function (err, result) {
    if (err) {
      res.status(500).send(err);
    }else {
      res.status(200).send(newProduct);
    }
  });
});



const port = config.port;
app.listen(port, function(){
  console.log("Successfully listening on : "+ port)	;
});
