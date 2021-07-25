import React, { useEffect, useContext} from 'react'
import { DataContext } from './../App';
import { Box, Container, TextField, Typography } from '@material-ui/core';
import useGlobalStyles from '../GlobalStyles';



const inputFields = [
                        {
                            id: "personalName",
                            label: "Your Name"
                        },
                        {
                            id:"personalEmail",
                            label: "Your Email"
                        },
                        {
                            id:"personalMobile",
                            label:"Your Mobile"
                        },
                        {
                            id:"personalAddress",
                            label:"Your Address"
                        }
                     ]

const PersonalDetails = () => {
    const [data, setData] = useContext(DataContext)
    const global = useGlobalStyles()
    
    const updateDate = 
        (e, name) => {
            setData({...data, [name]:e.target.value})
        }
    
    useEffect(() => {
        console.log(data.personalName)
    })
      return(
          <Container maxWidth="xs">
              <Box display="flex" flexDirection="column" marginTop="40px"  >
                   <Typography variant="h6" >
                      <Box fontWeight="bold" marginBottom="20px" >
                              Personal Details
                      </Box>
                    </Typography>
                  {
                      inputFields.map(item => 
                          <TextField onChange={(e) => updateDate(e, item.id)} key={item.id}  label={item.label} 
                                    variant="outlined" value={data[item.id]} size="small"
                                    style={{marginBottom:"15px"}}
                                     InputLabelProps={{
                                         classes:{
                                             root: global.placeholder
                                         }
                                     }}
                          />
                      )
                  }
              </Box>
           </Container>
      )
  }

  export default PersonalDetails;