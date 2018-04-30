var express = require('express');
var config = require('./config/index');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./build/webpack.base.conf')

var port = process.env.PORT || config.dev.port;
// var port = 9000
var app = express();

var router = express.Router();

router.get('',function(req,res,next){
	req.url = '/index.html'
	next();
})

app.use(router);

var appData = require("./data.json")
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router()




// console.log(apiRoutes.get)
app.use("/api", apiRoutes);

const devWebpackConfig = merge(baseWebpackConfig, {
	 before(app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          // 这里是你的json内容
          errno: 0,
          data: seller
        })
      }),
      app.get('/api/goods', (req, res) => {
        res.json({
          // 这里是你的json内容
          errno: 0,
          data: goods
        })
      }),
      app.get('/api/ratings', (req, res) => {
        res.json({
          // 这里是你的json内容
          errno: 0,
          data: ratings
        })
      })
    }
});

app.use(express.static('./dist'));

module.exports = app.listen(port, function(err){
	if(err){
		console.log(err)
		return
	}
	// console.log(port)
	// devWebpackConfig.devServer.port = port;
	console.log('listening at http://localhost:'+port)
})
/*module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})*/