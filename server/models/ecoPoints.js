const mongoose = require('mongoose');

function toTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

const orderSchema = new mongoose.Schema({
    orderId: String,
    amount: {
        type: Number,
        set: toTwoDecimals
    },
    co2Offset: {
        type: Number,
        set: toTwoDecimals
    },
    treesPlanted: Number,
    ecoPoints: {
        type: Number,
        set: toTwoDecimals
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ecoPointsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    points: {
        type: Number,
        default: 0,
        set: toTwoDecimals
    },
    totalCO2Offset: {
        type: Number,
        default: 0,
        set: toTwoDecimals
    },
    treesPlanted: {
        type: Number,
        default: 0
    },
    totalSpent: {
        type: Number,
        default: 0,
        set: toTwoDecimals
    },
    orders: [orderSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ecoPointsSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('EcoPoints', ecoPointsSchema); 