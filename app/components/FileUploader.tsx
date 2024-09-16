'use client'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { RocketLaunch, ArrowCircleDown } from '@mui/icons-material'


export const FileUploader = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-md p-4 h-96 flex items-center justify-center ${isFocused || isDragActive || isDragAccept ? 'border-blue-500 bg-indigo-900' : ''}`}
        >
            <input {...getInputProps()} />
            <div className='flex flex-col items-center'>
                {isDragActive ? (
                    <>
                        <RocketLaunch className='h- w-16 animate-ping' />
                        <p>Drop the files here ...</p>
                    </>
                ) : (
                    <>
                        <ArrowCircleDown font-size="large" className='animate-bounce' />
                        <p>Drag n drop some files here, or click to select files</p>
                    </>
                )}
            </div>
        </div >
    )
} 