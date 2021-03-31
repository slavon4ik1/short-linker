import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <div>
      {/* <NavLink to="/create">create</NavLink> */}

      <div className="header">
        <div className="navbar-area">
          <div className="main-nav">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                  style={{ display: "block" }}
                >
                  <ul className="navbar-nav m-auto">
                    <li className="nav-item plus-icon">
                      <NavLink
                        activeClassName="active"
                        className="nav-link"
                        to="/create"
                      >
                        Create Page
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        activeClassName="active"
                        className="nav-link"
                        to="/links"
                      >
                        Links Page
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <a href="/" className="nav-link" onClick={logoutHandler}>
                        logOut
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
