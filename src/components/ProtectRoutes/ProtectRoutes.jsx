import { useContext, useEffect  } from "react"
import { showForm } from "../../context/ShowRegister"
import { Navigate } from "react-router-dom"

export default function ProtectRoutes(props) {
    let {setShow,setIsLoginForm} = useContext(showForm)
    if(localStorage.getItem('userToken')){
        return props.children
    }else{
            setShow(true)
        return <Navigate to='/' />
    }
}
