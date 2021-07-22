import React from 'react'
import {Container, Grid, Modal} from "@material-ui/core"
import AlertDialog from './AlertDialog'
import ChooseTemplate from './ChooseTemplate'
import BusinessData from './BusinessData';
import './App.css'

export default function App() {
    return (
        <Container>
            <BusinessData />
            <ChooseTemplate />
        </Container>
    )
}
