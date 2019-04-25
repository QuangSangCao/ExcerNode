const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const cors = require('cors');
// parse application/Json
app.use(bodyParser.json());

// create database
const conn=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'node_db'
});

app.use(cors());
// connect database
conn.connect ((err) => {
    if(err) throw err;
    console.log("MySQL to Connected");
});

// show all fruit
app.get('/api/fruit',(req,res) =>{
let sql = "SELECT * From fruit";
let query =conn.query (sql, (err,results) =>{
    if (err) throw err;
    res.send(JSON.stringify({"status" :200,"error" :null,"response" : results}));
});
});

// add new fruit
app.put('api/fruit/:add',(req,res) =>{
    let data = {Name: req.body.Name ,Price : req.body.Price};
    let sql = "INSERT INTO fruit SET ?";
    let.query = conn.query(sql,data,(err,results) =>{
        if(err) throw err;
        res.send(JSON.stringify({"status" : 200 ,"error" : null , "response" : results}));
    });
});

// update fruit
app.put('api/fruit/:update',(req,res) =>{
    let sql = "UPDATE fruit SET Name ='" + req.body.Name +"',Price = '"+ req.body.Price + "' WHERE Id = "+ req.body.Id;
    let.query = conn.query(sql,data,(err,results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status" : 200 , "error" : null , "response" : results}));
    });  
});

// delete fruit
app.put('api/fruit/:delete',(req,res) =>{
    let sql = "DELETE FROM fruit WHERE Id =" + req.params.Id +"";
    let.query = conn.query(sql,data,(err,results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status" : 200 , "error" : null , "response" : results}));
    });  
});

// server listening
app.listen(8001,() =>{
    console.log ("Server is running");
});


