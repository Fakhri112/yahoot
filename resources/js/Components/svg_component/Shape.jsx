const Rhombus = (props) => {
    return (
        <svg
            viewBox="0 0 24.00 24.00"
            fill="none"
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    d="M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z"
                    stroke="#000000"
                    stroke-width="0.048"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>{" "}
            </g>
        </svg>
    );
};

const Triangle = (props) => {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M21,21H3L12,3Z"></path>
            </g>
        </svg>
    );
};

const Circle = (props) => {
    return (
        <svg viewBox="0 0 512 512" className={props.className}>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <title>circle-filled</title>{" "}
                <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill-rule="evenodd"
                >
                    <g id="icon" transform="translate(42.666667, 42.666667)">
                        <path
                            d="M213.333333,3.55271368e-14 C331.15408,3.55271368e-14 426.666667,95.5125867 426.666667,213.333333 C426.666667,331.15408 331.15408,426.666667 213.333333,426.666667 C95.5125867,426.666667 3.55271368e-14,331.15408 3.55271368e-14,213.333333 C3.55271368e-14,95.5125867 95.5125867,3.55271368e-14 213.333333,3.55271368e-14 Z"
                            id="Combined-Shape"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};

const Square = (props) => {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M4.281 3h16.437A1.281 1.281 0 0 1 22 4.281v16.437A1.282 1.282 0 0 1 20.718 22H4.282A1.282 1.282 0 0 1 3 20.718V4.281A1.281 1.281 0 0 1 4.281 3z"></path>
                <path fill="none" d="M0 0h24v24H0z"></path>
            </g>
        </svg>
    );
};

export { Triangle, Rhombus, Circle, Square };
