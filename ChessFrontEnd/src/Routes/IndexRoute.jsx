import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Board from '../components/Board/Board'
import IndexLayout from '../Layouts/IndexLayout'
import FindRoom from '../pages/FindRoom'
import Room from '../pages/Room'
import Index from '../pages/Index'

function IndexRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<IndexLayout />}>
                    <Route index={true} path="home" element={<Index />} />
                    <Route path="findroom" element={<FindRoom />} />
                    <Route path="rooms" element={<Room />} />
                    <Route path="board" element={<Board />} />
                </Route>
            </Routes>
        </>
    )
}

export default IndexRoute
