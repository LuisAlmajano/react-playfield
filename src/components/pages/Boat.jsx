import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Spinner from "../layout/UIElements/Spinner";
import SearchAppBarDrawer from "../layout/Navigation/SearchAppBarDrawer";
import SchiffDetail from "../boats/SchiffDetail/SchiffDetail";
import Footer from "../layout/Navigation/Footer";

const Boat = () => {
  const [boats_db, setBoats] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [DUMMY_BOATS, setBoatsDummy] = useState([
  //   {
  //     _id: "1",
  //     name: "Tarragona",
  //     image: "https://picsum.photos/300",
  //     timeseen: "2021-09-01",
  //     countseen: 2,
  //   },
  //   {
  //     _id: "2",
  //     name: "Veerman",
  //     image: "https://picsum.photos/400",
  //     timeseen: "2021-01-11",
  //     countseen: 1,
  //   },
  //   {
  //     _id: "3",
  //     name: "Sophie Schwarz",
  //     image: "https://picsum.photos/300",
  //     timeseen: "2021-09-01",
  //     countseen: 1,
  //   },
  // ]);

  // const addNewBoatHandler = (newBoat) => {
  //   const boats = DUMMY_BOATS.concat(newBoat);
  //   setBoatsDummy(boats);
  // };

  React.useEffect(() => {
    /* 
      Inspiration from https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/
    */
    setLoading(true);
    axios
      .get("/api/boats")
      .then((result) => {
        setBoats(result.data);
        setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching data with axios: ", error)
      );
  }, []);

  // Extract the boatId from the URL in App <Route path="/boats/:boatId" exact> and only show the selected boat
  //  const boatId = parseInt(useParams().boatId); used since id was an integer in DUMMY_BOATS, but is a string in MongoDB.
  const boatId = useParams().boatId;
  const loadedBoat = boats_db.find((boat) => boat._id === boatId);

  console.log("loadedBoat: ", loadedBoat);

  if (loading) {
    return <Spinner />;
  } else {
    if (!loadedBoat) {
      return (
        <div className="center">
          <h2>Could not find boat!</h2>
        </div>
      );
    }

    return (
      <React.Fragment>
        <SearchAppBarDrawer />
        <SchiffDetail loadedBoat={loadedBoat} />
        <Footer />
      </React.Fragment>
    );
  }
};

export default Boat;