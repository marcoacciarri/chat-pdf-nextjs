import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { adminDB } from 'lib/firebaseAdmin';

const FilePage = async ({
    params: { id }
}: {
    params: {
        id: string
    }
}) => {
    auth().protect();
    const { userId } = auth();

    const url = await adminDB.collection('users').doc(userId!).collection('files').doc(id).get();

    return (
        <div className='grid lg:grid-cols-5 h-full overflow-hidden'>
            {/* Right Section */}
            <div className='col-span-5 lg:col-span-2 overflow-y-auto'></div>
            <div className='col-span-5 lg:col-span-3 bg-grey-10 border-r-2 lg:order-1 overflow-auto'>
                <h1 className='text-3xl font-bold'>File Name</h1>
                <p className='text-sm text-gray-500'>File Size</p>
            </div>
        </div>
    );
};

export default FilePage;