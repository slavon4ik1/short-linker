import React from "react";
import { Link } from "react-router-dom";

function LinksList({ links }) {
  if (!links.length) {
    return (
      <div className="uni-banner color-bg">
        <div className="uni-banner-overlay">
          <div className="container">
            <div className="banner-text">
              <h2 style={{ color: "#fff" }}>No links</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table
              className="table table-striped "
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                marginTop: "20px"
              }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Link</th>
                  <th scope="col">Short Link</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => {
                  return (
                    <tr key={link._id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <p>{link.from}</p>
                      </td>
                      <td>{link.to}</td>
                      <td>
                        <Link className="go-link" to={`/detail/${link._id}`}>
                          Go
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinksList;
