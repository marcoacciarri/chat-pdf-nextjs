import { ClerkLoaded } from '@clerk/nextjs'
import React from 'react'
import { DashboardHeader as Header } from '../components/DashboardHeader'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkLoaded>
            <div>
                {children}
            </div>
        </ClerkLoaded>
    )
}

export default DashboardLayout