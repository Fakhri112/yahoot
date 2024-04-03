import NavBar from "@/Components/NavBar";
import ProfileSidebar from "@/Components/ProfileSidebar";
import React, { useEffect } from "react";
import UserData from "./UserData";
import toast, { Toaster } from "react-hot-toast";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";
import { Head } from "@inertiajs/react";

const Index = ({ auth, mustVerifyEmail, status, flash, pageTitle }) => {
    useEffect(() => {
        if (flash.message) toast.success(flash.message);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="h-screen bg-white overflow-hidden">
            <Head title={pageTitle + " - "} />
            <Toaster />
            <NavBar />
            <ProfileSidebar />
            <main className="pb-24 md:ml-24 h-[calc(100vh)] bg-slate-50 p-2">
                <div className=" h-full p-2 text-slate-800 overflow-auto ">
                    <h1 className="text-3xl font-semibold">Setting</h1>
                    <div className="grid grid-cols-1 gap-y-5 mt-4 md:gap-x-7 ">
                        <UserData />
                        <Password />
                        <DeleteAccount />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Index;
