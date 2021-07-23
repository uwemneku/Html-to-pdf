import { Box,  Button,  Fab,  Paper,  Typography } from '@material-ui/core'
import React, {useState, useEffect, useContext} from 'react'
import { Grid, Hidden } from '@material-ui/core';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { usePDF } from '@react-pdf/renderer';
import Quixote from './react-pdf/PdfMaker'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import print from "print-js"
import './App.css'
import 'react-image-crop/dist/ReactCrop.css';
import { makeStyles } from '@material-ui/core/styles';
import AlertDialog from './AlertDialog';
import {DataContext} from './App.js'


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

 




export default function BusinessData() {
    const classes = useStyles()
    const [data, setData] = useContext(DataContext)
    const [texx, settexx] = useState("")

  
  

  
 
  

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
                            <GeneratedPdf data={data}/>
                        </Hidden>
                        <Hidden mdUp >
                        <Fab className={classes.fab} color="primary" variant="extended">
                            Preview pdf
                            <Box position="absolute" style={{opacity:0}} >
                                <AlertDialog fullScreen text="View Pdf" content={<GeneratedPdf  data={data}/>} />
                            </Box>
                        </Fab>
                        </Hidden>
                    </Grid>
            
            </Grid>
        </Box>
    )
}





export const GeneratedPdf  = () => {
    const [texx, settexx] = useState("")
    const [data, setData] = useContext(DataContext)
    const {triggerUpdate} = data
    const Doc = < Quixote data={data} /> 
    const [instance, updateInstance] = usePDF({ document: Doc });
    const [isLoading, setIsLoading] = useState(true)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    useEffect(() => {
        const mockLoading = setTimeout(() => {
            setIsLoading(false)
        }, 1500);
        setData({...data, documentUrl:instance.url})
        console.log(data.documentUrl)

        return () => {
            clearInterval(mockLoading)
            setIsLoading(true)
        }
    }, [triggerUpdate, instance.url])
   
    useEffect(updateInstance, [triggerUpdate]);
    
  
    
    return(
        <Box  height="100vh" width="100%" maxWidth="100%" padding={3} boxSizing="border-box" position="relative"   maxHeight="100vh" overflow="auto" >
                    <Box display="flex" marginBottom="20px" zIndex={20} >
                        {
                            ["red", "blue", "green", "orange", "purple", "black"].map(item => < SelectColor key={item} color= {item} />)

                        }
                        <Hidden mdDown >
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{marginLeft:"auto"}}
                                    onClick={() =>{
                                        print(instance.url);
                                        }}
                                >
                                    {
                                        instance.loading ? 'Loading document...' : 'Print now!'
                                    }
                            </Button>
                        </Hidden>
                        
                    </Box>
            {
                isLoading ?
                <Box bgcolor="red" width="100%" height="100%" className="pulse" >

                </Box>
                :
                <Box>
                    <Paper elevation={2}>
                        <Document
                            file={instance.url}
                            onLoadSuccess={onDocumentLoadSuccess}
                            on
                        >
                        <   Page pageNumber={pageNumber} />
                        </Document>
                    </Paper>

                            <p>Page {pageNumber} of {numPages}</p> 
                </Box>
            }
        </Box>

    )
}

const SelectColor = ({color}) => {
    const [data, setData] = useContext(DataContext)
    
    const updateColor = 
        () => {
            setData(prev => {
                const trig = prev.triggerUpdate
                                return {...prev, themeColor:color, triggerUpdate:!trig }
            })
        }
    return (
        <Box width="30px" height="30px" marginBottom="10px" marginRight="5px" onClick={updateColor}  >
            <Paper elevation={2} style={{backgroundColor:color}}  >
                <Box padding="20px"  width="100%" height="100%"  >
                
                </Box>
            </Paper>
        </Box>
    )
}