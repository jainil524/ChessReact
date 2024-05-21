import React from 'react'
import Header from '../components/Header/Header'
import { Outlet, Link } from 'react-router-dom'
import '../css/mainpage.css'

function Index() {
    return (
        <>
            <Header />
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
                        <img src="/Graphic_1.jpeg" alt="Chess Graphic" />
                    </div>
                </section>
            </main>

            <Outlet />
        </>

    )
}

export default Index
