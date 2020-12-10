module.exports = (function(){
    'use stric'
    const mongoose = require('mongoose');
    const genericSchema = function() {
        const Schema = mongoose.Schema;
        const Usuario = Schema({
            nombre: {
                type: String,
                required: true,
                trim: true,
            },
            correo: {
                type: String,
                required: true,
                trim: true
            },
            password: {
                type: String,
                required: true,
                trim: true
            },
            telefono: {
                type: String,
                required: true,
                trim: true
            }
        });      
        return mongoose.model('usuario', Usuario);
    };
    return {
        genericSchema: genericSchema
    };
})();