import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useAuth from "./hooks/useAuth";
import TestUserSwitcher from "./components/TestUserSwitcher";

function App() {
  const auth = useAuth();

  return (
    <Router>
      <AppRoutes auth={auth} />
      {/* Test User Switcher - Remove this in production */}
      <TestUserSwitcher />
    </Router>
  );
}

export default App;
