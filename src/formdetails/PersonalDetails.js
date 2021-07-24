import React, { useEffect, useContext} from 'react'
import { DataContext } from './../App';
import { Box, Container, TextField } from '@material-ui/core';

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
    
    const updateDate = 
        (e, name) => {
            setData({...data, [name]:e.target.value})
        }
    
    useEffect(() => {
        console.log(data.personalName)
    })
      return(
          <Container maxWidth="xs">
              <Box display="flex" flexDirection="column"  >
                  {
                      inputFields.map(item => 
                          <TextField onChange={(e) => updateDate(e, item.id)} key={item.id}  label={item.label} variant="outlined" value={data[item.id]} />
                      )
                  }
              </Box>
           </Container>
      )
  }

  export default PersonalDetails;