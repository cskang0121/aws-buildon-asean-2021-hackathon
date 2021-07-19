import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import WTBService from "../../services/WTBService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";
import ListingCard from "../ListingCard";

const styles = {
  heading: {
    fontFamily: "Inter, sans-serif",
    fontSize: 30,
    fontWeight: 600,
  },
};

const WTBList = ({ listing, index, deleteWTB }) => {
  const [imgSrc, setImgSrc] = useState("");
  const history = useHistory();

  useEffect(() => {
    getImage(listing);
  }, [listing]);

  const wtbDetails = (listing) => {
    history.push({
      pathname: "/wtb-listing-details",
      state: { listing: listing },
    });
  };

  const getImage = (listing) => {
    WTBService.getListingImage(listing.wtbId).then((res) => {
      const byteCode = res.data;
      const firstChar = byteCode.charAt(0);
      var dataType = "";
      if (firstChar === "/") {
        dataType = "jpg";
      } else if (firstChar === "i") {
        dataType = "png";
      } else {
        dataType = "gif";
      }
      setImgSrc("data:image/" + dataType + ";base64," + byteCode);
    });
  };

  return (
    //card
    // <div key={index}>
    //   {listing.picUri ? <img style={{width:500, height:500, objectFit:"cover"}} src={imgSrc} /> : <p>No image found</p>}
    //   <h2>{listing.title}</h2>
    //   <p>{listing.description}</p>
    //   <p>
    //     <Button onClick={() => wtbDetails(listing)}>View Details</Button>
    //   </p>
    //   <p>
    //     <Button onClick={() => deleteWTB(listing)}>Delete Listing</Button>
    //   </p>
    // </div>
    <div key={index} className="col-3">
      <ListingCard
        listingType="WTB"
        listing={listing}
        imgSrc={imgSrc}
        deleteMyListing={() => deleteWTB(listing)}
        listingDetails={() => wtbDetails(listing)}
      />
    </div>
  );
};

const WTBListings = () => {
  const [listings, setListings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    WTBService.getCurrentUserWTBListings(UserService.getProfile().uid).then(
      (res) => {
        console.log(res.data);
        setListings(res.data);
      }
    );
  };

  function deleteWTB(listing) {
    WTBService.postDeleteWTB(listing).then((res) => {
      fetchListings();
    });
  }

  // function editWTB(listing) {
  //   WTBService.postEditWTB(listing);
  // }

  return listings.map((listing, index) => {
    // const wtbDetails = (listing) => {
    //   history.push({
    //     pathname: "/wtb-listing-details",
    //     state: { listing: listing },
    //   });
    // };
    // // Make something less ugly lmao
    // return (
    //   <div key={index}>
    //     <h2>{listing.title}</h2>
    //     <p>{listing.description}</p>
    //     <p>
    //       Price: {listing.priceLower} - {listing.priceUpper}
    //     </p>
    //     <p>
    //       <Button onClick={() => wtbDetails(listing)}>View Details</Button>
    //     </p>
    //     <p>
    //       <Button onClick={() => deleteWTB(listing)}>Delete Listing</Button>
    //     </p>
    //   </div>
    // );
    return <WTBList index={index} listing={listing} deleteWTB={deleteWTB} />;
  });
};

export default function WTB(props) {
  return (
    <div>
      <div className="row mt-4 ml-4 mr-4">
        <span style={styles.heading}>
          Your "Want to Buy" Listings
        </span>
      </div>

      <div className="row mt-4 ml-4 mr-4">
        <WTBListings />
      </div>
    </div>
  );
}
