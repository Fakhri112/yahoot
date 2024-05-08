import ChoiceButton from "@/Components/choice/ChoiceButton";
import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
import { useEffect, useState } from "react";

const ChoosingAnswer = () => {
    const { show, currentQuestion } = usePlayerState();
    const dispatch = usePlayerDispatch();
    const [time, SetTime] = useState(null);

    useEffect(() => {
        if (!currentQuestion) return;
        SetTime(currentQuestion.duration * 1000);
    }, [currentQuestion]);

    const handleAnswer = (e) => {
        dispatch({
            type: "UPDATE_CHOOSED_ANSWER_DATA",
            payload: {
                answer: e.target.name,
            },
        });

        dispatch({ type: "TOGGLE_SHOW_CHOOSING_ANSWER" });
    };

    return (
        <>
            {show.choosingAnswer ? (
                <div className="relative z-40 grid grid-rows-2 grid-cols-2 h-full gap-3 p-4 sm:p-7">
                    <ChoiceButton
                        onClick={handleAnswer}
                        name={"A"}
                        shape={"triangle"}
                    />
                    <ChoiceButton
                        onClick={handleAnswer}
                        name={"B"}
                        shape={"rhombus"}
                    />
                    <ChoiceButton
                        onClick={handleAnswer}
                        name={"C"}
                        shape={"circle"}
                    />
                    <ChoiceButton
                        onClick={handleAnswer}
                        name={"D"}
                        shape={"square"}
                    />
                </div>
            ) : null}
        </>
    );
};

export default ChoosingAnswer;
