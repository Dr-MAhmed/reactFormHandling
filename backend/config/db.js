const mongoose = require('mongoose');

function connectToDb() {
  mongoose.connect("mongodb://127.0.0.1:27017/form-handling"
  ).then(() => {
      console.log('Connected to DB');
  }).catch(err => console.log(err));
}


module.exports = connectToDb;





