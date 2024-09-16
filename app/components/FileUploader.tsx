'use client'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


export const FileUploader = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-md p-4 h-96 flex items-center justify-center ${isFocused || isDragActive ? 'border-blue-500 bg-indigo-900' : ''}`}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div >
    )
} 