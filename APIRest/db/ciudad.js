module.exports = (function(){
    'use stric'
    const mongoose = require('mongoose');
    const genericSchema = function() {
        const Schema = mongoose.Schema;
        const Ciudad = Schema({
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
        return mongoose.model('ciudad', Ciudad);
    };
    return {
        genericSchema: genericSchema
    };
})();