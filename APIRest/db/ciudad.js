module.exports = (function(){
    'use stric'
    const mongoose = require('mongoose');
    const genericSchema = function() {
        const Schema = mongoose.Schema;
        const ciudad = Schema({
            nombre: {
                type: String,
                required: true,
                trim: true,
            },
            pais: {
                type: String,
                required: true,
                trim: true
            }
        });      
        return mongoose.model('ciudad', ciudad);
    };
    return {
        genericSchema: genericSchema
    };
})();