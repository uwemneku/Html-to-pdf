import { Box,  Fab,  Typography } from '@material-ui/core'
import React, {useContext} from 'react'
import { Grid, Hidden } from '@material-ui/core';
import HorizontalLinearStepper from '../components/HorizontalLinearStepper';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '.././App.css'
import 'react-image-crop/dist/ReactCrop.css';
import { makeStyles } from '@material-ui/core/styles';
import AlertDialog from '../components/AlertDialog';
import {DataContext} from '.././App.js'
import PdfPreview from '../react-pdf/PdfPreview';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& .MuiFormControl-root': {
          margin:"10px 0px"
      }
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    page:{
        [theme.breakpoints.down("md")]:{
            position: "absolute",
            top:"0px",
            left:"0px"
        }
    },
    fab:{
        position:"fixed",
        bottom:30,
        right:30
    }
  }));

 




export default function CreatePdf() {
    const classes = useStyles()
    const [data, setData] = useContext(DataContext)
    return (
        <Box className={classes.root} >
            
            <Grid container direction="row" >
                <Grid item xs={12} sm={12} md container direction="column"  >
                    <Grid item>
                        <Typography variant="h6">
                            <Box textAlign="center" fontWeight="bold" >
                                {/* Coperate Data */}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid style={{marginTop:"50px", marginBottom:"100px"}}  item>
                        <HorizontalLinearStepper  />
                    </Grid>
                </Grid>

                    <Grid item container   xs={12} sm={12} md >
                        <Hidden smDown>
                            <PdfPreview data={data}/>
                        </Hidden>
                        <Hidden mdUp >
                        <Fab className={classes.fab} color="primary" variant="extended">
                            Preview pdf
                            <Box position="absolute" style={{opacity:0}} >
                                <AlertDialog fullScreen text="View Pdf" content={<PdfPreview />} />
                            </Box>
                        </Fab>
                        </Hidden>
                    </Grid>
            
            </Grid>
        </Box>
    )
}





