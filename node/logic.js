
const fs = require('fs');
const util = require('util');
const request = require('request')
const bby = require('bestbuy')("pfe9fpy68yg28hvvma49sc89")

class price{
  constructor(){

  }

   bb_price(name,callback){
    return bby.products('search='+name,{show:'name,salePrice',sort:'salePrice.asc'});
    // return new Promise((resolve,reject){
    //   var search = bby.products('search='+name,{show:'name,salePrice',sort:'salePrice.asc'});
    //   search.then((data)=>{
    //     if (!data){
    //       console.log("no products found");
    //       reject("err")
    //     }
    //     else{
    //       resolve(data.products[0]);
    //     }
    //
    //
    // })
    //
    // });

  }

   wm_price(name){
    var api_key = 'rm25tyum3p9jm9x9x7zxshfa'
    var url = 'http://api.walmartlabs.com/v1/search?apiKey='+api_key+'&query='+name+'&sort=price&order=asc&responseGroup=base'

    return new Promise((resolve,reject)=>{
      var val = request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var res = JSON.parse(body);
          // console.log(res.items[0]);
          resolve(res.items[0]);
        }
        else {
          reject(response.statusCode)
          console.log("Error "+response.statusCode)
        }
      })

    })


  }

  async lowest_price(name,callback){
  // find lowest price
  var b = await this.bb_price(name)
  var w = await this.wm_price(name)
  // var w = this.wm_price(name)

  if (b.products[0]['salePrice'] < w['salePrice'] ){
    return b.products[0];
  }
  else {
    return {'name':w['name'],'salePrice':w['salePrice']};
  }
  // console.log(b.products[0]['salePrice']);
  // console.log(w['salePrice']);

  };
}

module.exports = price;
