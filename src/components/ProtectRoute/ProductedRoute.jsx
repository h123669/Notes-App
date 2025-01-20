import { Navigate } from 'react-router-dom';

export default function ProductedRoute({children}) {
  if(localStorage.getItem('token')){
    return children;
  }else{
    return <Navigate to={"/SignIn"}/>
  }
}
