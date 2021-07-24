import { Box, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {one, two, three, four} from '../media'

export default function ChooseTemplate() {
    return (
        <Box>
            <Typography variant="h4">
                <Box textAlign="center" marginBottom="20px" fontWeight={600} >
                    Choose template
                </Box>
                </Typography>
            <Grid container justifyContent="center" spacing={4} wrap>
                <Grid item>
                    <Box maxWidth="200px">
                        <Paper elevation={2}>
                            <Link to="/template1" >
                                <img style={{width:"100%"}} src={one} alt="one" />
                            </Link>
                        </Paper>
                    </Box>
                </Grid>
                {/* <Grid item>
                    <Box maxWidth="200px">
                        <Paper elevation={2}>
                            <Link to="/template1" >
                                <img style={{width:"100%"}} src={three} alt="one" />
                            </Link>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item>
                    <Box maxWidth="200px">
                        <Paper elevation={2}>
                            <Link to="/template1" >
                                <img style={{width:"100%"}} src={four} alt="one" />
                            </Link>
                        </Paper>
                    </Box>
                </Grid> */}
            </Grid>
        </Box>
    )
}
