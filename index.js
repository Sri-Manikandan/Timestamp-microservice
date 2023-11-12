var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",(req,res)=>{
  var dateObj = new Date(req.params.date);
  if(req.params.date === undefined){
    dateObj = new Date();
  }
  if(dateObj.toString() === "Invalid Date"){
    dateObj = new Date(parseInt(req.params.date));
  }
  if(dateObj.toString() === "Invalid Date"){
    res.json({
      error:"Invalid Date"
    })
  }
  res.json({
    unix:dateObj.getTime(),
    utc:dateObj.toUTCString()
  })
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
