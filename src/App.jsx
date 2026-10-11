
import "./App.css";

import { Box, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import Header from "./components/Header";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router";

import { logout, setCredentials } from "./store/authSlice";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  return (
    <Box sx={{ p: 2, border: "1px dashed grey" }}>
      <ActivityForm
        onActivityAdded={() => window.location.reload()}
      />
      <ActivityList />
    </Box>
  );
};

function App() {
  const { token, tokenData, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
  }, [token, tokenData, dispatch]);

  // Token nahi hai to login button/page mat dikhao.
  // Automatic login authConfig/library se handle hoga.
  if (!token) {
    return null;
  }

  return (
    <Router>
      {!token ? null : (
        <>
          <Header />

          <Box component="main" sx={{ p: 2 }}>
            <Routes>
              <Route
                path="/activities"
                element={<ActivitiesPage />}
              />

              <Route
                path="/activities/:id"
                element={<ActivityDetail />}
              />

              <Route
                path="/"
                element={<Navigate to="/activities" replace />}
              />

              <Route
                path="*"
                element={<Navigate to="/activities" replace />}
              />
            </Routes>
          </Box>
        </>
      )}
    </Router>
  );
}

export default App;