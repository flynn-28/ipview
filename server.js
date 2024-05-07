const express = require('express');
const app = express();

app.use((req, res, next) => {
  const ip = req.socket.remoteAddress;
  req.ipAddress = ip.includes('::ffff:') ? ip.slice(7) : ip;
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/grab', (req, res) => {
  const ipAddress = req.ipAddress;
  res.send(ipAddress);
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
