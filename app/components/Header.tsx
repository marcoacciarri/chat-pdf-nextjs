import { SignedIn, UserButton } from '@clerk/nextjs'
import { FileUploadOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Link from 'next/link'
import React from 'react'

export const Header = () => {
    return (
        <div className="flex flex-row flex-1 w-100 items-center space-x-2 justify-between py-4">

            <Link href='/dashboard'>Dashboard</Link>

            <Link href='/dashboard/upgrade'>Pricing</Link>

            <Button>
                <Link href='/dashboard/upload'>
                    <FileUploadOutlined />
                    Upload
                </Link>
            </Button>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>


    )
}