import { Box,  Button,  Paper } from '@material-ui/core'
import React, {useState, useEffect, useContext} from 'react'
import { Hidden } from '@material-ui/core';
import { usePDF } from '@react-pdf/renderer';
import PdfTemplate1 from './PdfMaker'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import print from "print-js"
import '.././App.css'
import 'react-image-crop/dist/ReactCrop.css';
import {DataContext} from '.././App.js'
import usePdfRerender from './../Hooks/usePdfRerender';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root:{
        height:"100vh",
        width:"100%",
        maxWidth:"100%",
        padding:theme.spacing(3),
        boxSizing: "border-box",
        position:"relative",
        maxHeight:"100vh",
        overflow:"auto"
    }
}))

export default function PdfPreview(){
    const [data, setData] = useContext(DataContext)
    const {triggerUpdate} = data
    const Doc = < PdfTemplate1 data={data} /> 
    const [instance, updateInstance] = usePDF({ document: Doc });
    const [isLoading, setIsLoading] = useState(true)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const classes = useStyles()
    const themeColors = ["red", "blue", "green", "orange", "purple", "black"]

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }

    //This effect shows the blinking blue section while the document updates
    useEffect(() => {
        const mockLoading = setTimeout(() => {
            setIsLoading(false)
        }, 1500);
        setData({...data, documentUrl:instance.url})
        return () => {
            clearInterval(mockLoading)
            setIsLoading(true)
        }
    }, [triggerUpdate, instance.url])
   
    // This make the Pdf render anytime the triggerUpdate state change
    useEffect(updateInstance, [triggerUpdate]);
    
  
    
    return(
        <Box className={classes.root}>
                    <Box display="flex" marginBottom="20px" zIndex={20} >
                        {themeColors.map(item => < SelectColor key={item} color= {item} />) }
                        <Hidden mdDown >
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{marginLeft:"auto"}}
                                onClick={() =>{print(instance.url); }}
                                >
                                    { instance.loading ? 'Loading document...' : 'Print now!' }
                            </Button>
                        </Hidden>
                        
                    </Box>
            {
                isLoading ?
                <Box bgcolor="red" height="100%" 
                     width="100%" 
                     className="pulse" 
                >
                </Box>
                :
                <Box>
                    <Paper elevation={2}>
                        <Document file={instance.url} onLoadSuccess={onDocumentLoadSuccess}  >
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </Paper>
                    <p>Page {pageNumber} of {numPages}</p> 
                </Box>
            }
        </Box>

    )
}


/** This component changes the theme color of the document 
 * @param {Object} props
 * @param {String} props.color The choosen color
*/
const SelectColor = ({color}) => {
    const [data, setData] = useContext(DataContext)
    const triggerPdfRerender = usePdfRerender()
    
    const updateColor =  () => {
            setData(prev => ({...prev, themeColor:color}))
            triggerPdfRerender()
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