import React from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserList() {
    const users = models.userListModel();

    return (
        <List component="nav">
            {users.map((user) => (
                <React.Fragment key={user._id}>
                    <ListItem button component={Link} to={`/users/${user._id}`}>
                        <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
}

export default UserList;