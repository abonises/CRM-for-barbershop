import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"

type Props = {
    allowedRoles: string[]
}

const Index = ({ allowedRoles }: Props) => {
    const location = useLocation()
    const { roles } = useAuth()

    const content = (
        roles.some((role: string) => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
};

export default Index;