import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
                <div>
                    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
                    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
                </div>
            </div>
            <h1 className="text-4xl text-center mt-8">Vite + React</h1>
            <div className="card p-6 bg-gray-100 rounded-lg shadow-md mt-8 text-center">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </button>
                <p className="mt-4 text-gray-700">
                    Edit <code className="text-blue-600">src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs text-center text-gray-500 mt-8">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
