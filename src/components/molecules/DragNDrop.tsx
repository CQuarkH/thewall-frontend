import React from 'react'
import { useDropzone } from 'react-dropzone-esm';
import { useCallback } from 'react';

interface Props {
    handlePhotosChange: (files: any) => void;
}

function DragNDrop({ handlePhotosChange }: Props) {
    const onDrop = useCallback((acceptedFiles: any) => {
        handlePhotosChange(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div {...getRootProps()}
            className={`border border-dashed border-white/70 p-2 rounded-md transition-all duration-200 w-full h-28 flex items-center justify-center
            ${isDragActive ? 'bg-white/10' : 'bg-black'}`}>
            <input {...getInputProps()}
            />
            {
                isDragActive ?
                    <p className='text-sm'>Drop the images here ...</p> :
                    <span className='flex flex-col items-center cursor-pointer'>
                        <svg className="w-6 h-6 text-white hover:text-white/60 transition-all duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                        </svg>

                        <p className='text-sm'> Drag 'n' drop some images here, or click to select</p>
                    </span>
            }

        </div>
    )
}

export default DragNDrop