import React, {useContext} from "react"
import { Box, Container, TextField } from "@material-ui/core"
import { DataContext } from "../App"
import updateSateObject from '../Helpers/updateSateObject';

/**Renders the About us section and updates the about us state. Note this does not trigger the documemt update*/
const AboutUs = () => {
    const [data, setData] = useContext(DataContext)
    
    return(
        <Container maxWidth="sm">
                        <Box display="flex" flexDirection="column"  >
                            <TextField label="About" 
                                       variant="outlined" 
                                       value={data.aboutUs} 
                                       multiline minRows={3} 
                                       onChange={(e)=>updateSateObject(e.target.value, "aboutUs", setData)} 
                            />
                        </Box>
        </Container>
    )
}

export default AboutUs;