import React from "react";
import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";

const EnterUsername = () => {
    const { pin, peer } = usePlayerState();
    const dispatch = usePlayerDispatch();

    const submitUsername = (e) => {
        e.preventDefault(),
            dispatch({
                type: "CONNECTING_TO_HOST",
                payload: true,
            });
    };

    return (
        <>
            {pin.valid && !peer.connected ? (
                <form
                    onSubmit={submitUsername}
                    className="border p-3 rounded bg-white "
                >
                    <input type="text" className="hidden" />
                    <input
                        required
                        maxLength={18}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_USERNAME",
                                payload: e.target.value,
                            })
                        }
                        placeholder="Username"
                        autoComplete="off"
                        className="block w-[15rem] border-2 border-slate-300 text-center h-12 font-semibold rounded"
                    />
                    <div>
                        <button className="btn-3d w-full py-3 mt-3 ">
                            Submit
                        </button>
                    </div>
                </form>
            ) : null}
        </>
    );
};

export default EnterUsername;
