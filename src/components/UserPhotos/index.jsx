import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserPhotos({ advancedFeatures }) {
    const { userId, photoId } = useParams();
    const navigate = useNavigate();
    const photos = models.photoOfUserModel(userId);
    const initialIndex = photoId
        ? photos.findIndex((p) => p._id === photoId)
        : 0;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(
        initialIndex !== -1 ? initialIndex : 0
    );

    if (!photos || photos.length === 0) {
        return <Typography variant="body1">No photos found.</Typography>;
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const handleNext = () => {
        if (currentPhotoIndex < photos.length - 1) {
            const nextIndex = currentPhotoIndex + 1;
            setCurrentPhotoIndex(nextIndex);
            navigate(`/photos/${userId}/${photos[nextIndex]._id}`);
        }
    };

    const handlePrev = () => {
        if (currentPhotoIndex > 0) {
            const prevIndex = currentPhotoIndex - 1;
            setCurrentPhotoIndex(prevIndex);
            navigate(`/photos/${userId}/${photos[prevIndex]._id}`);
        }
    };

    const renderPhoto = (photo) => (
        <Card className="photo-card" key={photo._id}>
            <CardMedia
                component="img"
                height="300"
                image={`${process.env.PUBLIC_URL}/images/${photo.file_name}`}
                alt="User photo"
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                }}
            />
            <CardContent className="photo-content">
                <Typography variant="body2" color="textSecondary">
                    <strong>Posted on:</strong> {formatDate(photo.date_time)}
                </Typography>
                {photo.comments && photo.comments.length > 0 && (
                    <>
                        <Typography variant="h6" className="comments-title">
                            Comments
                        </Typography>
                        {photo.comments.map((comment) => (
                            <Card className="comment-card" key={comment._id}>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>
                                        <Link to={`/users/${comment.user._id}`}>
                                            {comment.user.first_name} {comment.user.last_name}
                                        </Link>
                                    </strong>{" "}
                                    on {formatDate(comment.date_time)}
                                </Typography>
                                <Typography variant="body2">{comment.comment}</Typography>
                            </Card>
                        ))}
                    </>
                )}
            </CardContent>
        </Card>
    );

    return (
        <Grid container spacing={2} className="photo-grid">
            {advancedFeatures ? (
                <Grid item xs={12}>
                    {renderPhoto(photos[currentPhotoIndex])}
                    <div className="stepper-buttons">
                        <Button
                            variant="contained"
                            disabled={currentPhotoIndex === 0}
                            onClick={handlePrev}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            disabled={currentPhotoIndex === photos.length - 1}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </div>
                </Grid>
            ) : (
                photos.map((photo) => (
                    <Grid item xs={12} key={photo._id}>
                        {renderPhoto(photo)}
                    </Grid>
                ))
            )}
        </Grid>
    );
}

export default UserPhotos;