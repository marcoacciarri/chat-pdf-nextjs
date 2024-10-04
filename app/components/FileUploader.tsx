'use client'
import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { RocketLaunch, ArrowCircleDown } from '@mui/icons-material'
import useFileUpload from '../../hooks/useFileUpload'
import { useRouter } from 'next/navigation'
import CircularProgressWithLabel from './ui/CircularProgessWithLabel';


export const FileUploader = () => {
    const { progress, status, fileId, handleUpload } = useFileUpload();
    const router = useRouter();

    useEffect(() => {
        if (fileId) {
            router.push(`dashboard/files/${fileId}`);
        }
    }, [fileId, router]);

    const uploadInProgress = progress !== null && progress >= 0 && progress < 100;

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0];

        if (file) {
            await handleUpload(file);
        } else {

        }
    }, [])

    const statusIcons: { [key: string]: JSX.Element } = {
        UPLOADING: <RocketLaunch className='h- w-16 animate-ping' />,
        UPLOADED: <RocketLaunch className='h- w-16 animate-ping' />,
        SAVING: <RocketLaunch className='h- w-16 animate-ping' />,
        GENERATING: <RocketLaunch className='h- w-16 animate-ping' />,
    }

    const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({ onDrop, maxFiles: 1, accept: { "application/pdf": [".pdf"] } })

    return (
        <div {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-md p-4 h-96 flex items-center justify-center ${isFocused || isDragActive || isDragAccept ? 'border-blue-500 bg-indigo-900' : ''}`}
        >
            {uploadInProgress && (
                <div className='flex flex-col mt-32 justify-center items-center gap-5'>
                    <RocketLaunch className='h- w-16 animate-ping' />
                    <p
                        className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${progress === 100 && "hidden"}`}
                        role="progressbar"
                    >Uploading {progress}%</p>
                    {/* <CircularProgressWithLabel value={progress} /> */}

                    <p>{String(status) || 'Uploading'}</p>
                </div>
            )}
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