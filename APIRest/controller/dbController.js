const genericController = function (nameSchema) {
    'use stric'

    const genericModel = require(`../db/${nameSchema}`);
    const model = genericModel.genericSchema();
    
    const post = async function (req, res) {  
        const params = req.body;                       
        const schema = new model(params);       
        schema.save( (err, schemaStored) => {        
            if(err) return res.status(500).send({ message: "Error interno del servidor" });     
            if(!schemaStored) return res.status(404).send({ message: "No se encontraron datos" });
            return res.status(200).send({ Id: schemaStored.id });
        });                
    };

    const get = async function (req, res) {     
        try {
            if(req.params.id) {   
                const id = req.params.id;
                const record = await model.findById(id).populate(nameSchema);
                if (!record) {
                    res.status(404).send();
                } else {
                    res.send(record);
                };                
            }else{          
                const record = await model.find({}).populate(nameSchema);
                res.send(record);                
            };     
        } catch(e) {
            res.status(500).send(e);
        }   
    };

    const put = async function (req, res) {       
        if(req.params.id) {
            const paramsId = req.params.id;         
            const params = req.body;             
            model.findByIdAndUpdate(paramsId, params, {new:true}, (err, schemaStored) => {                
                if(err) return res.status(500).send({ message: "Error interno del servidor" });                
                if(!schemaStored) return res.status(404).send({ message: "No se encontraron datos" });                
                return res.status(200).send(schemaStored);      
            });
        }else{            
            return res.status(400).send({ message: "Solicitud incorrecta" }); 
        };        
    };

    const patch = async function (req, res) {
        if(req.params.id) {
            const paramsId = req.params.id;
            const params = req.body;
            model.findByIdAndUpdate(paramsId, params, {new:true}, (err, schemaStored) => {
                if(err) return res.status(500).send({ message: "Error interno del servidor" });
                if(!schemaStored) return res.status(404).send({ message: "No se encontraron datos" });
                return res.status(200).send(schemaStored);      
            });
        }else{
            return res.status(400).send({ message: "Solicitud incorrecta" });
        };        
    };

    const remove = function (req, res) {
        if(req.params.id) {
            const paramsId = req.params.id;
            validationHandler({ paramsId: IdSchema }, paramsId); 
            model.findByIdAndRemove(paramsId, (err, schemaStored) => {
                if(err) return res.status(500).send({ message: "Error interno del servidor" });
                if(!schemaStored) return res.status(404).send({ message: "No se encontraron datos" });
                return res.status(200).send([]);
            });           
        }else{
            return res.status(400).send({ message: "Solicitud incorrecta" });
        };        
    }; 

    return {
        get: get,
        post: post,       
        put: put,
        patch: patch,
        delete: remove
    };
};

module.exports = genericController;