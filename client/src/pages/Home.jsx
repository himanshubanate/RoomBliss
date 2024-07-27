import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Listings from "../components/Listings";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </div>
  );
};

export default Home;
