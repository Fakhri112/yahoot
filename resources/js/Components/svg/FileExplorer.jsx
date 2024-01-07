import React from "react";

const Folder = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 512 512"
            className={className}
        >
            <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
        </svg>
    );
};

const File = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 384 512"
            className={className}
        >
            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
        </svg>
    );
};

const NewFolder = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={"2em"}
            fill="currentColor"
            viewBox="0 0 16 16"
            className={className}
        >
            <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
            <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5" />
        </svg>
    );
};

const Drive = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 16 16"
            className={className}
        >
            <path d="M8.785 9.896A3.001 3.001 0 0 0 8 4a3 3 0 0 0-.891 5.865c.667-.44 1.396-.91 1.955-1.268.224-.144.483.115.34.34zM9 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm9 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-9.5.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1M4 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m2.882 11.177a1.102 1.102 0 0 1-1.56-1.559c.1-.098.396-.314.795-.588a4 4 0 1 1 1.946.47c-.537.813-1.02 1.515-1.181 1.677" />
        </svg>
    );
};

export { Folder, File, NewFolder, Drive };
