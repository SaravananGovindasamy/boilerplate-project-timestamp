// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// Route to handle requests for timestamp conversion
app.get("/api/:date?", function(req, res) {
  let dateInput = req.params.date;
  
  // Use current time when no date is provided
  if (!dateInput) {
    dateInput = new Date();
  } else {
    // Handling UNIX timestamp using parseInt
    if (!isNaN(dateInput)) {
      dateInput = new Date(parseInt(dateInput));
    } else {
      dateInput = new Date(dateInput);
    }
  }

  // For valid date, respond with unix & utc, else respond with error
  if (isNaN(dateInput.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: dateInput.getTime(),
      utc: dateInput.toUTCString()
    });
  }
});

// Default route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
