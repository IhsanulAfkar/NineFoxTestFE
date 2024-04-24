import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './pages/index.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Data from './pages/data/index.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  }, {
    path: '/data',
    element: <Data />
  }, {
    path: '*',
    element: <p className='font-bold text-4xl'>Page Not Found :(</p>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Toaster />
    <div className='absolute flex justify-center  items-center w-full h-screen overflow-hidden bg-gradient-to-br from-stone-200 to-cyan-200 sm:px-4 px-0'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
