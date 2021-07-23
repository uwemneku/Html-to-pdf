import React, { useState } from 'react'
import {Box, Container, Grid, Modal} from "@material-ui/core"
import AlertDialog from './AlertDialog'
import ChooseTemplate from './ChooseTemplate'
import BusinessData from './BusinessData';
import './App.css'


export  const DataContext = React.createContext()

export default function App() {
    // const [logoUrl, setLogoUrl] = useState(null)
    const [data, setData] = useState({ businessName: "",
                                       businessEmail: "",
                                       businessMobile: "",
                                       businessAddress: "",
                                       logoUrl:null,
                                       personalName: "",
                                       personalEmail: "",
                                       personalMobile: "",
                                       personalAddress: "",
                                       aboutUs:"",
                                       triggerUpdate:false
                                     })
    return (
        <Container>
            <DataContext.Provider value={[data, setData]} >
                 <BusinessData />
            </DataContext.Provider>
            {/* <ChooseTemplate /> */}
        </Container>
    )
}
