import React from "react";
import { Button } from "react-bootstrap";

const styles = {
  text: {
    fontFamily: "Inter, sans-serif",
  },
};
export default function ListingCard({
  listingType,
  listing,
  imgSrc,
  deleteMyListing,
  listingDetails,
}) {
  return (
    <div className="card shadow m-1">
      {listing.picUri && imgSrc ? (
        <img className="card-img-top" style={{ height: "18vw", objectFit: "cover" }} src={imgSrc} />
      ) : (
        <p className="text-center">No image found</p>
      )}
      <div className="card-body text-center" style={styles.text}>
        <h5 className="card-title">{listing.title}</h5>
        <p className="card-text text-justify">{listing.description}</p>
        {listingType === "WTB" ? (
          <p>
            <b>Asking Price:</b> S$ {listing.priceLower} - {listing.priceUpper}
          </p>
        ) : (
          <p>
            <b>Price:</b> S$ {listing.price}
          </p>
        )}
        <p>
          <Button onClick={listingDetails}>View Details</Button>
        </p>
        {deleteMyListing ? (
          <p>
            <Button className="btn-danger" onClick={deleteMyListing}>
              Delete Listing
            </Button>
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
