const express = require('express');
const path = require('path');
//const notes = require('./db/db.json');
const routesApi = require('./routes/routesApi');
const routesHtml = require('./routes/routesHtml');
const app = express();
const PORT = process.env.Port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));
app.use('/api', routesApi);
app.use('/', routesHtml);

app.use(express.static('public'));

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))); 

app.listen(PORT, () => console.log('listening on PORT: ${PORT}'));