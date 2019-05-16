
const request = require('request')
const bby = require('bestbuy')("pfe9fpy68yg28hvvma49sc89")
// WALLMART api was not available for NODE , used request module to send and recieve response
class price{
  constructor(){
  }

  // BestBuy API call
   bb_price(name,callback){
    return bby.products('search='+name,{show:'name,salePrice',sort:'salePrice.asc'});
  }

  // WALLMART url call
   wm_price(name){
    var api_key = 'rm25tyum3p9jm9x9x7zxshfa'
    var url = 'http://api.walmartlabs.com/v1/search?apiKey='+api_key+'&query='+name+'&sort=price&order=asc&responseGroup=base'
    return new Promise((resolve,reject)=>{
      var val = request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var res = JSON.parse(body);
          resolve(res.items[0]);
        }
        else {
          reject(response.statusCode)
          console.log("Error "+response.statusCode)
        }
      })
    })
  }

  // compares prices from both sources and returns lowest price
  async lowest_price(name) {
    var bestbuy = await this.bb_price(name).then((data)=>{
        if (!data){
          return "product not found"
        }
        else{
          return data
        }

    })
    var wallmart = await this.wm_price(name)

    if (bestbuy.products[0]['salePrice'] < wallmart['salePrice'] ){
      return bestbuy.products[0];
    }
    else {
      return {'name':wallmart['name'],'salePrice':wallmart['salePrice']};
    }
  };
}

module.exports = price;
