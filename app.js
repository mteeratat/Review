const express = require("express")
const mysql = require("mysql")

const app = express()
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "new_schema"
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

var sql = "select * from review"
conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
    console.log(result)
});

var newreview1 = new Review("ข้าวไข่เจียว","รถเข็น",9,"กินง่าย")

app.get("/", function(req, res){
    res.send(reviewlist)
})

app.post("/add", (req, res) => {
    reviewlist.push(newreview1)
    res.send("complete")
})

app.listen(3030)