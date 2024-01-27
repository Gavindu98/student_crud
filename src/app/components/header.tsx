"use client";
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {

    return (
        <>
            <div className='fixed top-0 left-0 z-50 w-full flex justify-center items-center bg-black'>
                <Link href="https://github.com/Gavindu98/student_crud.git" passHref={true} legacyBehavior={true}>
                    <a target="_blank" rel="noopener noreferrer" className='p-4 text-white font-bold'>
                        Gavindu Rathnayaka - Repo Link
                    </a>
                </Link>
            </div>
        </>
    );
}


export default Header;