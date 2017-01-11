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





const port = config.port;
app.listen(port, function(){
  console.log("Successfully listening on : "+ port)	;
});
