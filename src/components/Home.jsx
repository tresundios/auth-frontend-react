import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";

const Home = () => {
    const { user } = useAuth();
    const imagePath = `images/bg-image.webp`;
    return (
        <>
            <Navbar></Navbar>
            <section className="vh-100 bg-image" style={{ backgroundImage: `url('${imagePath}')` }}>
                <h1>Welcome, {user.name}</h1>
            </section>
        </>
    )
}

export default Home;