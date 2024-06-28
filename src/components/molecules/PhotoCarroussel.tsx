import React, { useState } from 'react';

interface Props {
    photoUrls: string[];
}

function PhotoCarroussel({ photoUrls }: Props) {
    const [actualIndex, setActualIndex] = useState(0);

    const handleNext = () => {
        if (actualIndex < photoUrls.length - 1) {
            setActualIndex(actualIndex + 1);
        }
    }

    const handlePrev = () => {
        if (actualIndex > 0) {
            setActualIndex(actualIndex - 1);
        }
    }

    if (photoUrls.length === 0) return null

    return (
        <picture className='flex flex-col w-full h-full relative select-none'>

            {
                actualIndex > 0 && (
                    <svg
                        onClick={handlePrev}
                        className="cursor-pointer w-6 h-6 text-amber-500  absolute left-0 top-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                )
            }

            <img
                src={photoUrls[actualIndex]}
                className="rounded-l-lg w-full h-full object-contain "
                alt="Post media"
            />
            {
                actualIndex < photoUrls.length - 1 && (
                    <svg
                        onClick={handleNext}
                        className="cursor-pointer w-6 h-6 text-amber-500 absolute right-0 top-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                )
            }

        </picture>
    )
}

export default PhotoCarroussel