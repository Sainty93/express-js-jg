const path = require('path');
const router = require('express').router();

router.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '../public/notes.html')));
//homepage

router.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../public/notes.html')));
//notes page


module.exports = router;