import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import GraphicsImage from "/Graphic_1.jpeg"

import '../css/mainpage.css'


function Index() {
    return (
        <>
            <main>
                <section className="intro">
                    <div className="intro-text">
                        <h2>Discover the Classic Game of Chess</h2>
                        <p>Challenge your mind and enhance your strategy skills with our interactive chess game. Play against friends and can be play with AI in cooming soon updates, and track your progress with detailed analytics.</p>
                        <Link to="/findroom">
                            <button>Find a room</button>
                        </Link>
                    </div>
                    <div className="intro-graphics">
                        <img src={GraphicsImage} alt="Chess Graphic" />
                    </div>
                </section>
            </main>

            <Outlet />
        </>

    )
}

export default Index
