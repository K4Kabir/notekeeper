import mongoose from "mongoose";

export const connect = async () => {
  try {
    let response = await mongoose.connect(
      "mongodb://kabirmalv3:Monochromatic1@ac-zxqktp9-shard-00-00.qgdtusu.mongodb.net:27017,ac-zxqktp9-shard-00-01.qgdtusu.mongodb.net:27017,ac-zxqktp9-shard-00-02.qgdtusu.mongodb.net:27017/?ssl=true&replicaSet=atlas-2y1h05-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Notekeeper"
    );
    if (response) {
      console.log("Connected with database");
    }
  } catch (error) {
    console.log(error);
  }
};
