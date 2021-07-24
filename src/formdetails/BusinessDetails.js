import React, { useEffect, useContext, useState} from 'react'
import { DataContext } from './../App';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CropTest from '../components/CropImage';
import AlertDialog from '../components/AlertDialog';
import updateSateObject from '../Helpers/updateSateObject';
import usePdfRerender from '../Hooks/usePdfRerender';

/** This array contains all the data to be obtained the id is same as the the state where the values will be stored*/
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
    const [imageUrl, setImageUrl] = useState(null)  // This state stores the logo url
    const triggerPdfRerender = usePdfRerender()
    
    //Update the logoUrl state and trigger pdf rerender to show image
    useEffect(() => {
        updateSateObject(imageUrl, "logoUrl", setData)
        triggerPdfRerender();
    }, [imageUrl])
    
      return(
          <Container maxWidth="xs">
              <Box display="flex" flexDirection="column"  >
                  {
                      inputFields.map(item => 
                          <TextField onChange={(e) => updateSateObject(e.target.value, item.id, setData)}
                                     key={item.id}  variant="outlined"
                                     label={item.label}  value={data[item.id]}
                          />
                      )
                  }
                  <Box display="flex" marginTop={2} marginBottom={2}>
                      <AlertDialog text={data.logoUrl ?"Change Business Logo" : "Upload business Logo"} 
                                   content={<CropTest aspectRatio={1}  croppedImageUrl={setImageUrl} />} 
                      />
                  </Box>
              </Box>
           </Container>
      )
  }

  export default BusinessDetails;