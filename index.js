import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { BookRoute, AccountRoute } from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware để phân tích yêu cầu POST với dữ liệu JSON
app.use(bodyParser.json());

// Kết nối với MongoDB
mongoose.connect(URI)
    .then(()=>{
        console.log('Connected')
        
    }).catch(err=> {
        console.log('err',err)
    })

app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} `)
        })

app.use('/api/books',BookRoute);
app.use('/api/account',AccountRoute);
