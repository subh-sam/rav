
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { logout } from "../store/authSlice";

function Header() {
    const dispatch = useDispatch();
    const { logOut } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch(logout());
        logOut();
    };

    return (
        <AppBar position="static" elevation={2}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FitnessCenterIcon />

                    <Typography variant="h6" component="h1" fontWeight="bold">
                        AI Fitness Recommendation
                    </Typography>
                </Box>

                <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{
                        borderColor: "rgba(255,255,255,0.7)",
                        "&:hover": {
                            borderColor: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                    }}
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;