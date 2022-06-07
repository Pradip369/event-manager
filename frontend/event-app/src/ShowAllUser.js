import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box } from '@material-ui/core';
import CreateEvent from './CreateEvent';
import Avatar from '@material-ui/core/Avatar';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', width: 220 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    { field: 'start_date_time', headerName: 'Start Date Time', width: 250 },
    { field: 'end_date_time', headerName: 'End Date Time', width: 250 },
]

const ShowAllUser = ({ userData: { userData, startDate, endDate } }) => {

    const [availableRows, setAvailableRows] = useState(false);
    const [unAvailableRows, setUnAvailableRows] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const [modelOpen, setModelOpen] = useState(false);

    useEffect(() => {
        console.log(userData)
        const av_data = [];
        const un_av_data = [];

        userData.filter((item) => {
            if (item.is_available) {
                av_data.push(item)
            }
            else {
                un_av_data.push(item)
            }
        })
        setAvailableRows(av_data);
        setUnAvailableRows(un_av_data)
    }, []);

    console.log(selectionModel)

    const findAvg = () => {
        let get_avg = (availableRows.length / (availableRows.length + unAvailableRows.length)) * 100
        return Math.round(get_avg)
    }

    return (
        <Fragment>
            <center>
                <h3>Totla user avaibility</h3>
                <Avatar style={{ height: '80px', width: '80px', background: 'green' }}>
                    <strong>{findAvg()} %</strong>
                </Avatar>
            </center>
            <h3>Total Available users : <b>{availableRows.length}</b></h3>
            <Box style={{ height: 400, width: '100%', marginTop: '20px' }}>
                {
                    availableRows &&
                    <Fragment>
                        <DataGrid
                            hideFooterPagination
                            rows={availableRows}
                            columns={columns}
                            checkboxSelection
                            onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
                        />
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => setModelOpen(true)}
                                disabled={selectionModel.length === 0 ? true : false}
                                variant='contained'
                                sx={{ px: 8, mr: 4 }}>
                                Next
                            </Button>
                        </div>
                    </Fragment>
                }
            </Box>
            <br /><br /><br />
            <Box>
                <h3>Total un-available users : <b>{unAvailableRows.length}</b></h3>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    {
                        unAvailableRows &&
                        <DataGrid
                            hideFooterPagination
                            rows={unAvailableRows}
                            columns={columns}
                            disableColumnSelector
                        />
                    }
                </div>
            </Box>

            <CreateEvent props={{ modelOpen, setModelOpen, selectionModel, startDate, endDate }} />
        </Fragment>
    )
}

export default ShowAllUser