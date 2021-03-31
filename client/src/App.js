import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";
import "./styles/bootstrap.min.css";
import "./styles/app.css";
import "./styles/responsive.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthentificated = !!token;
  const routes = useRoutes(isAuthentificated);
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthentificated }}
    >
      <div className="App">
        <Router>
          {isAuthentificated && <Navbar />}
          {routes}
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
