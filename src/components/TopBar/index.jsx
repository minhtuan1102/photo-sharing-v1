import React from "react";
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar({ advancedFeatures, setAdvancedFeatures }) {
    const location = useLocation();

    const getContext = () => {
        const path = location.pathname;
        if (path.startsWith("/users/")) {
            const userId = path.split("/")[2];
            const user = models.userModel(userId);
            return user ? `${user.first_name} ${user.last_name}` : "User Details";
        } else if (path.startsWith("/photos/")) {
            const userId = path.split("/")[2];
            const user = models.userModel(userId);
            return user ? `Photos of ${user.first_name} ${user.last_name}` : "User Photos";
        }
        return "Photo Sharing App";
    };

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                <Typography variant="h5" color="inherit" className="topbar-title">
                    Nguyen Minh Tuan
                </Typography>
                <Typography variant="h6" color="inherit" className="topbar-context">
                    {getContext()}
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={advancedFeatures}
                            onChange={(e) => setAdvancedFeatures(e.target.checked)}
                            color="secondary"
                        />
                    }
                    label="Enable Advanced Features"
                />
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;