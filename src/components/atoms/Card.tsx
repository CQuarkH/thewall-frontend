import React from 'react';

interface CardProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    id: string;
}

const Card: React.FC<CardProps> = ({ className, children, onClick, id }) => {
    return (
        <div
            id={id}
            onClick={onClick}
            className={`rounded-lg shadow-xl shadow-white/5 p-6 ${className}`}>
            {children}
        </div>
    );
};

export default Card;