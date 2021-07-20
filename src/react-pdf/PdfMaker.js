import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'orange'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header:{
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: 'blue',
    height: "20px"
  }
});


// Create Document Component
const MyDocument = ({text}) => (
    
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header starts here */}
      <View>
        <View>
          <Text> Capability Statement </Text>
        </View>
        <View>
            <Text>
              Address:
            </Text>
            <Text>
              Phone:
            </Text>
            <Text>
              E-mail:
            </Text>
        </View>
      </View>
      {/* Header ends here */}

      <View>
        <Text>Core Competencies</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;