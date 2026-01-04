const express = require('express')
const app = express()
const port = 3000

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/api', (req, res) => {
  res.json({ 
    unix: Date.now(), 
    utc: new Date().toUTCString() });
});

app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date; //2023-05-15 or 1450137600000
  console.log('dateParam', dateParam);
  const newDate = new Date(dateParam); //Wed Aug 08 2029 21:00:00 GMT-0300 (Brasilia Standard Time)
  console.log('newDate.toString', newDate.toString());
  console.log('newDate', newDate);

  if (newDate.toString() === "Invalid Date") {
    const unixConversion = dateParam * 1000;
    res.json({ 
      type: 'unix date',
      unix: dateParam,
      utc: new Date(unixConversion)
     })
    return;
  } else if (dateParam.includes("-")) {
    res.json({ 
      type: 'hifen date',
      unix: newDate.getTime(), 
      utc: newDate.toUTCString() });
    return;
  } 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})