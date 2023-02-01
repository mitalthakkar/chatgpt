import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="App">
      <div className="container">
        <div className="navbar">
          <div className="logo"></div>
          <nav>
            <ul id="MenuItems">
              <li>
                <Link
                  className="primary-link"
                  to={{
                    pathname: `/home`,
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="primary-link"
                  to={{
                    pathname: `/compare`,
                  }}
                >
                  Compare
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            className="primary-link"
            to={{
              pathname: `/cart`,
            }}
          >
            <img
              src="https://i.ibb.co/PNjjx3y/cart.png"
              alt=""
              width="30px"
              height="30px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
