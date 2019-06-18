const express = require('express')
const bodyParse = require('body-parser');
const morgan = require('morgan');

const app = express()



//Middlesware
app.use(bodyParse.json())
app.use(morgan('dev'))

app.set('port', process.env.PORT || 3000)

//routers
require('./routes/userRouter')(app);


app
  .listen(app.get("port"), () => {
    console.log("server on port 3000 http://localhost:3000");
  })

