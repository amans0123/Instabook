import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  //USERS array which is to passed using props down to UserList.js
  const USERS = [
    {
      id: "u1",
      name: "Max Verstappen",
      image:"https://www.racefans.net/wp-content/uploads/2023/09/racefansdotnet-6952409_HiRes.jpg",
      places: 3
    },
    {
      id: "u2",
      name: "Joe Biden",
      image:"https://www.whitehouse.gov/wp-content/uploads/2021/04/P20210303AS-1901-cropped.jpg",
      places: 2
    }
    ,
    {
      id: "u2",
      name: "Donald Trump",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      places: 2
    },
    {
      id: "u2",
      name: "Barack Obama",
      image:"https://media.cnn.com/api/v1/images/stellar/prod/121101103247-barack-obama-hedshot.jpg?q=w_1916,h_2608,x_0,y_0,c_fill",
      places: 2
    }
  ];
  return <UsersList items={USERS} />;
};

export default Users;
