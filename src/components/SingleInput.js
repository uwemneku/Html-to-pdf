import React, { useState } from 'react'
import { Button, Box, InputLabel, OutlinedInput, Typography, FormControl, InputAdornment, Grid, Container, Paper } from '@material-ui/core';
import PositionedSnackbar from './PositionedSnackbar';
import useGlobalStyles from '../GlobalStyles';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    placeholder:{
        fontSize: theme.typography.body2.fontSize
    },
    root:{
        '& label':{
            fontSize:"14px"
            
        }
    }
}))
export default function SingleInput({data, updateData, removeData, name}) {
    const [errorMessage, setErrorMessage] = useState("")
    const global = useGlobalStyles()
    const g = useStyles()

    // const [bulletPoints, setBulletPoints] = useState(["testing one date"]) 
    const [isInputEmpty, setIsInputEmpty ]= useState(false)
    const addItem = () => {
        const value = document.getElementById(name).value
        if(data.includes(value)){
            showAlert("You've added this to the list")
        }
        else if(value.length > 2)
        {  updateData(value)
            document.getElementById(name).value = ""
        }
        else{
            showAlert("Cannot Insert Empty Text")
        }
    }
    const removeItem = (item) =>{
        removeData(item)
    }
    const showAlert = (message) =>{
        setErrorMessage(message)
        setIsInputEmpty(true)
            setTimeout(() => {
                setIsInputEmpty(false)
            }, 2000);

    }
    return (
        <Container  maxWidth="xs" disableGutters={true} >
            <Grid container >
                {
                    data.map(item => (
                        <Grid item xs >
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
                        </Grid>
                    ))
                }
            </Grid>
                <FormControl variant="outlined" className={g.root} >
                    <InputLabel htmlFor="outlined-adornment-password">{name.toUpperCase()}</InputLabel>
                    <OutlinedInput
                        id={name}
                        multiline
                        minRows={2}
                        type="text"
                        fullWidth={true}
                        endAdornment={
                        <InputAdornment position="end">
                            <Button disabled={isInputEmpty} onClick={addItem} >Add</Button>
                        </InputAdornment>
                        }
                        labelWidth={70}
                        style={{marginBottom:"15px"}}
                    />
                </FormControl>
             <PositionedSnackbar position="Top-Left" text={errorMessage} open={isInputEmpty} />
        </Container>
   )
}
