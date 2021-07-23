import { Box,  Button,  TextField, Typography } from '@material-ui/core'
import React, {useState, useEffect, useContext, useCallback} from 'react'
import { Grid, Hidden } from '@material-ui/core';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { pdf,  usePDF } from '@react-pdf/renderer';
import Quixote from './react-pdf/PdfMaker'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import print from "print-js"
import './App.css'
import 'react-image-crop/dist/ReactCrop.css';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SingleInput from './SingleInput';
import AlertDialog from './AlertDialog';
import {DataContext} from './App.js'
import CropTest from './CropTest';


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
    }
  }));

 



// const  getStepContent = [
//                     <BusinessDetails />,
//                     <PersonalDetails />
//                     ,

//                     <Container maxWidth="sm">
//                         <Box display="flex" flexDirection="column"  >
//                             <TextField label="About" variant="outlined" multiline minRows={3} />
//                         </Box>
//                     </Container>,

//                     <Container maxWidth="xs">
//                         <Box display="flex" flexDirection="column"  >
//                             <SingleInput key="Core Competencies" sectionName={"about"} />
//                         </Box>
//                     </Container>,

//                     <Container maxWidth="xs">
//                         <Box display="flex" flexDirection="column"  >
//                             <SingleInput key="Differntiators" sectionName={"about"} />
//                         </Box>
//                     </Container>
// ]
// function getStepContent(step) {
//     switch (step) {
//       case 0:
//         return (
//                     <BusinessDetails />
//                 );
//       case 1:
//         return (
//                     <Container maxWidth="xs">
//                         <Box display="flex" flexDirection="column"  >
//                             <TextField key="personalName" label="Name" variant="outlined" />
//                             <TextField key="personalEmail" label="Personal Email" variant="outlined" />
//                             <TextField key="personalMobile" label="Personal Mobile" variant="outlined" />
//                             <TextField key="personalAddress" label="Personal Address" variant="outlined" />
//                         </Box>
//                     </Container>
//                 );
//       case 2:
//         return (
//                     <Container maxWidth="sm">
//                         <Box display="flex" flexDirection="column"  >
//                             <TextField label="About" variant="outlined" multiline minRows={3} />
//                         </Box>
//                     </Container>
//                 );
//       case 3:
//         return (
//                     <Container maxWidth="xs">
//                         <Box display="flex" flexDirection="column"  >
//                             <SingleInput key="Core Competencies" sectionName={"about"} />
//                         </Box>
//                     </Container>
//                 );
//       case 4:
//         return (
//                     <Container maxWidth="xs">
//                         <Box display="flex" flexDirection="column"  >
//                             <SingleInput key="Differntiators" sectionName={"about"} />
//                         </Box>
//                     </Container>
//                 );
//       default:
//         return 'Unknown step';
//     }
//   }

export default function BusinessData() {
    const classes = useStyles()
    const [data, setData] = useContext(DataContext)
    const [texx, settexx] = useState("")

  
  

  const handleIput = (e) => {
    settexx(e.target.value)
  }
  
 
  

    return (
        <Box className={classes.root} >
            
            <Grid container direction="row" >
                <Grid item xs={12} sm={12} md container direction="column"  >
                    <Grid item>
                        <Typography variant="h6">
                            <Box textAlign="center" fontWeight="bold" >
                                Coperate Data
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <HorizontalLinearStepper  />
                    </Grid>
                </Grid>

                    <Grid item container   xs={12} sm={12} md >
                        <Hidden smDown>
                            <GeneratedPdf data={data}/>
                        </Hidden>
                        <Hidden mdUp >
                            {/* <AlertDialog text="View Pdf" content={<GeneratedPdf/>} /> */}
                        </Hidden>
                    </Grid>
            
            </Grid>
        </Box>
    )
}





const GeneratedPdf  = ({data}) => {
    const [texx, settexx] = useState("")
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

        return () => {
            clearInterval(mockLoading)
            setIsLoading(true)
        }
    }, [triggerUpdate])
    useEffect(updateInstance, [triggerUpdate]);
    
  
    
    return(
        <Box  height="100vh" width="100%" maxWidth="100%" padding={3} boxSizing="border-box" position="relative"   maxHeight="100vh" overflow="auto" >
            {
                isLoading ?
                <Box bgcolor="red" width="100%" height="100%" className="pulse" >

                </Box>
                :
                <Box>
                    <Document
                        file={instance.url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        on
                    >
                    <   Page pageNumber={pageNumber} />

                        <p>Page {pageNumber} of {numPages}</p> 
                        {/* <Box position="absolute"  bottom="0px" > */}
                        <Button
                            onClick={() =>{
                                print(instance.url);
                                }}
                        >
                            {
                                instance.loading ? 'Loading document...' : 'Print now!'
                            }
                        </Button>
                        {/* </Box> */}
                    </Document>
                </Box>
            }
        </Box>

    )
}