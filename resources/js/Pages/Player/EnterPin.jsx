import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
import axios from "axios";
import { toast } from "react-hot-toast";
const EnterPin = () => {
    const { pin } = usePlayerState();
    const dispatch = usePlayerDispatch();

    const checkPin = (e) => {
        e.preventDefault();
        dispatch({ type: "TOGGLE_LOADING", payload: true });
        axios.post("/play/checkpin", { gamePin: pin.value }).then((res) => {
            dispatch({ type: "TOGGLE_LOADING", payload: false });
            if (!res.data) toast.error("Game Pin is Invalid");
            dispatch({
                type: "UPDATE_PIN_DATA",
                payload: {
                    ...pin,
                    valid: res.data,
                },
            });
        });
    };

    return (
        <>
            {!pin.valid ? (
                <form
                    onSubmit={checkPin}
                    className="border p-3 rounded bg-white "
                >
                    <input
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_PIN_DATA",
                                payload: {
                                    ...pin,
                                    value: e.target.value,
                                },
                            })
                        }
                        type="text"
                        autoComplete="off"
                        name="gamepin"
                        placeholder="Game PIN"
                        className="block w-[15rem] border-2 border-slate-300 text-center h-12 font-semibold rounded"
                    />
                    <div>
                        <button
                            className="bg-slate-800 border-b-4 border-slate-700 mt-3 
                                w-full rounded text-slate-200 font-semibold py-3
                                h-13 hover:translate-y-1 hover:border-b-0 hover:mb-1"
                        >
                            Enter
                        </button>
                    </div>
                </form>
            ) : null}
        </>
    );
};

export default EnterPin;
