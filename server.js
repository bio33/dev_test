const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const price = require("./node/logic")
const port = process.env.PORT || 5000;

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
  var lp = p.lowest_price(name);
  lp.then((data)=>{
      res.send(data);
    });

});

app.listen(port, ()=>{
  console.log("listening on port "+port);
});
