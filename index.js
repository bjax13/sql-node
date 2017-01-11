const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const app = express();
const config = require('./config');


app.use(bodyParser.json());
app.use(cors());





const port = config.port;
app.listen(port, function(){
  console.log("Successfully listening on : "+ port)	;
});
