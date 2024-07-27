import React, { useState } from "react";
import { Menu, Person, Search } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import "../styles/Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.jpg" alt="logo"></img>
      </a>
      <div className="navbar_search">
        <input type="text" placeholder="search..." />
        <IconButton>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <Link to={"/create-listing"} className="link">
            Become A Host
          </Link>
        ) : (
          <Link to={"/create-listing"} className="link">
            Become A Host
          </Link>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }}></Menu>
          {!user ? (
            <Person sx={{ color: variables.darkgrey }}></Person>
          ) : (
            <img
              src={`http://localhost:3000/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}
        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={"/"}>Trip List</Link>
            <Link to={"/"}>Wish List</Link>
            <Link to={"/"}>Property List</Link>
            <Link to={"/"}>Reservstion List</Link>
            <Link to={"/"}>Become a Host</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
