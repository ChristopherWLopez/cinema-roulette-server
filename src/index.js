require('dotenv').config();
const{server} = require('./server');

const port = process.env.PORT || 3000;

server.listen(port, async()=>{
    // await Sequelize.sync();
    console.log(`Listen on ${port}`);
});