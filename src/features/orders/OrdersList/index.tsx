import './index.scss'
import {useGetOrdersQuery} from "../ordersApiSlice.ts";
import Order from "../Order";
import {CustomError} from "../../../models/models.ts";
import { RiStickyNoteAddLine } from "react-icons/ri";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const {
        data: orders,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOrdersQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const navigate = useNavigate()

    const handleNewOrder = () => {
        navigate('/orders/new')
    }

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{(error as CustomError)?.data?.message}</p>
    }

    if (isSuccess) {
        const {ids} = orders

        const listContent = ids?.length
            ? ids.map(OrderId => <Order key={OrderId} OrderId={OrderId}/>)
            : null

        content = (<div className='orders-page'>
            <div className='header-box'>
                <h1>Orders</h1>
                <button onClick={handleNewOrder}>
                    <RiStickyNoteAddLine/>
                </button>
            </div>
            <div className='orders-list-box'>
                <div className='properties-list'>
                <span>Barber</span>
                    <span>Name</span>
                    <span>Surname</span>
                    <span>Time</span>
                    <span>Phone Number</span>
                </div>
                <ul className='orders-list'>
                    {listContent}
                </ul>
            </div>
        </div>)
    }

    return content;
}
    export default Index;