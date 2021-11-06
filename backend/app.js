const express = require('express');
const mysql = require('mysql2');
const db = require('./models/db');
const path = require('path');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);
});

/*
db.query(
    'SHOW TABLES',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
);
*/

const app = express();

// Headers

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;