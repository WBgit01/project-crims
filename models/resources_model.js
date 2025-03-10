const mongoose = require('mongoose');

const ResourcesSchema = new mongoose.Schema(
  {
    HumanResources: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      equipment: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
    },

    TransportResources: {
      plateNumber: {
        type: String,
        required: true,
      },
      typeOfVehicle: {
        type: String,
        required: true,
      },
      fuel: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Resources = mongoose.model('Resources', ResourcesSchema);
module.exports = Resources;
