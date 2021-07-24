import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, Container, Paper, Avatar } from '@material-ui/core';
import AlertDialog from '../AlertDialog';
import CropTest from '../CropTest';
import { DataContext } from '../App';
import PositionedSnackbar from '../PositionedSnackbar';


export default function Partners() {
    const [data, setData] = useContext(DataContext)
    const {partnersImage} = data
    const [imageUrl, setImageUrl] = useState(null)
    const [openSnack, setOpenSnack] = useState(false)

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

    const removeImage = (url) => {
        setData({...data, partnersImage:partnersImage.filter(i => i !== url), triggerUpdate:!data.triggerUpdate })   
    }

   
    return (
        <Container disableGutters={true} >
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                {
                    partnersImage.map(item => (
                        <Grid item  >
                            <Box width="fit-content" margin={2} position="relative" >
                                <Paper elevation={1}>
                                    <Box textAlign="center" padding={2} >
                                        {
                                            (partnersImage.length > 0) &&
                                            <Avatar style={{width:60, height:60}} src={item} />
                                        }
                                    </Box>
                                </Paper>
                                <Box position="absolute" 
                                    textAlign="center" 
                                    color="white" 
                                    borderRadius="0px 0px 0px 3px"
                                    style={{cursor:"pointer"}}
                                    fontWeight={700} height={20} width={20} bgcolor="red"  right={0} top={0} 
                                    onClick = {() => removeImage(item) }
                                >
                                    X
                                </Box>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
             <Container maxWidth="xs"  >
                <AlertDialog keepMounted={false} onClose={pushImageToList} text="Upload a business partner log" content={<CropTest aspectRatio={1}  croppedImageUrl={setImageUrl}  />} />
             </Container>
             <PositionedSnackbar position="Top-Left" text={"This template takes only three images"} open={openSnack} />
        </Container>
   )
}

