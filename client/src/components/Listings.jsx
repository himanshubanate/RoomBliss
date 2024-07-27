import React, { useEffect, useState } from "react";
import { categories } from "../data";

import "../styles/Listings.scss";

import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const listing = useSelector((state) => state?.Listings);

  console.log("listingrdx", listing);

  const dispatch = useDispatch();
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
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

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
      {listing?.map((item) => ({}))}
    </div>
  );
};

export default Listings;
