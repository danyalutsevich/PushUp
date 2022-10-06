import express from 'express';
import mysql from 'mysql';

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const connection = mysql.createConnection({ database: 'PushUp', user: 'pushupPC', password: 'I7cavca7avc', host: '192.168.0.150', port: '3306' });
connection.connect();

app.get('/users', (req, res) => {
    try {
        connection.query('SELECT * FROM Users', (err, result, field) => {
            res.json(result);
        });
    }
    catch (err) {
        res.json('Server is busy try again later');
    }
});

app.get('/score/global', (req, res) => {
    try {
        connection.query('SELECT U.Username, SUM(P.PushUpsMade) `sum`, AVG(P.PushUpsMade) `avg` FROM PushUps P JOIN Users U ON P.Id = U.UserID GROUP BY U.Username ORDER BY 2 DESC', (err, result, field) => {
            res.json(result);
        });
    }
    catch (err) {
        res.json('Server is busy try again later');
    }

});

app.get('/score/:username', (req, res) => {
    try {
        let query = 'SELECT UF.Username, P.PushUpsSUM `sum`, P.PushUpsAVG `avg` FROM Followers F JOIN Users UU ON F.UserId = UU.UserID  JOIN Users UF ON F.Follows = UF.UserID  JOIN ( SELECT U.Username `PU`, SUM(P.PushUpsMade) `PushUpsSUM`, AVG(P.PushUpsMade) `PushUpsAVG` FROM PushUps P JOIN Users U ON P.Id = U.UserID GROUP BY U.Username ) P ON UF.Username = P.PU WHERE UU.Username = ? ORDER BY 2 DESC'
        let username = req.params.username;
        console.log(username);
        connection.query(query, [username], (err, result, field) => {
            res.json(result);
        });

    }
    catch (err) {
        res.json('Server is busy try again later');
    }


});

app.get('/profile/:username', (req, res) => {
    try {
        let profile = 'SELECT U.Username, P.PushUpsMade, P.PushUpDate FROM PushUps P JOIN Users U ON P.Id = U.UserID WHERE U.Username = ?'
        connection.query(profile, [req.params.username], (err, result, field) => {
            res.json(result);
        });

    }
    catch (err) {
        res.json('Server is busy try again later');
    }

});

app.post('/register', (req, res) => {
    try {
        let query = 'INSERT INTO Users VALUES (NULL, ?, ?, CURDATE())';
        let username = req.body.username;
        let password = req.body.password;
        console.log(req.body);
        connection.query(query, [username, password], (err, result, field) => {

            res.json(err);
        });

    }
    catch (err) {
        res.json('Server is busy try again later');
    }
});

app.post('/signin', (req, res) => {
    try {
        connection.query('SELECT UserID FROM Users WHERE Username = ? AND Password = ?', [req.body.username, req.body.password], (err, result, field) => {
            res.json(result);
        })
    }
    catch (err) {
        res.json('Server is busy try again later');
    }
})

app.post('/pushup', (req, res) => {

    try {
        connection.query('INSERT INTO PushUps VALUES (?, ?, NOW())', [req.body.id, req.body.pushupsmade], (err, result, field) => {
            res.json(result);
        })
    }
    catch (err) {
        res.json('Server is busy try again later');
    }

})


app.listen(80);