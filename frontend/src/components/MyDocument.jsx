import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useState } from 'react';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  doc: {
    margin: '0 auto',
    width: '80% !important',
    height: '100% !important',
  },
  text: {
    color: 'red',
  }

});

const MyDocument = ({file}) => {
  const [numPages, setNumPages] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
    return (
        <>
            {/* {file && 
                <Document  onLoadSuccess = {onDocumentLoadSuccess} pageLayout='singlePage'>
                    <Page  pageNumber={pageNumber} style={styles.page}>
                    <View style={styles.section}>
                        <Text>Section #1</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
                    </Page>
                </Document>
            }
            {file && 
                <p>Page {pageNumber} of {numPages}</p>
            }  */}
            <Document  onLoadSuccess = {onDocumentLoadSuccess} pageLayout='singlePage'>
                <Page  pageNumber={pageNumber} style={styles.page}>
                  <View style={styles.section}>
                      <Text style={styles.text}>Section #1</Text>
                  </View>
                  <View style={styles.section}>
                      <Text>Section #2</Text>
                  </View>
                </Page>
            </Document>
        </>
    )
}

export default MyDocument;