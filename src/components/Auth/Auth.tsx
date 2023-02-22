import React  from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../../hooks/hooks"

interface AuthProps {
    children: any
}

const Auth:React.FC<AuthProps> = ({children}) => {
  
  const location = useLocation()

  const { token } = useAppSelector((state) => state.posts.currentUser)
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default Auth