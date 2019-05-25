const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:8100'}));

// Routes
app.use('/api', require('./routes/station.routes'));

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});