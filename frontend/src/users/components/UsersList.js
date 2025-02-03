import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  //COnditional Rendering based on if users are present or not

  //If No Users Then Output No users
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found</h2>
        </Card>
      </div>
    );
  }

  return (
    //Else Return the List
    <ul className="users-list">
      {props.items.map((users) => {
        //Data obtained from Users.js as items in above line
        return (
          <UserItem
            key={users.id}
            id={users.id}
            image={users.image}
            name={users.name}
            placeCount={users.places}
          />
        );
        //Data sent to UserItem(Child) component through props
      })}
    </ul>
  );
};

export default UsersList;
