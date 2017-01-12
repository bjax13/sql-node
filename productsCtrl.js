const app = require('./index.js');
const db = app.get('db');

module.exports= {
  getAll: function (req, res, next) {
    db.read_products(function (err, response) {
      if (err) {
        res.status(500).send(err);
      }else {
        res.status(200).send(response);
      }
    });
  },
  newProduct: function (req, res, next) {
    const newProduct = req.body;
    if (true) {
      db.create_product([newProduct.name, newProduct.description,
        newProduct.price, newProduct.imgUrl],function (err, result) {
        if (err) {
          res.status(500).send(err);
        }else {
          res.status(200).send('information added to database' + newProduct);
        }
      });
    }else {
      res.status(500).json('missing a name, discription, price or imgUrl');
    }
  },
  destroyProduct: function (req, res, next) {
    const id = req.params.id;
    db.delete_product([id],function (err, response) {
      if (err) {
        res.status(500).json(err);
      }else {
        res.status(200).json('Successfully deleted id:' + id);
      }
    });
  },
  getOne: function (req, res, next) {
    const id = req.params.id;

    if (id) {
      db.read_product([id],function (err, response) {
        if (err) {
          res.status(500).send(err);
        }else {
          res.status(200).send(response);
        }
      });
    }else {
      res.status(500).json('need Id of prodct');
    }
  },
  updateProduct: function (req, res, next) {

    const id = req.params.id;
    const description = req.body.description;

    if (id && description) {
      db.update_product([id,description], function (err, response) {
        if(!response.length){
          res.status(500).json('No such Id exists');
        }
        else {
          res.status(500).json('Updated ID: ' + id + ' with description -' + description);
        }
      });
    }else {
      res.status(300).send('need ID and description to update discription.');
    }
  }
};
