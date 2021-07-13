import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import WTBService from "../../services/WTBService";
import NavigationBar from "../Navbar/NavigationBar";

// const WTBListings = () => {
//   const [listings, setListings] = useState([]);

//   const fetchListings = () => {
//     WTBService.getAllWTBListings().then((res) => {
//       console.log(res.data);
//       setListings(res.data);
//     });
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   return listings.map((listing, index) => {
//     // Make something less ugly lmao
//     return (
//       <div>
//         <h2>{listing.title}</h2>
//         <p>{listing.description}</p>
//         <p>
//           Price: {listing.priceLower} - {listing.priceUpper}
//         </p>
//       </div>
//     );
//   });
// };

export default function WTB(props) {
  const history = useHistory();
  const location = useLocation();

  const offer = (listing) => {
  history.push({
    pathname: "/offer-for-wtb",
    state: {listing: listing}
    });
  };

  return (

    <div>
      <NavigationBar />
      <h1>Listing</h1>
      
      <h2>{location.state.listing.title}</h2>
      <p>{location.state.listing.description}</p>
      <p>
        Price: {location.state.listing.priceLower} - {location.state.listing.priceUpper}
      </p>
      <p>
          <Button onClick={() => offer(location.state.listing)}>Make Offer</Button>
        </p>
    </div>
  );
}
