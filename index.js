const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const connectionString = "postgress://localhost/massive-node-project";
const massiveInstance = massive.connectSync({connectionString:connectionString});

const app = module.exports = express();
app.set('db',massiveInstance);

const db = app.get('db');

const productsCtrl = require('./productsCtrl.js');
const config = require('./config');

app.use(bodyParser.json());
app.use(cors());



app.get('/products', productsCtrl.getAll);
app.get('/product/:id', productsCtrl.getOne);
app.put('/product/:id', productsCtrl.updateProduct);
app.post('/product', productsCtrl.newProduct);
app.delete('/product/:id', productsCtrl.destroyProduct);



const port = config.port;
app.listen(port, function(){
  console.log("Successfully listening on : "+ port)	;
});
