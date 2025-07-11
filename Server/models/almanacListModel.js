import mongoose from "mongoose";

const almanacSchema = new mongoose.Schema({
  photo: {
    type : String
  },
  username: {
    type:String
  },
  department : {
     type:String
  }
})

const AlmanacList = mongoose.model("AlmanacList", almanacSchema);

export default AlmanacList;