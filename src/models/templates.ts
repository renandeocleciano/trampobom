import mongoose from "mongoose"

var schema = mongoose.Schema({
    name      : { type: String, required: true },
    filepath  : { type: String, required: true },
    isPremium : { type: Boolean, default: false },
    downloads : { type: Number },
    created_at: { type: Date, default: Date.now },
},
{
    toJSON: { getters: true }
});

module.exports = mongoose.model('Templates', schema, 'Templates');