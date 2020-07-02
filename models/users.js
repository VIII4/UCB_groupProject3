const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, 
        required: true, 
        unique: true,
        trim: true,
        minlength: 6
        },
  hashedPassword: {type: String},      
  remainingvotes: {type: Number},
    
}, {timestamps: true

});

const User = mongoose.model("User", userSchema);

module.exports = User;
