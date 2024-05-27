import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom"; // Import Outlet
import getAbsolutePathUrl from "../utils/URLManager";

const ProtectedComponent = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            setIsLoggedIn(false);
            return navigate(getAbsolutePathUrl());
        }
        setIsLoggedIn(true);
    }, [navigate]);

    return (
        <>
            {isLoggedIn ? <Outlet /> : null} {/* Render Outlet if logged in */}
        </>
    );
};

export default ProtectedComponent;
