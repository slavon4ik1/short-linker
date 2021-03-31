import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useHistory } from "react-router-dom";

function CreatePage() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };
  const buttonHandler = async () => {
    try {
      const data = await request(
        "/api/link/generate",
        "POST",
        { from: link },
        { Authorization: `Bearer ${auth.token}` }
      );
      history.push(`/detail/${data.link._id}`);
    } catch (e) {}
  };
  return (
    <div>
      <div className="uni-banner color-bg">
        <div className="uni-banner-overlay">
          <div className="container">
            <div className="banner-text">
              <h1>Create Your Link</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="comment-form contact-form" id="comment-form">
              <div className="input-card">
                <label htmlFor="link">Enter Link</label>
                <input
                  style={{ background: "#fff", color: "#000" }}
                  className="form-control"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  onKeyPress={pressHandler}
                  type="text"
                  id="link"
                  placeholder="enter link"
                />
              </div>
              <button className="uni-button" onClick={buttonHandler}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
