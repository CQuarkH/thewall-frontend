import React, { useRef } from 'react';
import { useClickOutside } from 'src/hooks/useClickOutside';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    panoramic?: boolean;
    children: React.ReactNode;
}

function Modal({ isOpen, onClose, children, title, panoramic = false }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);

    useClickOutside([modalRef], () => {
        if (isOpen) {
            onClose();
        }
    })

    return (
        <article className={`${isOpen ? "opacity-100 z-20" : "-z-10 opacity-0"} grid place-items-center fixed top-0 bottom-0 left-0 right-0 bg-black/70 transition-all duration-300`}>
            {
                panoramic ? (
                    <div
                        ref={modalRef}
                        className='lex flex-col gap-8 bg-black rounded-lg shadow-lg 
                    shadow-white/20 border border-white/20 z-20'>
                        {children}
                    </div>
                ) : (
                    <div
                        ref={modalRef}
                        className='flex flex-col gap-8 bg-black rounded-lg shadow-lg 
                    shadow-white/20 p-6 border border-white/20 z-20'>

                        <div className='flex w-full gap-4 items-center'>
                            <button onClick={onClose} className='float-right'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {title}

                        </div>

                        {children}
                    </div>
                )
            }

        </article>
    )
}

export default Modal