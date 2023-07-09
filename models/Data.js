const mongoose= require("mongoose")

const dataSchema = new mongoose.Schema({
    Word:{
        type:String,
    },
    Sentence: {
        type: String,
    } ,
    
  });

  const Data = mongoose.model("data", dataSchema);

  module.exports = Data;