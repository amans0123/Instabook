const uuid=require('uuid').v4;
const {validationResult}=require("express-validator");

const HttpError=require('../models/http-error');
let DUMMY_USERS=[
    {
        id:'1',
        name:'Ayush Kumar',
        email:"abc@gmail.com",
        password:'abc'
    },
    {
        id:'2',
        name:'Astha',
        email:"def@gmail.com",
        password:'def'
    }
];
const getUsers = (req,res,next) =>{
    res.status(200).json({users:DUMMY_USERS});
}

const signup = (req,res,next) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid Input, Please fill credentials properly',422));
    }
    
    const {name,email,password}=req.body;

    const hasUser=DUMMY_USERS.find(u => u.email===email);

    if(hasUser){
        return next(new HttpError('User with this email id already exists',422));
    }

    const newUser={
        id:uuid(),name,email,password
        //Here name means name:name
    }

    DUMMY_USERS.push(newUser);
    res.status(201).json({user:newUser});
}

const login = (req,res,next) =>{
    const {email,password}=req.body;

    const identifiedUser= DUMMY_USERS.find( u => u.email===email);

    if(!identifiedUser || identifiedUser.password!==password){
        return next(new HttpError('Invalid credentials,check email and password',404));
    }

    res.status(201).json({message:"Logged in"});
}

exports.getUsers=getUsers;
exports.signup=signup;
exports.login=login;