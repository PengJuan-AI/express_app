import express from 'express';
import bodyParser from 'body-parser'
import mysql from 'mysql'

//set up and configure express
const app = express();
const port = 3000
app.use(bodyParser.json());

//set up and intialize the database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "c0nygre",
    database: "music_db"
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get("/albums", (req, res) => {
    connection.query("SELECT * FROM album",
        (error,
            results,
            fields) => {
            res.json(results);
        }
    )
    // console.log(res)
})
app.get("/albums/:id", (req, res) => {
    connection.query(`SELECT * FROM album where id=${req.params.id}`,
        (error, results, fields) => {
            res.json(results);
        }
    )
})

app.listen(port, () => {
    console.log("The server is running")
})