import { motion } from "framer-motion";

const PodiumSecond = ({
    delayPodium,
    delayAvatar,
    delayPlayerName,
    playerAvatar,
    playerName,
    playerScore,
}) => {
    return (
        <motion.div
            animate={{
                height: ["0%", "55%", "55%", "55%", "55%"],
                translateX: ["-100%", "-100%", "-100%", "-100%", "0%"],
            }}
            transition={{
                times: [0, 0.1, 0.45, 0.8, 1],
                duration: 3,
                delay: delayPodium,
            }}
            className={` flex-col translate-x-[100%] items-center h-[55%] flex`}
        >
            <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: "spring",
                    duration: 0.3,
                    delay: delayAvatar,
                }}
                src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${playerAvatar}`}
                alt=""
                className={`${
                    playerAvatar ? "" : "hidden"
                } sm:w-[38%] md:w-[50%] w-[50%] absolute sm:-mt-[38%] md:-mt-[50%] -mt-[50%]`}
            />

            <div className="lg:w-40 md:w-28 sm:w-40 w-28  h-full bg-blue-700">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.2,
                        delay: delayPlayerName,
                    }}
                    className="flex flex-col items-center "
                >
                    <p
                        className="rounded-full bg-slate-400 mt-2 w-fit lg:py-4 lg:px-6 
                    py-2 px-4 lg:text-3xl text-lg font-bold text-white"
                    >
                        2
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

export default PodiumSecond;
