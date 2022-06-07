import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Box, Button } from '@material-ui/core';
import { axiosInstance } from './App';
import ShowAllUser from './ShowAllUser';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Home = ({ isAuthenticated }) => {

    const classes = useStyles();
    const [startDate, setStartDate] = useState('2022-06-05T10:30');
    const [endDate, setEndDate] = useState('2022-06-20T10:30');
    const [userData, setUserData] = useState(false);

    const dateHandler = () => {
        const data = {
            start_date_time: startDate,
            end_date_time: endDate
        }
        axiosInstance.put('/event-get_user/', data)
            .then((res) => {
                setUserData(res.data.user_data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Fragment>
            {
                userData ?
                    <ShowAllUser userData={{ userData, startDate, endDate }} />
                    :
                    <div>
                        <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                            Select Date and Time
                        </h2>
                        {isAuthenticated ?
                            <Fragment>
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextField
                                        id="datetime-local"
                                        label="Start Date-Time"
                                        type="datetime-local"
                                        defaultValue="2022-06-05T10:30"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <CompareArrowsIcon sx={{ mx: 3 }} />
                                    <TextField
                                        id="datetime-local"
                                        label="End Date-Time"
                                        type="datetime-local"
                                        defaultValue="2022-06-20T10:30"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                    <Button onClick={dateHandler} disabled={!startDate || !endDate} style={{ marginLeft: '20px' }} variant='contained' color='primary'>
                                        Next
                                    </Button>
                                </Box>
                            </Fragment>
                            :
                            <center>Login required!</center>
                        }
                    </div>
            }
        </Fragment>
    )
}

export default Home