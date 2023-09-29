import { useContext, useEffect } from "react";
import { showForm } from "../../context/ShowRegister";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes(props) {
    const { setShow, setIsLoginForm } = useContext(showForm);

    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            setShow(true);
        }
    }, [setShow]);

    if (localStorage.getItem('userToken')) {
        return props.children;
    } else {
        return <Navigate to="/" />;
    }
}