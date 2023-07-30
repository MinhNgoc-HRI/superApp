const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()
const port = 3000

// app.get('/:name', (req, res) => {
//   // https://github.com/ngnm1009/food-app/releases/download/myvideo/App_tsx.chunk.bundle?platform=ios
//   const {name} = req.params
//   console.log({name})
//   const file = `src/bundle/${name.replace('name=','')}`;
//   console.log({file})
//   res.download(file); // Set disposition and send it.
// });
app.get('/:video', function(req, res) {
  const tsFileName = req.params.video;
  const pathToFile = path.resolve(__dirname, 'src/assets/mono', tsFileName);
  res.sendFile(pathToFile);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = app;