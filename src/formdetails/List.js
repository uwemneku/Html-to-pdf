import { Box, Container } from '@material-ui/core'
import React, { useContext } from 'react'
import { DataContext } from '../App'
import SingleInput from '../components/SingleInput'

export default function List({sectionName, sectionData}) {
    const [data, setData] = useContext(DataContext);
    const updateData = (newData) => {
        setData({...data, [sectionName]:[...sectionData, newData] })
    }
    
    const removeData = (dataToBeRemoved) => {
        setData({...data, [sectionName]:[...sectionData.filter(item => item !== dataToBeRemoved)] })
    }

    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column"  >
                <SingleInput name={sectionName} key={sectionName} data={sectionData} updateData={updateData} removeData={removeData} />
            </Box>
        </Container>
    )
}
