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
    paddingHorizontal:40,
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
                      <View style={{maxWidth:150, maxHeight:100, flexDirection:"row", alignItems:"center" }} >
                          <Image source={data.logoUrl} style={{width: "100%",  objectFit:"cover"}} />
                      </View>
        }
        <View style={{flex: 1, flexDirection:"column", justifyContent:"center", alignItems:"center"}} >
          <Text style={{fontSize:12, fontFamily:"Regular"}}>{data.businessName}</Text>
          <Text style={{fontSize:30, fontFamily: 'Heavy'}} >Capability Statement</Text>
          <View style={{flexDirection:"row"}} >
              <View style={{flexDirection:"row"}} >
                <Text style={{fontSize:12, fontFamily:"Heavy", paddingHorizontal:5}}>CAGE:</Text>
                <Text style={{fontSize:12, fontFamily:"Medium", }}>{ data.cage}</Text>
              </View>
              <View style={{flexDirection:"row"}} >
                <Text style={{fontSize:12, fontFamily:"Heavy", paddingHorizontal:5}}>DUNS:</Text>
                <Text style={{fontSize:12, fontFamily:"Medium"}}>{ data.duns}</Text>
              </View>
              {/* <Text style={{fontSize:12, fontFamily:"Heavy", paddingHorizontal:5}}>CAGE: { data.cage}</Text> */}
              {/* <Text style={{fontSize:12, fontFamily:"Heavy", paddingHorizontal:5}}>DUNS: { data.duns}</Text> */}
          </View>
        </View>
      </View>

      <View  >
          <SectionHeading data={data} text="ABOUT US" />
          <View style={{minHeight:"10vh", paddingVertical:10, marginBottom:10}}>
            <Text style={{fontSize:14, fontFamily:"Regular"}} >
              {data.aboutUs}
            </Text>
          </View>
      </View>

      <View style={{flexDirection:"row" , minHeight:"25vh", }} >

        <View style={{flex:1, marginRight:10 }}>
          <SectionHeading data={data} text="CORE COMPETENCIES" />
          <View style={{paddingVertical:10}} >
            {
                data.competencies.map(item => <BulletPoint key={item} full text={item} /> )
            }
          </View>
        </View  >
        <View style={{flex:1}}>
          <SectionHeading data={data} text="DIFFERENTIATORS" />
          <View style={{paddingVertical:10}}  >
            {
                data.differentiators.map(item => <BulletPoint key={item} full text={item} /> )
            }
          </View>
        </View>

      </View>
     
     
      <View style={{flexDirection:"row"}} >
       <View style={{flexDirection:"column", flex:1, marginRight:10 }}>
          <View style={{minHeight:"25vh"}}>
            <SectionHeading data={data} text="POINT OF CONTACT" />
            <View style={{padding:5, paddingLeft:8}} >
              <Text style={{marginVertical:4, fontSize:14}}>{data.personalName}</Text>
              <Text style={{marginVertical:4, fontSize:14}}>{data.personalAddress}</Text>
              <Text style={{marginVertical:4, fontSize:14}}>{data.personalMobile}</Text>
              <Text style={{marginVertical:4, fontSize:14}}>{data.personalEmail}</Text>
           </View>
          </View>
          <View style={{}}>
            <SectionHeading data={data} text="PAST PERFORMANCE" />
              {
                (data.partnersImage.length > 0) &&
                    <View style={{flexDirection:"row", justifyContent:"flex-start", marginTop:5}} >
                      {
                        data.partnersImage.map(image => (
                          <View style={{width:80, marginHorizontal:5, maxHeight:80, borderRadius:500, overflow:"hidden", flexDirection:"row", alignItems:"center" }} >
                              <Image source={image} style={{width: "100%",  objectFit:"cover"}} />
                          </View>
                        ))
                      }
                    </View>
            }
          </View>
       </View>

        <View style={{flex:1}}>
          <SectionHeading data={data} text="CORPORATE DATA" />
          <View style={{padding:5, paddingLeft:8}} >
            <Text style={{marginVertical:4, fontFamily:"Regular",  fontSize:14}}>{data.businessAddress}</Text>
            <Text style={{marginVertical:4, fontFamily:"Regular",  fontSize:14}}>{data.businessMobile}</Text>
            <Text style={{marginVertical:4, fontFamily:"Regular",  fontSize:14}}>{data.businessEmail}</Text>
            <View style={{height:20}} />
            <View style={{flexDirection:"row"}} >
              <Text style={{fontSize:14, fontFamily:"Heavy", paddingHorizontal:5}}>CAGE:</Text>
              <Text style={{fontSize:14, fontFamily:"Regular", paddingHorizontal:5}}>{ data.cage}</Text>
            </View>
            <View style={{flexDirection:"row"}} >
              <Text style={{fontSize:14, fontFamily:"Heavy", paddingHorizontal:5}}>DUNS:</Text>
              <Text style={{fontSize:14, fontFamily:"Regular", paddingHorizontal:5}}>{ data.duns}</Text>
            </View>
            <View style={{height:20}} />
            <Text style={{fontSize:14, fontFamily:"Heavy", paddingHorizontal:5}}>NAICS Codes</Text>
            {
              data.naics.map(item => <Text style={{fontSize:14, fontFamily:"Regular", paddingHorizontal:5}}>{item}</Text>)
            }
          </View>
        </View>

      </View>

      
    </Page>
  </Document>
);


const BulletPoint = ({full, text}) => (
  <View style={{marginLeft:8, flexDirection:"row", width:full?"100%":"50%", alignItems:"flex-start", paddingVertical:3}} >
      <View style={{width: 5, height: 5, marginTop:5, borderRadius:100, backgroundColor:"black"}} />
      <Text style={{fontSize:14, fontFamily:"Regular", marginLeft:8}} >{text} </Text>
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

const SectionHeading = ({text, data}) => {
  return(
    <View style={{flexDirection:"row", borderBottom:`2pt solid ${data.themeColor || "#070707"}`}} >
        <Text style={{backgroundColor: data.themeColor || "#070707", padding:4, fontFamily:"Medium", fontSize:18, color:"white"}} >{text}</Text>
    </View>
  )
}

export default MyDocument;