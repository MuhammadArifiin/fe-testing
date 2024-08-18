import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <h1>Welcome</h1>
            <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
