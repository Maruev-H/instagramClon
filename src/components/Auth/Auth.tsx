import React  from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../../hooks/hooks"

interface AuthProps {
    children: any
}

const Auth:React.FC<AuthProps> = ({children}) => {
  
  const location = useLocation()

  const { isAuth } = useAppSelector((state) => state.user)
  
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default Auth