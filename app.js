const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/public/:filename', (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'public', filename);

  res.type('text/css');
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    }
  });
});

app.get('/views/:filename', (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'views', filename);

  res.type('text/html');
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    }
  });
});

app.get('/:filename.js', (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, `${filename}.js`);

  res.type('application/javascript');
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    }
  });
});

app.get('/Images/:filename', (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'Images', filename);

  res.type('image/webp');

  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    }
  });
});


app.set('views', 'views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.render('home.html');
});
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server gracefully.');
  // Perform any cleanup or shutdown tasks here
  process.exit(0);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
