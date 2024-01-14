const http = require('http');
const {app} = require("./Routing/app.js");

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`Server is up on port 3000`);
});