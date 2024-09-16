'use client'
import { Button } from '@mui/material'
import { PlusOne, PlusOneOutlined } from '@mui/icons-material'
import React from 'react'
import { useRouter } from 'next/navigation'

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