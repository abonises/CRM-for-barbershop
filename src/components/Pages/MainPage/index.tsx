import './index.scss'
import { IoPerson } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineReviews } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import {useGetOrdersQuery} from "../../../features/orders/ordersApiSlice.ts";
import {useEffect, useState} from "react";
import {useGetUsersQuery} from "../../../features/users/usersApiSlice.ts";

const Index = () => {


    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000)

        return function cleanup()  {
            clearInterval(timerId)
        }
    }, []);

    function tick() {
        setCurrentTime(new Date());
    }

    const {
        data: orders,
    } = useGetOrdersQuery()

    const {
        data: users,
    } = useGetUsersQuery()


    const stuffCount = users && users.ids ? users.ids.length : 0;
    const ordersCount = orders && orders.ids ? orders.ids.length : 0

    return (
        <section className='main-page'>
            <div className='header-box'>
                <h1>Main Page</h1>
            </div>
            <div className='statistic'>
                <div className='tab-stats stuff-count'>
                    <h1><IoPerson className='icon-stat-tab'/>Stuff Count</h1>
                    <span>{stuffCount}</span>
                </div>
                <div className='tab-stats orders-count'>
                    <h1><CgNotes className='icon-stat-tab'/>Orders Count</h1>
                    <span>{ordersCount}</span>
                </div>
                <div className="tab-stats reviews-count">
                    <h1><MdOutlineReviews className='icon-stat-tab'/>Reviews Count</h1>
                    <span>111</span>
                </div>
                <div className="tab-stats all-clients">
                    <h1><IoPeopleSharp className='icon-stat-tab'/>Time Now</h1>
                    <span>{currentTime.toLocaleString('uk-Ua', { hour: 'numeric', minute: 'numeric', second: 'numeric'})}</span>
                </div>
            </div>
        </section>
    );
};

export default Index;