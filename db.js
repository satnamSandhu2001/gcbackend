const Mongoose = require('mongoose');

const mongoURI =
  'mongodb+srv://gandhiComputers:gcjbd@certificates.t6tvi.mongodb.net/test';

Mongoose.connect(mongoURI)
  .then(() => {
    console.log('connected to mongo');
  })
  .catch((err) => {
    console.log('mongo connection error');
  });
const connectToMongo = () => {
  Mongoose.connect(mongoURI, (req, res) => {});
};

module.exports = connectToMongo;
