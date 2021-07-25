import React, { useContext,  useState } from 'react'
import { Box, Grid, Container, Paper, Avatar } from '@material-ui/core';
import AlertDialog from '../components/AlertDialog';
import CropTest from '../components/CropImage';
import { DataContext } from '../App';
import PositionedSnackbar from '../components/PositionedSnackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    removeIcon:{
        position:"absolute",
        right:0,
        top:0,
        fontWeight: 700,
        height: 20,
        width: 20,
        borderRadius:"0px 0px 0px 3px",
        textAlign:"center",
        color:"white",
        cursor: "pointer",
        backgroundColor: "red",

    }
}))

/**
 * This componet handle partner image upload
 */
function Partners() {
    const [data, setData] = useContext(DataContext)
    const {partnersImage} = data
    const [imageUrl, setImageUrl] = useState(null)      
    const [openSnack, setOpenSnack] = useState(false)   // State to manage snack notification
    const  classes = useStyles()

    /** This function adds an image to the partner list and triggers the documnet update*/
    const pushImageToList = () => {
        if(partnersImage.length >= 3){
            setOpenSnack(true)
            setTimeout(() => {
                setOpenSnack(false)
            }, 2000);
        }
        else{
            setData({...data, partnersImage:[...partnersImage, imageUrl], triggerUpdate:!data.triggerUpdate })
        }
    }

    /** Removes an image url from partnersImage state */
    const removeImage = (url) => {
        setData({...data, partnersImage:partnersImage.filter(i => i !== url), triggerUpdate:!data.triggerUpdate })   
    }

   
    return (
        <Container disableGutters={true} >
            <Grid container direction="row" 
                  justifyContent="center" 
                  alignItems="center" >
                {
                    partnersImage.map(item => (
                        <Grid item key={item}  >
                            <Box width="fit-content" margin={2} position="relative" >
                                <Paper elevation={1}>
                                    <Box textAlign="center" padding={2} >
                                            <Avatar style={{width:60, height:60}} src={item} />
                                    </Box>
                                </Paper>
                                <Box className={classes.removeIcon} onClick = {() => removeImage(item) }>
                                    X
                                </Box>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
             <Container maxWidth="xs"  >
                <AlertDialog keepMounted={false} 
                             onClose={pushImageToList} 
                             text="Upload business partner logo" 
                             content={<CropTest aspectRatio={1}  croppedImageUrl={setImageUrl}  />} 
                />
             </Container>
             <PositionedSnackbar position="Top-Left"  
                                 text={"This template takes only three images"} 
                                 open={openSnack} />
        </Container>
   )
}

export default Partners;