import { Box, TextField, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { Grid } from '@material-ui/core';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { pdf, PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import Quixote from './react-pdf/PdfMaker'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import print from "print-js"
import './App.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CropTest from './CropTest';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
  }));

function getStepContent(step) {
    switch (step) {
      case 0:
        return (
                    <Container maxWidth="xs">
                        <Box display="flex" flexDirection="column"  >
                            <TextField label="Name" variant="outlined" />
                            <TextField label="Email" variant="outlined" />
                            <TextField label="Mobile" variant="outlined" />
                            <TextField label="Address" variant="outlined" />
                        </Box>
                    </Container>
                );
      case 1:
        return (
                    <Container maxWidth="xs">
                        <Box display="flex" flexDirection="column"  >
                            <TextField label="CAGE" variant="outlined" />
                            <TextField label="DUNS" variant="outlined" />
                        </Box>
                    </Container>
                    
                );
      default:
        return 'Unknown step';
    }
  }

export default function BusinessData() {
    const classes = useStyles()
    const [texx, settexx] = useState("")
    const [imagePage, setImagePage] = useState(null)
    const Doc = < Quixote aboutUs={texx} img={imagePage} /> 
    const [instance, updateInstance] = usePDF({ document: Doc });
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleIput = (e) => {
    settexx(e.target.value)
  }
  
 
  useEffect(updateInstance, [texx, imagePage]);

    return (
        <Box className={classes.root} >
            <Grid container direction="row" >
                <Grid item xs container direction="column"  >
                    <Grid item>
                        <Typography variant="h6">
                            <Box textAlign="center" fontWeight="bold" >
                                Coperate Data
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <HorizontalLinearStepper getStepContent={getStepContent} />
                    </Grid>
                </Grid>
                <Grid item xs >
                    <Box height="100vh" maxHeight="100vh" overflow="scroll" >
                    {
                        instance.loading ?
                        <Box bgcolor="red" width="100%" height="100%" >

                        </Box>
                        :
                        <Box>
                            <Document
                            className="w-1/2"
                            file={instance.url}
                            onLoadSuccess={onDocumentLoadSuccess}
                            >
                            <Page pageNumber={pageNumber} />
                            </Document>
                            <p>Page {pageNumber} of {numPages}</p>
                            <div>
                            <input type="text" className="ring-2" onChange={handleIput} />
                            <button onClick={async() =>{
                            const blob = await pdf(Doc ).toBlob();
                            print(URL.createObjectURL(blob));
                            }}>
                            {
                                instance.loading ? 'Loading document...' : 'Print now!'
                            }
                            </button>
                        </div>
                        </Box>
                    }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
