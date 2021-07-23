import React, {useCallback, useEffect, useContext} from 'react'
import { DataContext } from './../App';
import { Box, Container, TextField } from '@material-ui/core';
import CropTest from '../CropTest';
import AlertDialog from '../AlertDialog';

const inputFields = [
                        {
                            id: "businessName",
                            label: "Business Name"
                        },
                        {
                            id:"businessEmail",
                            label: "Business Email"
                        },
                        {
                            id:"businessMobile",
                            label:"Business Mobile"
                        },
                        {
                            id:"businessAddress",
                            label:"Business Address"
                        },
                        {
                            id:"cage",
                            label:"CAGE"
                        },
                        {
                            id:"duns",
                            label:"DUNS"
                        }
                     ]

const BusinessDetails = () => {
    const [data, setData] = useContext(DataContext)
    
    const updateDate = 
        (e, name) => {
            setData({...data, [name]:e.target.value})
        }
    
    useEffect(() => {
        console.log(data.businessName)
    })
      return(
          <Container maxWidth="xs">
              <Box display="flex" flexDirection="column"  >
                  {
                      inputFields.map(item => 
                          <TextField onChange={(e) => updateDate(e, item.id)} key={item.id}  label={item.label} variant="outlined" value={data[item.id]} />
                      )
                  }
                  <Box display="flex" marginTop={2} marginBottom={2}>
                      <AlertDialog text={data.logoUrl ?"Change Business Logo" : "Upload business Logo"} content={<CropTest croppedImageUrl={setData} />} />
                  </Box>
              </Box>
           </Container>
      )
  }

  export default BusinessDetails;