import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../users/usersApiSlice'
import NewOrderForm from "../NewOrderForm";

const Index = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Avaible</p>

    const content = users ? <NewOrderForm users={users} /> : <p>Loading...</p>

    return content
};

export default Index;