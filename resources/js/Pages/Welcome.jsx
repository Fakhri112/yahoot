import { Link, Head } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Kahoot" />
            <nav className='py-3 px-5 absolute  w-full flex justify-between'>
                <div>
                    <h4 className='font-josefin font-semibold text-2xl text-slate-200'>Yahoot!</h4>
                </div>
                <div>
                    <Link href="" className='me-10 font-semibold text-white'>Log In</Link>
                    <Link href="" className='font-semibold text-white'>Register</Link>
                </div>
            </nav>
            <main className='bg-violet-600 h-screen grid place-items-center'>
                <div className='text-center'>
                    <h1 className='text-9xl font-josefin text-white font-bold'>Yahoot!</h1>
                    <p className='text-xl font-medium text-slate-300'>A Live Quiz Game Similar like Kahoot</p>
                    <div className='mt-8'>
                    <button className='font-semibold text-slate-200 me-5 bg-sky-800 p-3 rounded'>Browse Game</button>
                    <button className='font-semibold bg-teal-100 p-3 rounded'>Join the Game</button>
                    </div>
                </div>
            </main>
        </>
    );
}
