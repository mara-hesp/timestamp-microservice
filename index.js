const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  let date = req.params.date;
  console.log(date)
  let regex1 = new RegExp(/-/, 'g')
  let regex2 = new RegExp(/[a-z]/, 'g')
  let newDate = {}
  
  if (regex1.test(date) || regex2.test(date)) {
    newDate['unix'] = new Date(date).getTime()
    newDate['utc'] = new Date(date).toUTCString()
  } else {
      newDate['unix'] = new Date(parseInt(date)).getTime()
    	newDate['utc'] = new Date(parseInt(date)).toUTCString()
  }
  if (!newDate['unix'] || !newDate['utc']) {
    delete newDate.unix
    delete newDate.utc
    newDate['error'] = "Invalid Date"
  }
  res.json(newDate)
});

app.get("/api/", (req, res) => {
  let now = new Date()
  let newDate = {unix: "", utc: ""}
  newDate.unix = now.getTime()
  newDate.utc = now.toUTCString()
  res.json(newDate)
})



// listen for requests :)
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor está escuchando en el puerto ${PUERTO}...`)
});
