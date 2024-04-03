import { Switch } from "@headlessui/react";
import React from "react";

const SwitchButton = ({
    checked,
    onChange,
    switchClassName,
    spanClassName,
}) => {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
            className={`${checked ? "bg-blue-800" : "bg-slate-400"}
    relative inline-flex z-10 h-[20px] w-[45px]
 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200
 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 ${switchClassName}`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${checked ? "translate-x-6" : "translate-x-0"}
    pointer-events-none inline-block h-[16px] w-[16px] '
    transform rounded-full bg-white ${spanClassName}
    shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
};

export default SwitchButton;
