import { ClerkLoaded } from '@clerk/nextjs'
import React from 'react'
import { Header as Header } from '../components/Header'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkLoaded>
            <div className="flex flex-col flex-1 h-screen w-100 px-4">
                <Header />
                <main className="">
                    {children}
                </main>


            </div>
        </ClerkLoaded>
    )
}

export default DashboardLayout