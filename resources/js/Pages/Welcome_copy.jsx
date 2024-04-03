import { ProgressBar } from "@/Components/ProgressBar";
import React from "react";
import { useTable, useSortBy } from "react-table";

const DataTable = (props) => {
    // Memos
    const data = React.useMemo(
        () => [
            {
                firstName: "use",
                lastName: "sponge",
                age: 19,
                visits: 96,
                progress: 29,
                status: "relationship",
            },
            {
                firstName: "faucet",
                lastName: "cars",
                age: 24,
                visits: 71,
                progress: 40,
                status: "complicated",
            },
            {
                firstName: "request",
                lastName: "feet",
                age: 9,
                visits: 50,
                progress: 40,
                status: "single",
            },
            {
                firstName: "increase",
                lastName: "fishing",
                age: 11,
                visits: 88,
                progress: 37,
                status: "relationship",
            },
            {
                firstName: "mom",
                lastName: "love",
                age: 20,
                visits: 72,
                progress: 22,
                status: "single",
            },
            {
                firstName: "step",
                lastName: "toad",
                age: 5,
                visits: 9,
                progress: 8,
                status: "relationship",
            },
            {
                firstName: "expert",
                lastName: "kitty",
                age: 7,
                visits: 7,
                progress: 64,
                status: "relationship",
            },
            {
                firstName: "plantation",
                lastName: "glue",
                age: 20,
                visits: 42,
                progress: 89,
                status: "relationship",
            },
            {
                firstName: "sock",
                lastName: "presence",
                age: 27,
                visits: 80,
                progress: 19,
                status: "relationship",
            },
            {
                firstName: "boyfriend",
                lastName: "rabbits",
                age: 0,
                visits: 84,
                progress: 93,
                status: "complicated",
            },
            {
                firstName: "mice",
                lastName: "shoe",
                age: 14,
                visits: 59,
                progress: 63,
                status: "relationship",
            },
            {
                firstName: "gun",
                lastName: "gun",
                age: 26,
                visits: 3,
                progress: 19,
                status: "complicated",
            },
            {
                firstName: "popcorn",
                lastName: "giraffe",
                age: 7,
                visits: 57,
                progress: 17,
                status: "single",
            },
            {
                firstName: "charity",
                lastName: "alarm",
                age: 29,
                visits: 92,
                progress: 66,
                status: "relationship",
            },
            {
                firstName: "limit",
                lastName: "version",
                age: 8,
                visits: 25,
                progress: 73,
                status: "relationship",
            },
            {
                firstName: "rod",
                lastName: "dinosaurs",
                age: 10,
                visits: 54,
                progress: 17,
                status: "single",
            },
            {
                firstName: "animal",
                lastName: "journey",
                age: 15,
                visits: 54,
                progress: 12,
                status: "relationship",
            },
            {
                firstName: "birds",
                lastName: "rate",
                age: 24,
                visits: 87,
                progress: 5,
                status: "single",
            },
            {
                firstName: "variation",
                lastName: "turkey",
                age: 19,
                visits: 40,
                progress: 5,
                status: "relationship",
            },
            {
                firstName: "steak",
                lastName: "pocket",
                age: 27,
                visits: 87,
                progress: 0,
                status: "relationship",
            },
        ],
        []
    );
    const columns = React.useMemo(
        () => [
            {
                Header: "First Name",
                accessor: "firstName",
            },
            {
                Header: "Last Name",
                accessor: "lastName",
            },
            {
                Header: "Age",
                accessor: "age",
            },
            {
                Header: "Visits",
                accessor: "visits",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Profile Progress",
                accessor: "progress",
            },
        ],
        []
    );

    return (
        <>
            <div className="border border-black w-96 h-96">
                <ProgressBar
                    className={"!bg-green-800"}
                    progress={3}
                    progressTotal={5}
                />
            </div>
        </>
    );
};

export default DataTable;
