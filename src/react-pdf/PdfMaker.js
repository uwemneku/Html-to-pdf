import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet, Font } from '@react-pdf/renderer';
import faker from 'faker'
import testLogo from '../log.jpg'
import roboto from '../font/Roboto-Black.ttf'
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    border: "2px solid black",
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
  family: 'Oswald',
  src: roboto
});


// Create Document Component
const about = faker.lorem.sentences(4);
const MyDocument = ({text, aboutUs, img}) => (
    
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{flexDirection:"row"}} >
        {
          testLogo &&
                      <View style={{maxWidth:100}} >
                          <Image source={testLogo} style={{width: "100%", height: "100%", objectFit:"cover"}} />
                      </View>
        }
        <View style={{flex: 1, flexDirection:"column", justifyContent:"center", alignItems:"center"}} >
          <Text style={{fontSize:12}}>Name Of Business</Text>
          <Text style={{fontSize:30, fontFamily: 'Oswald'}} >Capability Statement</Text>
          <View style={{flexDirection:"row"}} >
              <Text style={{fontSize:12}}>Cage</Text>
              <Text style={{fontSize:12, }}>Cage</Text>
          </View>
        </View>
      </View>

      <View>
          <SectionHeading text="About Us" />
      </View>

      <View style={{flexDirection:"row"}} >

        <View style={{flex:1}}>
          <SectionHeading text="About Us" />
        </View>
        <View style={{flex:1}}>
          <SectionHeading text="About Us" />
        </View>

      </View>
     
     
      <View style={{flexDirection:"row"}} >
       <View style={{flexDirection:"column", flex:1}}>
          <View style={{}}>
            <SectionHeading text="About Us" />
          </View>
          <View style={{}}>
            <SectionHeading text="About Us" />
          </View>
       </View>

        <View style={{flex:1}}>
          <SectionHeading text="About Us" />
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
    <View style={{flexDirection:"row", borderBottom:"2pt solid red"}} >
        <Text style={{backgroundColor:"red", padding:2}} >{Text}</Text>
    </View>
  )
}

export default MyDocument;