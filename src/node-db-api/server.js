var express = require('express')
var app = express()
var db = require("./database.js")
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));
var HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

//TODO add other endpoionts of the API here
app.get("/api/trades", (req,res,next) => {
    var sql = "select * from trades"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "data":rows
        })
    });
});

app.get("/api/trades/:t1&:t2", (req,res,next) => {
    var sql = "select * from trades where trim(team1) = ? and trim(team2) = ? group by trade_date"
    var params = [req.params.t1, req.params.t2]
    console.log(req.params.t1)
    console.log(req.params.t2)
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

app.get("/api/trades/d/:date", (req,res,next) => {
    var sql = "select * from trades where trade_date = DATE(?)"
    var params = [req.params.date]
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

app.get("/api/trades/a/:assets", (req,res,next) => {
    var sql = "select * from trades where team1_assets like ?"
    console.log(sql)
    let assets = '%' + req.params.assets + '%'
    var params = [assets]
    console.log(params)
    db.all(sql, params, (err, row) => {
        if (err) {
            console.log(err)
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

app.get("/api/trades/specific/", (req,res,next) => {
    var sql = `SELECT * from trades
    where team1 like ? and team2 like ? and team1_assets like ? and team2_assets like ? and trade_date like ?
    order by trade_date DESC
    `;
    console.log(sql)

    let t1 = req.query.t1 === undefined ? '%%' : '%' + req.query.t1 + '%'
    let t2 = req.query.t2 === undefined ? '%%' : '%' + req.query.t2 + '%'
    let t1_a = req.query.t1_a === undefined ? '%%' : '%' + req.query.t1_a + '%'
    let t2_a = req.query.t2_a === undefined ? '%%' : '%' + req.query.t2_a + '%'
    let date = req.query.date === undefined ? '%%' : '%' + req.query.date + '%'

    var params = [t1, t2, t1_a, t2_a, date]
    console.log(params)
    db.all(sql, params, (err, row) => {
        if (err) {
            console.log(err)
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

app.get("/api/trades/broad/", (req,res,next) => {
    var sql = `SELECT * from trades
    where (team1 like ? or team2 like ?) and (team1_assets like ? or team2_assets like ?) and trade_date like ?
    order by trade_date DESC;
    `;
    console.log(sql)

    let team = req.query.team === undefined ? '%%' : '%' + req.query.team + '%'
    let assets = req.query.assets === undefined ? '%%' : '%' + req.query.assets + '%'
    let date = req.query.date === undefined ? '%%' : '%' + req.query.date + '%'

    var params = [team, assets, date]
    console.log(params)
    db.all(sql, params, (err, row) => {
        if (err) {
            console.log(err)
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});


app.use(function(req,res){
    res.status(404);
});