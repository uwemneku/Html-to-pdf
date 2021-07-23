import React, { useState } from 'react'
import {Box, Container, Grid, Modal} from "@material-ui/core"
import AlertDialog from './AlertDialog'
import ChooseTemplate from './ChooseTemplate'
// import BusinessData from './BusinessData';
import './App.css'
import {Route, Switch} from 'react-router-dom'
import { Suspense } from 'react'
import Preloader from './Preloader'


export  const DataContext = React.createContext()
const BusinessData = React.lazy(() => import('./BusinessData'));

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
                                       themeColor: "black",
                                       cage:"",
                                       duns:"",
                                       naics:[],
                                       competencies:[],
                                       differentiators:[],
                                       customers:[],
                                       triggerUpdate:false,
                                       documentUrl:null
                                     })
    return (
        <Box>
            <DataContext.Provider value={[data, setData]} >
             <Suspense fallback={<Preloader />}>
                 <Switch>
                    <Route exact path="/" component={ChooseTemplate} />
                    <Route exact path="/template1" component={BusinessData} />
                 </Switch>
              </Suspense>  
            </DataContext.Provider>
            {/* <ChooseTemplate /> */}
        </Box>
    )
}
