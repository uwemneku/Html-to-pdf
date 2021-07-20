import React, { useEffect, useState } from 'react';
import { pdf, PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import Quixote from './react-pdf/PdfMaker'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import print from "print-js"


// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';


const App = () => {
  const [texx, settexx] = useState("")
  const [instance, updateInstance] = usePDF({ document: < Quixote text={texx} /> });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleIput = (e) => {
    settexx(e.target.value)
  }
  useEffect(() => {
    // updateInstance()
    console.log(instance)
  })
  useEffect(updateInstance, [texx]);

  return(  <div className="flex"  >
    
    <div>
      <Document
        file={instance.url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>

    <div>
    <PDFDownloadLink document={< Quixote text={texx} /> } fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  </div>
  <div>
    <input type="text" className="ring-2" onChange={handleIput} />
    <button onClick={async() =>{
      const blob = await pdf(<Quixote />).toBlob();
      print(URL.createObjectURL(blob));
    }}>
      {
        instance.loading ? 'Loading document...' : 'Print now!'
      }
    </button>
  </div>
  </div>)
  };

export default App 