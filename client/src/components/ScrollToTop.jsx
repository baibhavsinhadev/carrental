import { useEffect } from "react";
import { useApp } from "../context/AppContext";

const ScrollToTop = () => {

    const { location } = useApp();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname]);

    return null;
};

export default ScrollToTop;