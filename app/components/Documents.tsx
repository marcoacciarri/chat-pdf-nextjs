import React from 'react';
import PlaceholderDocument from './PlaceholderDocument';

export const dynamic = "force-dynamic";

function Documents() {
    return (
        <div className='h-full max-w-7xl mx-auto'>
            {/* Map through docuemnts */}

            <PlaceholderDocument />
        </div>
    )
}

export default Documents