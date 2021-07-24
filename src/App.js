import React, { useState } from 'react'
import {Box} from "@material-ui/core"
import ChooseTemplate from './Views/ChooseTemplate'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import { Suspense } from 'react'
import Preloader from './components/Preloader'


export  const DataContext = React.createContext()
const CreatePdf = React.lazy(() => import('./Views/CreatePdf'));

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
                                       partnersImage:[],
                                       triggerUpdate:false,
                                       documentUrl:null
                                     })
    return (
        <Box>
            <DataContext.Provider value={[data, setData]} >
             <Suspense fallback={<Preloader />}>
                 <Switch>
                    <Route exact path="/" component={ChooseTemplate} />
                    <Route exact path="/template1" component={CreatePdf} />
                 </Switch>
              </Suspense>  
            </DataContext.Provider>
            {/* <ChooseTemplate /> */}
        </Box>
    )
}
