import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { adminDB } from 'lib/firebaseAdmin';
import PdfView from '@/app/components/PdfView';

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
            <div className='col-span-5 lg:col-span-2 overflow-y-auto'></div>
            <div className='col-span-5 lg:col-span-3 bg-grey-10 border-r-2 lg:order-1 overflow-auto'>
                <PdfView url={url.data()?.downloadURL} />
            </div>
        </div>
    );
};

export default FilePage;