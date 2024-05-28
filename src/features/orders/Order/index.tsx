import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useSelector } from 'react-redux'
import { selectOrderById } from '../ordersApiSlice'
import {MdEdit} from "react-icons/md";
import {RootState} from "../../../app/store.ts";

type Props = {
    OrderId: string
}

const Index = ({ OrderId }: Props) => {

    const order = useSelector((state: RootState) => selectOrderById(state, OrderId))

    const navigate = useNavigate()

    if (order) {

        const handleEdit = () => navigate(`/orders/${OrderId}`)

        return (
            <li key={order.id} className="order-element">
                <div className='order'>
                    <span className='order-barber order-name'>{order.nameBarber}</span>
                    <span className='order-name'>{order.name}</span>
                    <span className='order-name'>{order.surname}</span>
                    <span className='order-time'>{order.time}</span>
                    <span className='order-phone_number'>+{order.phone}</span>
                    <button onClick={handleEdit}><MdEdit /></button>
                </div>
            </li>
        )

    } else return null
};

export default Index;