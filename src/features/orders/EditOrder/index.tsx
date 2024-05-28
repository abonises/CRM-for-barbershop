import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrderById} from "../ordersApiSlice.ts";
import EditOrderForm from "../EditOrderForm";
import { RootState } from '../../../app/store'
import {selectAllUsers} from "../../users/usersApiSlice.ts";

const Index = () => {
    const { id } = useParams()

    const order = useSelector((state: RootState) => selectOrderById(state, id!))
    const users = useSelector(selectAllUsers)

    const content = order && users ? <EditOrderForm order={order} users={users} /> : <p>Loading...</p>

    return content

};

export default Index;