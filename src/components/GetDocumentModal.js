import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PdfMaker from '../react-pdf/PdfMaker';
import { usePDF } from '@react-pdf/renderer';
import usePdfRerender from '../Hooks/usePdfRerender';
import { DataContext } from '../App';
import print from "print-js"
import { Button, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

    '& a':{
      textDecoration:"none",
      color:"white"
    }
  },
}));

export default function GetDocumentModal({open, action, close}) {
  const classes = useStyles();
  const [data, setData] = useContext(DataContext)
  const {triggerUpdate} = data
  const Doc = < PdfMaker data={data} /> 
  const [instance, updateInstance] = usePDF({ document: Doc });

  useEffect(updateInstance, [triggerUpdate])
  

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        keepMounted={false}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Hidden smDown>
              <Button variant="outlined" size="large" style={{margin:"10px"}} id='print' onClick={()=>print(instance.url)} >
                { instance.loading ? 'Loading document...' : 'Print now!' }
              </Button>
            </Hidden>
            <Button variant="contained" color="primary" size="large" style={{margin:"10px"}} >
              <a download href={instance.url}> { instance.loading ? 'Loading document...' : 'Download Document!' } </a>
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
