import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 20,
    flexGrow: 1,
    fontSize: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center', 
    fontWeight: 'bold',
  },
  label: {
    marginRight: 10,
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'justify',
  },
  value: {
    fontSize: 16,
    textAlign: 'justify',
  },
  container: {
    border: 1,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
  },
});

const generatePdfDocument = (event) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Event Details</Text>
        <View style={styles.container}>
          <Text>
            <Text style={styles.label}>Event Name : </Text> 
            <Text style={styles.value}>{event.eventName}</Text>
          </Text>
          <Text>{"\n"} {/* Line breaks after Event Name */}</Text>
          <Text>
            <Text style={styles.label}>Description : </Text>
            <Text style={styles.value}>{event.description}</Text>
          </Text>
          <Text>{"\n"} {/* Line breaks after Description */}</Text>
          <Text>
            <Text style={styles.label}>Location : </Text>
            <Text style={styles.value}>{event.location}</Text>
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);


export default generatePdfDocument;
