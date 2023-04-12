const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    //required: [true, "Choose the category"],
    enum: ["Icecream", "Drinks", "Main Course", "Starters"],
  },
  // image: [
  //     {
  //         id: {
  //             type: String,

  //         },
  //         secure_url: {
  //             type: String,

  //         }
  //     }
  // ],

  //TDOD: FOR TEMPOARARY
  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.plugin(mongoosePagination);

module.exports = mongoose.model("Product", productSchema);
