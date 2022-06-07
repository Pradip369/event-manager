import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from './App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({ isAuthenticated }) {
    const classes = useStyles();
    const navigate = useNavigate();

    const userLogOut = () => {
        axiosInstance.put('/auth/logout/')
            .then((res) => {
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} onClick={() => navigate('/')}>
                        Event Management
                    </Typography>
                    {isAuthenticated ?
                        <Button color="inherit" onClick={userLogOut}>Logout</Button>
                        :
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}