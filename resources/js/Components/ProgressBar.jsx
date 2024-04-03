const ProgressBar = ({ progress, progressTotal, className, hideNumber }) => {
    const progressBarStyle = {
        width: `${(progress / progressTotal) * 100}%`,
        position: "relative",
        overflow: "hidden", // Hide overflowing content
    };

    const percentageTextStyle = {
        position: "absolute",
        top: "50%",
        right: "5px", // Align to the right side
        transform: "translateY(-50%)",
        color: "white",
        fontWeight: "bold",
        opacity: progress === 0 ? 0 : 1, // Hide when progress is 0
        transition: "right 0.5s ease", // Add smooth transition
    };

    return (
        <div
            className={`progress-bar h-4 ${className}`}
            style={progressBarStyle}
        >
            <div
                className={`${hideNumber ? "!text-transparent" : ""}`}
                style={percentageTextStyle}
            >
                {Math.floor(progress / 1000)}
            </div>
        </div>
    );
};

export { ProgressBar };
