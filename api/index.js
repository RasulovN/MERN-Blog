import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import autRoutes from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log(`Mongodb connected...`);
            })
            .catch((err)=> {
                console.log(err);
            });


const app = express();
app.use(express.json());


app.listen(3000, ()=> {
    console.log('====================================');
    console.log(`Server is running on port 3000`);
    console.log('====================================');
})

app.use('/api/user', userRoutes)
app.use('/api/auth', autRoutes)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 5000;
    const message = err.message ||  `Internal Server Error`;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    }); 
});