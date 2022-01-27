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
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewURLParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));

// mongoose.set('useFindAndModify', false);