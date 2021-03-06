module.exports = (function(){
    'use stric'
    const mongoose = require('mongoose');
    const genericSchema = function() {
        const Schema = mongoose.Schema;
        const Hotel = Schema({
            nombre: {
                type: String,
                required: true,
                trim: true,
                minlength: 6,
            },
            estrellas: {
                type: Number,
                required: true,
                max: 5
            },
            imagen:{
                type: String,
                required: true,
            },
            precio:{
                type: Number,
            },
            ciudad: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ciudad',
                required: true
            }
        });      
        return mongoose.model('hotel', Hotel);
    };
    return {
        genericSchema: genericSchema
    };
})();