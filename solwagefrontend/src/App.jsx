import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  return (
    <Router>
      <AppRoutes auth={auth} />
    </Router>
  );
}

export default App;
