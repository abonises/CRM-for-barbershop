import { useState, useEffect } from "react";

const UsePersist = () => {
    const persistedValue = localStorage.getItem("persist");
    const [persist, setPersist] = useState(persistedValue ? JSON.parse(persistedValue) : false);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    return [persist, setPersist];
};

export default UsePersist;
