'use client'
import React from 'react'
import { Button } from '@mui/material'
import { PlusOne, PlusOneOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { FileUploader } from './FileUploader'

function PlaceholderDocument() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/dashboard/upload');
    }
    return (
        <Button onClick={handleClick}>
            <PlusOneOutlined className='h-16 w-16' />
            <p> New Document </p>
        </Button>
    )
}

export default PlaceholderDocument