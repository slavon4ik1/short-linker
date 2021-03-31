import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import "./styles.css";
function AuthPage() {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const message = useMessage();
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };
  return (
    <div>
      <div className="uni-banner team-banner color-bg">
        <div className="uni-banner-overlay">
          <div className="container">
            <div className="banner-text">
              <h1>Short Link</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="banner color-bg">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="banner-text-content">
                <div className="banner-text">
                  <h6>Short Link</h6>
                  <h3>For your Business campaign</h3>
                  <p>You can create short link and share</p>
                </div>
              </div>
              <div className="comment-form contact-form" id="comment-form">
                <h3 className="section-headline">Login or Register</h3>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="input-card">
                      <label htmlFor="email">your Email</label>
                      <input
                        className="form-control"
                        onChange={changeHandler}
                        value={form.email}
                        name="email"
                        type="text"
                        id="email"
                        placeholder="email"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="input-card">
                      <label htmlFor="password">Your Password</label>
                      <input
                        className="form-control"
                        onChange={changeHandler}
                        value={form.password}
                        name="password"
                        type="password"
                        id="password"
                        placeholder="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <button
                      className="uni-button"
                      disabled={loading}
                      type="button"
                      onClick={loginHandler}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <button
                      className="uni-button"
                      disabled={loading}
                      type="button"
                      onClick={registerHandler}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="banner-img">
                <img src="assets/images/banner1.png" alt="people" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
