const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const price = require("./node/logic")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')




app.get("/",(req,res)=>{
  res.render("index.ejs")

})

app.get("/price",(req,res) => {
  var name =req.query.name;
  var p = new price();
  var pa = p.lowest_price(name);
  pa.then((data)=>{
      res.send(data);
    });
  // res.send("ok");

});

app.listen(8000, ()=>{
  console.log("listening on port 8000");
});
