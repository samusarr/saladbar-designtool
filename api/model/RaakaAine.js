const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// KESKEN
const RaakaAineSchema = new Schema({
    tuotenro: {
        type: Number,
        required: true
    },
    tuotenimi: {
        type: String,
        required: true
    },
    tuoteryhma: {
        type: String,
        required: true
    },
    hinta: {
        type: Number,
        required: true
    },
    pakkauskoko: {
        type: Number,
        required: true
    },
    yksikko: {
        type: String,
        required: true
    },
    kuvaurl: {
        type: String,
        required: false
    },
    valittu: {
        type: Number,
        required: false
    }
});

module.exports = RaakaAine = mongoose.model('raakaaineet', RaakaAineSchema);