import React, { useState } from "react";

const ImageIcon = ({ className, status, onClick }) => {
    return (
        <div
            onClick={onClick}
            title="Toggle Background"
            className="cursor-pointer z-50"
        >
            {status ? (
                <svg
                    className={className}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <path d="M19.5,4H10a1,1,0,0,0,0,2H19.5a1,1,0,0,1,1,1v6.76l-1.88-1.88a3,3,0,0,0-1.14-.71,1,1,0,1,0-.64,1.9.82.82,0,0,1,.36.23l3.31,3.29a.66.66,0,0,0,0,.15.83.83,0,0,0,0,.15,1.18,1.18,0,0,0,.13.18.48.48,0,0,0,.09.11.9.9,0,0,0,.2.14.6.6,0,0,0,.11.06.91.91,0,0,0,.37.08,1,1,0,0,0,1-1V7A3,3,0,0,0,19.5,4ZM3.21,2.29A1,1,0,0,0,1.79,3.71L3.18,5.1A3,3,0,0,0,2.5,7V17a3,3,0,0,0,3,3H18.09l1.7,1.71a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM4.5,7a1,1,0,0,1,.12-.46L7.34,9.25a3,3,0,0,0-1,.63L4.5,11.76Zm1,11a1,1,0,0,1-1-1V14.58l3.3-3.29a1,1,0,0,1,1.4,0L15.91,18Z"></path>
                    </g>
                </svg>
            ) : (
                <svg
                    fill="#000000"
                    viewBox="0 0 24 24"
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,18a1,1,0,0,1-1-1V14.58l3.3-3.29a1,1,0,0,1,1.4,0L15.41,18Zm15-1a1,1,0,0,1-1,1h-.77l-3.81-3.83.88-.88a1,1,0,0,1,1.4,0L20,16.58Zm0-3.24-1.88-1.87a3.06,3.06,0,0,0-4.24,0l-.88.88L10.12,9.89a3.06,3.06,0,0,0-4.24,0L4,11.76V7A1,1,0,0,1,5,6H19a1,1,0,0,1,1,1Z"></path>
                    </g>
                </svg>
            )}
        </div>
    );
};

export default ImageIcon;
