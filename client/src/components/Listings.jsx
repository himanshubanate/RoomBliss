import React, { useEffect, useState } from "react";
import { categories } from "../data";

import "../styles/Listings.scss";

import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "./ListingCard";

const Listings = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:4001/properties?category=${selectedCategory}`
          : "http://localhost:4001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("datadatadatadata", data);
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  console.log("listingrdx", listings);

  useEffect(() => {
    if (selectedCategory) getFeedListings();
  }, [selectedCategory]);

  return (
    <div className="category-list">
      {categories?.map((category, index) => {
        return (
          <div
            className="category"
            key={index}
            onClick={() => setSelectedCategory(category?.label)}
          >
            <div className="category_icon">{category?.icon}</div>
            <p>{category?.label}</p>
          </div>
        );
      })}
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Listings;
