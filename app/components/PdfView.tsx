'use client';

import "reactpdf/dist/page/AnnotationLayer.css";
import "reactpdf/dist/page/TextLayer.css";

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

// We need to configure cors
//go to https://console.cloud.google.com/
//click on Active Cloud Shell
//create a new file in editor called cors.json
//run gsutil cors set cors.json gs://chat-pdf-nextjs.appspot.com
//app-name is the name of the app in Firebase
//https://firebase.google.com/docs/storage/web/download-files#cors_configuration

interface Props {
    url: string
}

const PdfView = (props: Props) => {
    return (
        <div>PdfView</div>
    )
}

export default PdfView