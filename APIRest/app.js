require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
//const viewsRoutes = require('./routes/views');
//const apiRoutes = require('./routes/api');

const app = express();
const nameSpace = '/api'


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
//app.use(viewsRoutes);
app.set('view engine','ejs');*/

app.use(nameSpace, require('./routes/hotel'));
app.use(nameSpace, require('./routes/ciudad'));
app.use(nameSpace, require('./routes/reservas'));
app.use(nameSpace, require('./routes/usuario'));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log('Database connection failed');
    console.log(error);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
