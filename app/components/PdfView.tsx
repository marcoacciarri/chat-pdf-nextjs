'use client';

import "reactpdf/dist/page/AnnotationLayer.css";
import "reactpdf/dist/page/TextLayer.css";

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { RotateLeft, RotateRight } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress';;

// We need to configure cors
//go to https://console.cloud.google.com/
//click on Active Cloud Shell
//create a new file in editor called cors.json
//run gsutil cors set cors.json gs://chat-pdf-nextjs.appspot.com
//app-name is the name of the app in Firebase
//https://firebase.google.com/docs/storage/web/download-files#cors_configuration

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
    url: string
}

const PdfView = (props: Props) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [url, setUrl] = useState(props.url);
    const [file, setFile] = useState<Blob | null>(null);
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => setFile(blob))
    }, [url]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    };

    return (
        <div>
            {!file && <CircularProgress />}
            {file && (
                <Document
                    loading="Loading PDF..."
                    file={file}
                    rotate={rotation}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="m4 overflow-scroll "
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        className="shadow-lg"
                    />
                </Document>
            )}
        </div>
    )
}

export default PdfView