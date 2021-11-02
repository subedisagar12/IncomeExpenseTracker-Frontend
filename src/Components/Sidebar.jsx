import React from "react";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const location = useLocation();
  console.log(location.pathname === "/dashboard");
  return (
    <div>
      <div
        className="d-flex flex-column flex-shrink-0 bg-light "
        style={{ width: "100px", height: "100%" }}
      >
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li>
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard"
                  ? "nav-link  py-3 border-bottom active"
                  : "nav-link py-3 border-bottom"
              }
            >
              <i className="fas fa-tachometer-alt"></i> <small>Dashboard</small>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard/transactions"
              className={
                location.pathname === "/dashboard/transactions"
                  ? "nav-link py-3 border-bottom active"
                  : "nav-link py-3 border-bottom"
              }
            >
              <i className="fas fa-wallet"></i> <small>Transaction</small>
            </Link>
          </li>

          {/* <li>
            <a href="#" className="nav-link py-3 border-bottom">
              <i className="fas fa-chart-line"></i>
              <small>Report</small>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom">
              <i className="fa fa-cog"></i> <small>Settings</small>
            </a>
          </li> */}
          {/* <li>
            <a href="#" className="nav-link py-3 border-bottom">
              <i className="fa fa-bookmark"></i> <small>Bookmark</small>
            </a>
          </li> */}
        </ul>
        {/* <div className="dropdown border-top">
          <a
            href="#"
            className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="24"
              height="24"
              className="rounded-circle"
            />
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser3"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
