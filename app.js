// importing exprees and other libarys 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
//importing auth route from route folder
const authRoute = require('./routes/auth');
// import post route 
const postRoute = require('./routes/posts');

dotenv.config();
// running express
const app = express();

// using body-parser middlewire
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json());

//connecting moongo db using mongoose
mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`,
 { useNewUrlParser: true, useUnifiedTopology: true}
 )
 .then(()=>{console.log('mongodb connected')})
 .catch((err)=>{console.log('error in mongodb connection :', err.message);})



//auth routes for user
app.use('/api/user',authRoute);
// post route 
app.use('/api/posts',postRoute);

// port varible
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server was running on ${process.env.PORT}, database ${process.env.DATABASE}`)
})
