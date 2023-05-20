const express = require("express")
const mysql = require("mysql")
const util = require('util');

const db_name = "new_schema"
const app = express()
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: db_name
})

class Review{
    constructor(food_name, store_name, rating, review){
        this.food_name = food_name
        this.store_name = store_name
        this.rating = rating
        this.review = review
    }
}

var reviewlist = [
    {
        "food_name": "ข้าวมันไก่",
        "store_name": "เทเวศน์",
        "rating": 9,
        "review": "อร่อยมั่ก"
    },
    {
        "food_name": "บะหมี่",
        "store_name": "ตำลึง",
        "rating": 8,
        "review": "โอเค"
    }
]

// in MySQL Workbench -> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
conn.connect( (err) => {
    if (err) console.log(err)
    else console.log("connected")
})

var newreview1 = new Review("ข้าวไข่เจียว","รถเข็น",9,"กินง่าย")

app.get("/", function(req, res){
    res.send(reviewlist)
    let sql = "select * from review"
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        console.log(result)
    });
})

app.post("/add", (req, res) => {
    // reviewlist.push(newreview1)

    let sqll = "SELECT COUNT(*) FROM review";
    // let sqll = "SELECT LAST_INSERT_ID();"
  
    const queryy = util.promisify(conn.query).bind(conn)

    let result = async () => {
        res = await queryy(sqll)
        console.log(res[0]["COUNT(*)"])
        return res
    }

    result()
    .then((res) => {
        console.log("here"+res[0]["COUNT(*)"])
        return res[0]["COUNT(*)"]
    })
    .then((id) => {
    let sql = "insert into review (id, food_name, store_name, rating, review) values ('" + id + "', '" + newreview1.food_name + "', '" 
    + newreview1.store_name + "', '" + newreview1.rating + "', '" + newreview1.review + "');";
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted")
    });
    })
    .then(res.send("1 record inserted"))
})

app.listen(3030)