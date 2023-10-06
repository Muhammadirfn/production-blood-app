const express = require('express');
const colors = require('colors')
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/authRouter')
const inventryRouter = require('./routes/inventryRouter')
const analyticRouter = require('./routes/analyticRouter')
const adminRouter = require('./routes/adminRouter')
require('./config/dbconn.js')
const path  = require('path')


const app = express();

const port = process.env.PORT || 8000



app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/auth',router )
app.use('/api/v1/inventry', inventryRouter)
app.use('/api/v1/analytic', analyticRouter)
app.use('/api/v1/admin', adminRouter)
// static path
app.use(express.static(path.join(__dirname, '/client/dist')))
// statuc route
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

app.listen(port,()=>{
  console.log(`server is running on the port ${port} on the ${process.env.DEV_MODE} mode also this ${process.pid} working id is assigned`.bgMagenta);
})