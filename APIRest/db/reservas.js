module.exports = (function(){
    'use stric'
    const mongoose = require('mongoose');
    const genericSchema = function() {
        const Schema = mongoose.Schema;
        const Reserva = Schema({
            fechaLLegada: {
                type: String,
                required: true,
                trim: true,
                minlength: 6,
            },
            fechaSalida: {
                type: String,
                required: true,
                max: 5
            },
            diasEstadia:{
                type: Number,
                required: true,
            },
            valorEstadia:{
                type: Number,
                required: true,
            },
            hotel: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'hotel',
                required: true
            }
        });      
        return mongoose.model('reserva', Reserva);
    };
    return {
        genericSchema: genericSchema
    };
})();