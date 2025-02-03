import React from "react";


import { useParams} from 'react-router-dom';
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageURL: 'https://media.timeout.com/images/101705309/image.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: 'p1',
      title: 'Taj Mahal',
      description: 'One of the most seven wonders in the world!',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg',
      address: 'Agra, India',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    }
  ];

const UserPlaces = () =>{
    //Fetching dynamic part of URL which is creatorID to be used in filtering(used from App.js /:uid/places route)
    const userID=useParams().uid;

    //Filtering data to output only the places made by that specific creator
    const filteredData=DUMMY_PLACES.filter(places => places.creator===userID);

    return <PlaceList items={filteredData}/>
};

export default UserPlaces;