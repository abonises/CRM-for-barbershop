import { store } from '../../../app/store'
import { ordersApiSlice } from '../../orders/ordersApiSlice'
import { usersApiSlice } from '../../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Index = () => {
    useEffect(() => {
        console.log('subscribing')
        const orders = store.dispatch(ordersApiSlice.endpoints.getOrders.initiate(undefined, undefined))
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate(undefined, undefined))

        return () => {
            console.log('unsubscribing')
            orders.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
};

export default Index;