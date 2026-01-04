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

// app.get('/api/:date', (req, res) => {
//   const dateParam = req.params.date; //2023-05-15 or 1450137600000
//   const newDate = new Date(dateParam); //Wed Aug 08 2029 21:00:00 GMT-0300 (Brasilia Standard Time)

//   if (isNaN(newDate.getTime())) {
//       res.json({ 
//         error : "Invalid Date"
//       });
//       return;
//   } else {
//     if (/^\d+$/.test(dateParam)) {
//       const dateParamToNumber = parseInt(dateParam);
//       const numberToDate = new Date(dateParamToNumber);

//       res.json({
//         unix: numberToDate.getTime(),
//         utc: numberToDate.toUTCString()
//       });
//       return;
//     } else if (/-/.test(dateParam)) {

//       res.json({
//         unix: newDate.getTime(),
//         utc: newDate.toUTCString()
//       });
//       return;
//     } else {
//       res.json({
//         unix: 'hi'
//       });
//       return;
//     }
//   }
// });

app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;

  let dateObj;

  if (/^\d+$/.test(dateParam)) {
    const dateParamToNumber = parseInt(dateParam);
    dateObj = new Date(dateParamToNumber);
  } else {
    dateObj = new Date(dateParam);
  }

  if (isNaN(dateObj.getTime())) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})