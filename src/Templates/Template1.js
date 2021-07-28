import { Avatar, Box, Container, Grid, Paper } from '@material-ui/core'
import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import { DataContext } from './../App';
import { makeStyles } from "@material-ui/core";




const useStyles = makeStyles(theme => ({
    
    root:{
        maxWidth: theme.breakpoints.values.sm,
        [theme.breakpoints.down("sm")]:{
            maxWidth: theme.breakpoints.values.md
        },
        '& p':{
            wordBreak: "break-word",
        }
    },
    mainHeader:{
        [theme.breakpoints.down("sm")]:{
            fontSize: "10px"
        }
    },
    header:{
        [theme.breakpoints.down("sm")]:{
            fontSize: "8px"
        }
    },
    documentText:{
        [theme.breakpoints.down("sm")]:{
            fontSize: "8px"
        }

    }
}))

export default function Template1() {
    const [data, setData] = useContext(DataContext)
    const classes = useStyles()
    return (
        <Container  className={classes.root}  >
            <Paper style={{padding:"20px", minHeight:"90vh"}} >
                <Box paddingTop="10px" marginBottom="20px" maxHeight="80px" overflow="hidden" >
                    <Grid container wrap="nowrap" direction="row" justifyContent="center" alignItems="center"  >
                        {
                            data.logoUrl &&
                            <Grid item>
                                <Box maxWidth="100px" maxHeight="100px" overflow="hidden" >
                                    <img src={data.logoUrl} alt="kjlkj" width="100%" />
                                </Box>
                            </Grid>
                        }
                        <Grid item xs container wrap="nowrap" direction="column" justifyContent="center" alignItems="center"  style={{lineHeight:"4px"}} >
                            <Grid item>
                                <DocumentText  >{data.businessName}</DocumentText>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.mainHeader} variant="h5" >
                                    <Box lineHeight="20px" fontWeight="bold" >
                                        Capability Statement
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Box display="inline-block" paddingRight="10px" >
                                    <Typography variant="caption" className={classes.documentText} style={{display:"inline-block", fontWeight:"bold", paddingRight:"3px"}}>CAGE:</Typography>
                                    <Typography variant="caption" className={classes.documentText} style={{display:"inline-block"}}>{data.cage}</Typography>  
                                </Box>
                                <Box display="inline-block">
                                    <Typography variant="caption" className={classes.documentText} style={{display:"inline-block", fontWeight:"bold", paddingRight:"3px"}}>DUNS:</Typography>
                                    <Typography variant="caption" className={classes.documentText} style={{display:"inline-block"}}>{data.duns}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                {
                    data.aboutUs &&
                    <Box width="100%" paddingBottom="10px" minHeight="150px" >
                        <SectionHeading text="ABOUT US" />
                        <Box paddingTop="10px" paddingBottom="20px" >
                            <DocumentText>
                                {data.aboutUs}
                            </DocumentText>
                        </Box>
                    </Box>
                }
                
                <Box  >
                    <Grid container wrap="nowrap" spacing={2}  >
                        {
                            (data.competencies.length > 0) &&   
                            <Grid item xs >
                                <SectionHeading text="CORE COMPETENCIES" />
                                <Box minHeight="150px" marginTop={2} marginBottom={2}   >
                                    {
                                        data.competencies.map(item => <BulletPoint key={item} full text= {item} /> )
                                    }
                                </Box>
                            </Grid>
                        }
                        {
                            (data.differentiators.length > 0) &&   
                            <Grid item xs >
                                <SectionHeading text="DIFFERENTIATORS" />
                                <Box minHeight="150px" marginTop={2} marginBottom={2}    >
                                    {
                                        data.differentiators.map(item => <BulletPoint key={item}  full text= {item} /> )
                                    }
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </Box>
                
                <Box minHeight="250px" >
                    <Grid container wrap="nowrap" spacing={2}  >
                        {
                            (data.personalName || data.personalEmail || data.personalAddress) &&
                            <Grid item xs container wrap="nowrap" direction="column" style={{minHeight:"200px"}} >
                                    <Grid item xs>
                                        <SectionHeading text="POINT OF CONTACT" />
                                        <Box marginTop={2} marginBottom={2}  >
                                            <DocumentText >{data.personalName}</DocumentText>
                                            <DocumentText >{data.personalAddress}</DocumentText>
                                            <DocumentText >{data.personalMobile}</DocumentText>
                                            <DocumentText >{data.personalEmail}</DocumentText>
                                        </Box>
                                    </Grid>
                                {
                                (data.partnersImage.length > 0) &&   
                                <Grid item xs >
                                    <SectionHeading text="PAST PERFORMANCE" />
                                    <Box display="flex" minHeight="150px" marginTop={2} marginBottom={2}   >
                                        {
                                            data.partnersImage.map(image => <Avatar key={image}  style={{height:60, width:60, margin:5}} src={image}  /> )
                                        }
                                    </Box>
                                </Grid>
                            }
                            </Grid>
                            
                        }
                        {
                            (data.businessEmail || data.businessMobile || data.businessAddress) &&
                            <Grid item xs >
                                <SectionHeading text="COPERATE DATA" />
                                <Box marginTop={2} marginBottom={2}   >
                                    <DocumentText >{data.businessAddress}</DocumentText>
                                    <DocumentText >{data.businessMobile}</DocumentText>
                                    <DocumentText >{data.businessEmail}</DocumentText>
                                </Box>
                                <Box />
                                <Box display="flex" >
                                    <DocumentText ><Box style={{display:"inline-block", fontWeight:"bold", paddingRight:"3px"}}>DUNS:</Box></DocumentText>
                                    <DocumentText style={{display:"inline-block"}}>{data.duns}</DocumentText>
                                </Box>
                                <Box display="flex" >
                                    <DocumentText ><Box style={{display:"inline-block", fontWeight:"bold", paddingRight:"3px"}}>CAGE:</Box></DocumentText>
                                    <DocumentText style={{display:"inline-block"}}><Box></Box> {data.cage}</DocumentText>
                                </Box>
                                <Box marginTop="20px" >
                                    <DocumentText style={{display:"inline-block", fontWeight:"bold", paddingRight:"3px"}}>NAICS codes:</DocumentText>
                                    {
                                        data.naics.map(code => <DocumentText>{code}</DocumentText>)
                                    }
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

const SectionHeading = ({text}) => {
    const [data, setData] = useContext(DataContext)
    const classes = useStyles()
    return(
        <Box borderBottom="2px solid" borderColor={data.themeColor} >
            <Typography variant="body2" className={classes.header} >
                <Box fontWeight="bold" padding="2px" display="inline-block" bgcolor={data.themeColor} color="white" >
                    {text}
                </Box>
            </Typography>
        </Box>
    )
}

const BulletPoint = ({full, text}) => (
    <Box style={{marginLeft:8, display:"flex", flexDirection:"row", width:full?"100%":"50%", alignItems:"flex-start", paddingVertical:3}} >
        <Box style={{width: 5, height: 5, marginTop:5, borderRadius:100, backgroundColor:"black"}} />
        <DocumentText > <Box marginLeft={1} >{text}</Box>  </DocumentText>
    </Box>
)

const DocumentText = ({children}) => {
    const classes = useStyles()
    return (
        <Typography display="block" component="p" className={classes.documentText} variant="caption"   >
            {children}
        </Typography>
    )
}


