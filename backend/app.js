const express=require('express');
const bodyParser=require('body-parser');//In order to parse the body of incoming request

const HttpError=require('./models/http-error');
const placeRoutes=require('./routes/places-routes');
const userRoutes=require('./routes/users-routes');

//In express we make middleware functions to handle every type of request
//Express also provides us with packages like bodyParser which help in parsing data easily
const app=express();

//We will parse data any incoming request using bodyParser
app.use(bodyParser.json());

//In use method we can filter routes based on starting of url like(/api/places/) and the rest of link is added in places.routes file
app.use('/api/places',placeRoutes);

app.use('/api/users',userRoutes);//Path for user routes

//This is error handling for undefined routes
app.use((req,res,next) =>{
    return next(new HttpError('Could not find this specified path',404));
});

//This is a special middleware function for error handling, because it has 4 arguments
//If any middleware function above gives error it will redirect to this middleware function
app.use((error,req,res,next) =>{
    //If response is send,then forward the error
    if(res.headerSent){
        return next(error);
    }

    res.status(error.code || 500);//If error code is sent otherwise 500
    res.json({message: error.message || 'An unknown error has occured'});
});


app.listen(5000);