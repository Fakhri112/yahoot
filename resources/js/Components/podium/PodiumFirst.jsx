import { motion } from "framer-motion";

const PodiumFirst = ({
    delayPodium,
    delayPlayerName,
    delayAvatar,
    playerAvatar,
    playerName,
    playerScore,
}) => {
    return (
        <motion.div
            animate={{
                height: ["0%", "65%", "65%", "65%", "65%"],
            }}
            transition={{
                times: [0, 0.1, 0.45, 0.8, 1],
                duration: 3,
                delay: delayPodium,
            }}
            className="flex-col relative items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 h-[94%] flex"
        >
            <motion.img
                animate={{
                    animationTimingFunction: [
                        "ease-in",
                        "ease-out",
                        "ease-in",
                        "ease-out",
                        "ease-in",
                        "ease-out",
                        "ease-in",
                        "ease-out",
                    ],
                    transform: [
                        "translateY(-500px)",
                        "translateY(0)",
                        "translateY(-65px)",
                        "translateY(0)",
                        "translateY(-28px)",
                        "translateY(0)",
                        "translateY(-8px)",
                        "translateY(0)",
                    ],
                    opacity: ["0", "1", "1", "1", "1", "1", "1", "1"],
                }}
                transition={{
                    times: [0, 0.38, 0.55, 0.72, 0.81, 0.9, 0.95, 1],
                    duration: 1.1,
                    delay: delayAvatar,
                }}
                src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${playerAvatar}`}
                alt=""
                className="sm:w-[50%] md:w-[75%] w-[75%] absolute sm:-mt-[50%] md:-mt-[75%] -mt-[75%]"
            />

            <div className=" h-full bg-cyan-500 shadow-lg shadow-cyan-500/50">
                <motion.div
                    initial={{
                        opacity: 0,
                        marginTop: "-10rem",
                    }}
                    animate={{ opacity: 1, marginTop: 0 }}
                    transition={{
                        ease: "easeOut",
                        duration: 0.2,
                        delay: delayPlayerName,
                    }}
                    className="lg:w-40 md:w-28 sm:w-40 w-28  overflow-hidden  flex flex-col items-center "
                >
                    <p
                        className="rounded-full bg-amber-400  mt-2 w-fit lg:py-4 lg:px-7 
                    py-2  px-4 lg:text-3xl text-lg font-bold text-white"
                    >
                        1
                    </p>
                    <p className="text-white text-xl font-semibold">
                        {playerName}
                    </p>
                    <p className="text-white text-xl font-semibold">
                        {playerScore}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PodiumFirst;
