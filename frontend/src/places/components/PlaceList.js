import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
    //Conditional Rendering based on Length of List
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found.Maybe Add one?</h2>
          <Button to="/places/new">Add Place</Button>
        </Card>
      </div>
    );
  }

  //Outputing List of Places
  return (
    <ul className="place-list">
      {props.items.map((places) => (
        <PlaceItem
          key={places.id}
          id={places.id}
          image={places.imageURL}
          title={places.title}
          description={places.description}
          address={places.address}
          creatorID={places.creator}
          coordinates={places.coordinates}
          lat={places.location.lat}
          lng={places.location.lng}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
