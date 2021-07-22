import React, { useEffect, useState } from 'react';
import { pdf, PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import Quixote from './PdfMaker'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import print from "print-js"
import './App.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CropTest from '../CropTest';


// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';


const App = () => {
  const [texx, settexx] = useState("")
  const [imagePage, setImagePage] = useState(null)
  const Doc = < Quixote aboutUs={texx} img={imagePage} /> 
  const [instance, updateInstance] = usePDF({ document: Doc });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleIput = (e) => {
    settexx(e.target.value)
  }
  
 
  useEffect(updateInstance, [texx, imagePage]);

  return( 
     
     <div className="flex"  >
    
          <div className="flex-1" >
            <Document
              className="w-1/2"
              file={instance.url}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </div>

          <div className="flex-1" >
              <PDFDownloadLink document={Doc } fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download now!'
                }
              </PDFDownloadLink>
              <div>
                <input type="text" className="ring-2" onChange={handleIput} />
                <button onClick={async() =>{
                  const blob = await pdf(Doc ).toBlob();
                  print(URL.createObjectURL(blob));
                }}>
                  {
                    instance.loading ? 'Loading document...' : 'Print now!'
                  }
                </button>
              </div>
              <CropTest croppedImageUrl={setImagePage} />
          </div>
       </div>
  )
  };




export default App 