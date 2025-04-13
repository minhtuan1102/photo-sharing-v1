import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserDetail() {
    const { userId } = useParams();
    const user = models.userModel(userId);

    if (!user) {
        return <Typography variant="body1">User not found.</Typography>;
    }

    return (
        <Card className="user-detail-card">
            <CardContent className="user-detail-content">
                <Typography variant="h5" className="user-detail-title">
                    {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="body1" color="textSecondary" className="user-detail-text">
                    <strong>Location:</strong> {user.location || "Not specified"}
                </Typography>
                <Typography variant="body1" color="textSecondary" className="user-detail-text">
                    <strong>Description:</strong> {user.description || "Not specified"}
                </Typography>
                <Typography variant="body1" color="textSecondary" className="user-detail-text">
                    <strong>Occupation:</strong> {user.occupation || "Not specified"}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/photos/${user._id}`}
                    className="user-detail-button"
                >
                    View Photos
                </Button>
            </CardContent>
        </Card>
    );
}

export default UserDetail;