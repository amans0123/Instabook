//Controllers have all the logic stored inside ie. the middleware functions which are executed upon reaching any route
const HttpError=require('../models/http-error');
const uuid = require('uuid').v4;//Package to generate random unique ids
const { validationResult } = require("express-validator");
const getCoordsForAddress=require('../util/location');

let DUMMY_PLACES=[
    {
        id:'p1',
        title:'Empire State Building',
        description:'One of the most famous skyscrapers in the world',
        location:{
            lat:40.7484474,
            lng:-73.9871516
        },
        address:'New York',
        creator:'u1'
    },
    {
        id:'p1',
        title:'Empire State Building',
        description:'One of the most famous skyscrapers in the world',
        location:{
            lat:40.7484474,
            lng:-73.9871516
        },
        address:'New York',
        creator:'u2'
    }
];

const getPlacebyId=(req,res,next) =>{
    const placeId=req.params.pid;
    const foundPlace=DUMMY_PLACES.find(p => {
        return p.id===placeId;
    });

    //If place does not exist,then give error
    if(!foundPlace){
        throw new HttpError('Place is not found for provided id',404);
    }
    res.json({place:foundPlace});
}

const getPlacesbyUserId =(req,res,next) =>{
    const userId=req.params.uid;

    const filteredPlaces=DUMMY_PLACES.filter(p =>{
        return p.creator===userId;
    });

    if(!filteredPlaces || filteredPlaces.length === 0){
        const error=new HttpError('Place is not found for provided user id',404);
        return next(error);
    }
    res.json({place:filteredPlaces});
}

const createPlace = async (req,res,next) =>{
    //Checking for result of data validation
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid Input, Please fill credentials properly',422));
    }
    //Accessing different parts using object destructuring
    const {title,description,address,creator}=req.body;

    let coordinates;
    try {
        coordinates=await getCoordsForAddress(address);
    }catch(error){
        return next(error);
    }

    const createdPlace={
        id:uuid(),
        title,
        description,
        location:coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place:createdPlace});
}

const updatePlace =(req,res,next) =>{
    //Checking for result of data validation
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid Input, Please fill credentials properly',422));
    }

    const {title,description}=req.body;
    const placeId=req.params.pid;
    
    //Creating a copy of object using spread operator
    const updatedPlace={...DUMMY_PLACES.find(p => p.id==placeId )}; 
    const placeIndex=DUMMY_PLACES.findIndex(p => p.id==placeId);
    updatedPlace.title=title;
    updatedPlace.description=description;

    DUMMY_PLACES[placeIndex]=updatedPlace;

    res.status(200).json({place:updatedPlace});
}

const deletePlace = (req,res,next) =>{
    const placeId=req.params.pid;

    if(!DUMMY_PLACES.find(p => p.id===placeId)){
        return next(new HttpError('Place you want to delete does not exist',404));
    }

    //One Line to delete the place
    DUMMY_PLACES=DUMMY_PLACES.filter(p => p.id!==placeId);
    res.status(200).json({message:'The place is deleted'});
}

exports.getPlacebyId=getPlacebyId;
exports.getPlacesbyUserId=getPlacesbyUserId;
exports.createPlace=createPlace;
exports.updatePlace=updatePlace;
exports.deletePlace=deletePlace;

