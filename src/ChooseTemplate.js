import { Box, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import {one} from './media'

export default function ChooseTemplate() {
    return (
        <Box>
            <Typography variant="h4">
                <Box textAlign="center" fontWeight={600} >
                    Choose template
                </Box>
                </Typography>
            <Grid container>
                <Grid item xs>
                    <Box maxWidth="200px">
                        <Paper elevation={2}>
                            <img style={{width:"100%"}} src={one} alt="one" />
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
