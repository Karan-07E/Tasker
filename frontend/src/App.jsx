import React from 'react'
import { Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import CreateNote from './Pages/CreateNote';
import NoteDetail from './Pages/NoteDetail';
import { toast } from 'react-hot-toast'; // for toast notifications

// use daisyui for optimised UI components
// use react-hot-toast for toast notifications

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#BA8E23_100%)]">
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  )
}

export default App