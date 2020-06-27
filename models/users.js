const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, 
        required: true, 
        unique: true,
        trim: true,
        minlength: 6
        },
  password: {type: String},      
  remainingvotes: {type: Number},
  submittedissues: [{type: String}],  /// i dont think we need this since this is covered in the issue table.
  comments: {type: String}     /////i dont think we need this since comments is in the issue table.

  
}, {timestamps: true

});

const User = mongoose.model("User", userSchema);

module.exports = User;
