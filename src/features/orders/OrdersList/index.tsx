import './index.scss'
import {useGetOrdersQuery} from "../ordersApiSlice.ts";
import Order from "../Order";


const Index = () => {
    const {
        data: orders,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOrdersQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">error</p>
    }

    if (isSuccess) {
        const {ids} = orders

        const listContent = ids?.length
            ? ids.map(OrderId => <Order key={OrderId} OrderId={OrderId}/>)
            : null

        content = (<div className='orders-page'>
            <div className='header-box'>
                <h1>Orders</h1>
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