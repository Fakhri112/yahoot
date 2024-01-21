import React, { lazy, Suspense } from "react";

const MoveTo = lazy(() => import("./Library/Modal/Directory"));

const App = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <MoveTo />
            </Suspense>
        </div>
    );
};

export default App;
