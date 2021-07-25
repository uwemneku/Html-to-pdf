import { Box, Button, Container,  FormControlLabel, Grid, Hidden, Paper, Switch, Typography, useMediaQuery } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import Template1 from './Templates/Template1'
import BusinessDetails from './formdetails/BusinessDetails';
import AboutUs from './formdetails/AboutUs';
import Partners from './formdetails/Partners';
import PersonalDetails from './formdetails/PersonalDetails';
import { DataContext } from './App';
import List from './formdetails/List';
import GetDocumentModal from './components/GetDocumentModal';
import usePdfRerender from './Hooks/usePdfRerender';
import { one } from './media';
import Grow from '@material-ui/core/Grow';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root:{
        "& button":{
            margin:8,
            marginTop: 10
        }

    },
    documentPreview:{
        maxHeight:"100vh", 
        paddingBottom:"100px", 
        overflow:"auto",
        position:"relative",
        backgroundColor:"white",
        [theme.breakpoints.down("sm")]:{
            zIndex:20,
            position:"absolute",
            left:0,
            width: "100vw",
            
        },
    },
    formsection:{
        maxHeight:"100vh", 
        maxWidth:"360px", 
        overflow:"auto", 
        paddingTop:"40px", 
        paddingBottom:"100px", 
        paddingRight:"20px", 
        paddingLeft:"20px",
        [theme.breakpoints.down("sm")]:{
            maxWidth: "100vw",
            width:"100vw",
            
        }
    }
}))


export default function EditHome() {
    const [data, setData] = useContext(DataContext)
    const {competencies, differentiators, naics} = data
    const updateDocument = usePdfRerender()
    const themeColors = ["red", "blue", "green", "orange", "purple", "black"]
    const [showTemplateImage, setshowTemplateImage] = useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [showPreview, setShowPreview] = useState(false)
    const classes = useStyles()
    
    const [open, setOpen] = React.useState(false);
    const handleSwitchChange = () => {
        setshowTemplateImage(!showTemplateImage)
    } 

    useEffect(() => {
        matches && setShowPreview(true)
        console.log(matches)
    }, [matches])

    const handleOpen = () => {
        setOpen(true);
        updateDocument()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePreview = () => {
        setShowPreview(!showPreview)
    }
    
  
  
    return (
        <Box className={classes.root} maxHeight="100vh" overflow="hidden" padding="20px" boxSizing="border-box" >
            <Grid container>
                <Grid item className={classes.formsection} >
                    <PersonalDetails/>
                    <Box height="40px" />
                    <BusinessDetails  />
                    <Box height="20px" />
                    <AboutUs />
                    <Box height="40px" />
                    <Partners />
                    <Box height="40px" />
                    <List  sectionData={competencies} sectionName="competencies" />, 
                    {/* <Box height="40px" /> */}
                    <List sectionData={differentiators} sectionName="differentiators"  />, 
                    {/* <Box height="40px" /> */}
                    <List sectionData={naics} sectionName="naics"  />,
                </Grid>

                <Grow in={showPreview} >
        
                    <Grid item  xs className={classes.documentPreview} >
                        <Container maxWidth="sm"  >
                            <Grid container style={{margin:"10px"}} >
                                {themeColors.map(item => 
                                    <Grid key={item} item>
                                        < SelectColor key={item} color= {item} />  
                                    </Grid>
                                ) }
                                    <FormControlLabel 
                                        style={{marginLeft:"auto"}}
                                        control={<Switch onChange={handleSwitchChange} />}
                                        label="View template"
                                    />
                            </Grid>
                            {
                                showTemplateImage ? <img width="100%" src={one} alt="kjjnjknk" /> : <Template1 /> 
                            }
                            
                            
                        </Container>
                    </Grid>
                
                </Grow>
            </Grid>
         <Box display="flex" flexDirection="row" zIndex={60} right={10}  position="fixed" bottom="20px" bgcolor="white"  >
                     <GetDocumentModal open={open} close={handleClose} />
                     <Hidden mdUp>
                        <Button variant="contained" color="primary" onClick={handlePreview}  >
                            { showPreview ? "Close Preview" : "Preview Document"}
                        </Button>
                    </Hidden>
                     <Button variant="contained" color="primary" onClick={handleOpen}  >
                         Export Document
                     </Button>
          </Box>
        </Box>
    )
}

const SelectColor = ({color}) => {
    const [data, setData] = useContext(DataContext)
    
    const updateColor =  () => {
            setData({...data, themeColor:color})
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