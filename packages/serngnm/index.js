const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000

app.get('/myVideo.container.bundle', (req, res) => {
  console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  console.log(req.url)
  console.log(req.query)
  console.log(req.headers)
  const data = fs.readFileSync(
    __dirname +'/assets/myvideo.container.bundle','utf8',
  );
  
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = app;