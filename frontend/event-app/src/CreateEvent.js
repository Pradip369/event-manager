import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Box, Grid, TextField } from '@material-ui/core';
import { axiosInstance } from './App';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateEvent({ props }) {

    const { modelOpen, setModelOpen, selectionModel, startDate, endDate } = props
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const classes = useStyles();

    const handleClickOpen = () => {
        setModelOpen(true);
    };

    const handleClose = () => {
        setModelOpen(false);
    };

    const eventHandle = () => {
        if (!title) {
            alert("Event title is required!!!")
            return
        }
        const data = {
            event_title: title,
            event_start_time: startDate,
            event_end_time: endDate,
            user_list: selectionModel
        }
        axiosInstance.post('create_event/', data)
            .then((res) => {
                alert("Event created successfully!!")
                setTimeout(function () {
                    window.location.reload()
                }, 300)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <Dialog fullScreen open={modelOpen} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Create New Event
                        </Typography>
                        <Button autoFocus color="inherit" onClick={eventHandle}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ mt: 3 }}>
                    <center>Create new event between this date and time : <b>{startDate}</b> to <b>{endDate}</b></center>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            label="Event Title"
                            variant="outlined"
                            placeholder='Enter event title' />
                    </Box>
                </Box>
            </Dialog>
        </div>
    );
}
