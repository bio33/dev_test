const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logic = require("./node/logic")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')




app.get("/",(req,res)=>{
  res.render("index.ejs")

})

app.get("/price",(req,res) => {
  var price = logic();
  console.log(price);
  res.send("ok")

});

app.listen(8000, ()=>{
  console.log("listening on port 8000");
});
