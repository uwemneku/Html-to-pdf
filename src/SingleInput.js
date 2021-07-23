import React, { useEffect, useRef, useState } from 'react'
import { Button, TextField, Box, InputLabel, OutlinedInput, Typography, FormControl, InputAdornment, IconButton, Grid, Container, Paper } from '@material-ui/core';
import PositionedSnackbar from './PositionedSnackbar';

export default function SingleInput({sectionName}) {
    const [bulletPoints, setBulletPoints] = useState(["testing one date"]) 
    const [isInputEmpty, setIsInputEmpty ]= useState(false)
    const addItem = () => {
        const value = document.getElementById("newInput").value
        if(value.length > 2)
        {
            setBulletPoints([...bulletPoints, value])
            document.getElementById("newInput").value = ""
        }
        else{
            setIsInputEmpty(true)
            setTimeout(() => {
                setIsInputEmpty(false)
            }, 2000);
        }
    }
    const removeItem = (item) =>{
        setBulletPoints(prev => prev.filter(text => text !== item ))
    }
    return (
        <Container maxWidth="xs"  >
            {
                bulletPoints.map(item => (
                    <Container maxWidth="xs"  >
                        <Box margin={2} position="relative" >
                            <Paper elevation={1}>
                                <Box textAlign="center" padding={2} >
                                    <Typography>{item}</Typography>
                                </Box>
                            </Paper>
                            <Box position="absolute" 
                                 textAlign="center" 
                                 color="white" 
                                 borderRadius="0px 0px 0px 3px"
                                 style={{cursor:"pointer"}}
                                 fontWeight={700} height={20} width={20} bgcolor="red"  right={0} top={0} 
                                 onClick = {() => removeItem(item) }
                            >
                                X
                            </Box>
                        </Box>
                    </Container>
                ))
            }
             <Container maxWidth="xs"  >
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="newInput"
                        type="text"
                        endAdornment={
                        <InputAdornment position="end">
                            <Button disabled={isInputEmpty} onClick={addItem} >Add</Button>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
             </Container>
             <PositionedSnackbar position="Top-Left" text="Cannot Insert Empty Text" open={isInputEmpty} />
        </Container>
   )
}
