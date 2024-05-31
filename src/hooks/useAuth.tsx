import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import {jwtDecode} from 'jwt-decode'

type UserInfo = {
    username: string;
    roles: string[];
}

type Decoded = {
    UserInfo: UserInfo
}


const UseAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"

    if (token) {
        const decoded: Decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo
        console.log(decoded.UserInfo)

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: [], isManager, isAdmin}
};

export default UseAuth;