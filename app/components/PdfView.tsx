'use client';

import "reactpdf/dist/page/AnnotationLayer.css";
import "reactpdf/dist/page/TextLayer.css";

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';


interface Props {
    url: string
}

const PdfView = (props: Props) => {
    return (
        <div>PdfView</div>
    )
}

export default PdfView