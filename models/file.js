var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
var Files = module.exports = mongoose.model('File', FileSchema);

//get
module.exports.getFileById = function (_id, callback) {
  Files.findById(_id, callback);
}

//add
module.exports.addFile = function (file, callback) {
  Files.create(file, callback);
}

// delete
module.exports.removeFile = function (id, callback) {
  var query = {
    _id: id
  }
  Files.remove(query, callback);
}
