import React, {useContext} from "react"
import { Box, Container, TextField } from "@material-ui/core"
import { DataContext } from "../App"

const AboutUs = () => {
    const [data, setData] = useContext(DataContext)
    
    const updateDate = 
        (e, name) => {
            setData({...data, [name]:e.target.value})
        }
    return(
        <Container maxWidth="sm">
                        <Box display="flex" flexDirection="column"  >
                            <TextField label="About" variant="outlined" value={data.aboutUs} multiline minRows={3} onChange={(e)=>updateDate(e, "aboutUs")} />
                        </Box>
        </Container>
    )
}

export default AboutUs;