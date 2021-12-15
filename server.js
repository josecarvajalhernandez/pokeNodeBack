const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = require('./network/routes');

//db('mongodb+srv://admin:V4sA7FKx8ZypMvW@cluster0.cw2bx.mongodb.net/chat_db?retryWrites=true&w=majority');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

router(app);

app.use('/app', express.static('public'));
const PORT = process.env.PORT || 3001  
app.listen(PORT);
console.log('App está escuchando en http://localhost:'+PORT);