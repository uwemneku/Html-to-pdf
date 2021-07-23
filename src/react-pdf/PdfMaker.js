import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet, Font } from '@react-pdf/renderer';
import faker from 'faker'
import testLogo from '../log.jpg'
import robotoBlack from '../font/Roboto-Black.ttf'
import robotoLight from '../font/Roboto-Light.ttf'
import robotoMedium from '../font/Roboto-Medium.ttf'
import robotoRegular from '../font/Roboto-Regular.ttf'
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    // border: "2px solid rgba(0, 0, 0, 0.233)",
    padding:20,
    width: '100vw',
  },
  section: {
    padding: 10,
    flexGrow: 1
  },
  heading:{
    backgroundColor:"blue",
    color:"white",
    paddingVertical: 10
  },
  header:{
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: 'blue',
    height: "20px"
  }
});

Font.register({
  family: 'Heavy',
  src: robotoBlack
});
Font.register({
  family: 'Regular',
  src: robotoRegular
});
Font.register({
  family: 'Light',
  src: robotoLight
});
Font.register({
  family: 'Medium',
  src: robotoMedium
});


// Create Document Component
const about = faker.lorem.sentences(4);
const MyDocument = ({data}) => (
    
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{flexDirection:"row", marginVertical:5, overflow:"hidden", minHeight:"10vh",}} >
        {
          data.logoUrl &&
                      <View style={{maxWidth:150, flexDirection:"row", alignItems:"center" }} >
                          <Image source={data.logoUrl} style={{width: "100%",  objectFit:"cover"}} />
                      </View>
        }
        <View style={{flex: 1, flexDirection:"column", justifyContent:"center", alignItems:"center"}} >
          <Text style={{fontSize:12, fontFamily:"Regular"}}>{data.businessName}</Text>
          <Text style={{fontSize:30, fontFamily: 'Heavy'}} >Capability Statement</Text>
          <View style={{flexDirection:"row"}} >
              <Text style={{fontSize:12, fontFamily:"Medium", paddingHorizontal:5}}>CAGE</Text>
              <Text style={{fontSize:12, fontFamily:"Medium", paddingHorizontal:5}}>DUNS</Text>
          </View>
        </View>
      </View>

      <View  >
          <SectionHeading text="ABOUT US" />
          <View style={{minHeight:"10vh"}}>

          </View>
      </View>

      <View style={{flexDirection:"row" , minHeight:"30vh", }} >

        <View style={{flex:1, marginRight:10 }}>
          <SectionHeading text="CORE COMPETENCIES" />
        </View>
        <View style={{flex:1}}>
          <SectionHeading text="DIFFERENTIATORS" />
        </View>

      </View>
     
     
      <View style={{flexDirection:"row"}} >
       <View style={{flexDirection:"column", flex:1, marginRight:10 }}>
          <View style={{minHeight:"20vh"}}>
            <SectionHeading text="POINT OF CONTACT" />
            <View style={{padding:5}} >
              <Text style={{marginVertical:6, fontSize:16}}>{data.personalAddress}</Text>
              <Text style={{marginVertical:6, fontSize:16}}>{data.personalMobile}</Text>
              <Text style={{marginVertical:6, fontSize:16}}>{data.personalEmail}</Text>
           </View>
          </View>
          <View style={{}}>
            <SectionHeading text="PAST PERFORMANCE" />
          </View>
       </View>

        <View style={{flex:1}}>
          <SectionHeading text="CORPORATE DATA" />
          <View style={{padding:5}} >
            <Text style={{marginVertical:6, fontSize:16}}>{data.businessAddress}</Text>
            <Text style={{marginVertical:6, fontSize:16}}>{data.businessMobile}</Text>
            <Text style={{marginVertical:6, fontSize:16}}>{data.businessEmail}</Text>
          </View>
        </View>

      </View>

      
    </Page>
  </Document>
);


const BulletPoint = ({full}) => (
  <View style={{flexDirection:"row", width:full?"100%":"50%", alignItems:"flex-start", paddingVertical:3}} >
      <View style={{width: 5, height: 5, marginTop:5, borderRadius:100, backgroundColor:"black"}} />
      <Text style={{paddingHorizontal:10, fontSize:14, textAnchor:"start"}} >T Test DocumnetT Test DocumnetT </Text>
  </View>
)

/**
 * 
 * @param {Object} props
 * @param {Array} props.data 
 * @param {Array} props.full 
 * @returns 
 */
const BulletPointGroup = ({data, full}) => (
  <View style={{flexDirection:"row", justifyContent:"flex-start", flexWrap:"wrap"}} >
    {
      data.map(text => (
        <BulletPoint full={full} />
      ))
    }
    </View>
  // </View>
)

const SectionHeading = ({text}) => {
  return(
    <View style={{flexDirection:"row", borderBottom:"2pt solid #070707"}} >
        <Text style={{backgroundColor:"#070707", padding:2, fontFamily:"Medium", fontSize:18, color:"white"}} >{text}</Text>
    </View>
  )
}

export default MyDocument;