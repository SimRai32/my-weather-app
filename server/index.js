const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/data', (req, res) => { 
    res.json({ message: 'Hello from Express!' });
  }); 

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
