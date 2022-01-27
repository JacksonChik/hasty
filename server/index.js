import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'

const app = express();


app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.get('/',(req,res) => {
    res.send('Connected to hasty\'s api')
})
const CONNECTION_URL = 'mongodb+srv://jacksonchik01:2001_08_02@cluster0.pxltj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewURLParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));

// mongoose.set('useFindAndModify', false);