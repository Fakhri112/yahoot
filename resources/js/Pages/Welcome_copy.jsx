import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Here is your toast.");

const App = () => {
    return (
        <div>
            <button onClick={notify}>Make me a toast</button>
        </div>
    );
};
export default App;
