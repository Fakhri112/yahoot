import { usePlayerState } from "@/Components/context/PlayerContext";
import { Spinner } from "@/Components/svg/Spinner";

import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const PlayerFinalResult = () => {
    const { show, score, username, avatar, myFinalScore, confetti } =
        usePlayerState();
    const { width, height } = useWindowSize();

    return (
        <>
            {show.finalResult ? (
                <>
                    {confetti ? (
                        <Confetti
                            recycle={false}
                            numberOfPieces={3000}
                            width={width}
                            height={height}
                            wind={0.03}
                            gravity={0.06}
                            onConfettiComplete={() => SetShowConfetti(false)}
                        />
                    ) : null}

                    {Object.keys(myFinalScore).length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.5,
                            }}
                            className="relative flex flex-col items-center justify-center gap-5 h-full"
                        >
                            <p className="bg-black/50 px-3 py-2 rounded text-xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                                {myFinalScore.quizTitle}
                            </p>
                            <p className="text-4xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                                {username}
                            </p>
                            <div className="items-center flex flex-col relative">
                                <img
                                    src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${avatar}`}
                                    alt="avatar"
                                    className="w-[50%]"
                                />
                                <div className="h-10 w-60 bg-sky-500"></div>

                                {myFinalScore.rank <= 3 ? (
                                    <p
                                        className={`rounded-full absolute -bottom-5  mt-2 w-fit lg:py-4 lg:px-7 
                                         py-2  px-4 lg:text-3xl text-lg font-bold text-white ${
                                             myFinalScore.rank == 1
                                                 ? "bg-amber-400"
                                                 : myFinalScore.rank == 2
                                                 ? " bg-slate-400 "
                                                 : myFinalScore.rank == 3
                                                 ? "bg-orange-700"
                                                 : null
                                         }`}
                                    >
                                        {myFinalScore.rank}
                                    </p>
                                ) : (
                                    <p className="px-3 font-semibold absolute bottom-2">
                                        {myFinalScore.rank}th Place
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-white text-md font-semibold">
                                    - {score} points -
                                </p>
                                <p className="text-white text-md font-semibold">
                                    {myFinalScore.phrase}
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="relative flex flex-col items-center justify-center gap-5 h-full">
                            <p className="text-5xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                                Drum Roll...
                            </p>
                            <Spinner classname={"h-16 fill-white"} />
                        </div>
                    )}
                </>
            ) : null}
        </>
    );
};

export default PlayerFinalResult;
