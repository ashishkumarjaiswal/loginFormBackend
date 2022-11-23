const mongoose = require("mongoose");

const connectToDataBase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://akjaiswal:ashish@cluster0.xk5eraz.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to DataBase Sucessfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDataBase;
