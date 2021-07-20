import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
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
      <View style={styles.header}>
        
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #5hh</Text>
        <Text>{text}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;