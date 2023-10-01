import { createContext, useState } from "react";

export let showForm = createContext();

export default function ShowFormProvider(props) {
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [show, setShow] = useState(false);
    return (
        <showForm.Provider value={{ isLoginForm, setIsLoginForm, show, setShow, showForgotPassword, setShowForgotPassword }}>
            {props.children}
        </showForm.Provider>
    )
}