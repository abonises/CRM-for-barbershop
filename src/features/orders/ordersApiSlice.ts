import {
    createSelector,
    createEntityAdapter, EntityState, EntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"
import {Order} from '../../models/models'
import { RootState } from '../../app/store'

const ordersAdapter: EntityAdapter<Order, string> = createEntityAdapter<Order>({
    sortComparer: (a, b) => (a === b) ? 0 : a ? 1 : -1
})

const initialState = ordersAdapter.getInitialState()

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query<EntityState<Order, string>, void>({
            query: () => '/orders',
            transformResponse: (responseData: Order[]) => {
                const loadedOrders = responseData.map(order => {
                    order.id = order._id
                    return order
                });
                return ordersAdapter.setAll(initialState, loadedOrders)
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'Order', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Order', id }))
                    ]
                } else return [{ type: 'Order', id: 'LIST' }]
            }
        }),
        addNewOrder: builder.mutation({
            query: initialOrder => ({
                url: '/orders',
                method: 'POST',
                body: {
                    ...initialOrder,
                }
            }),
            invalidatesTags: [
                { type: 'Order', id: "LIST" }
            ]
        }),
        updateOrder: builder.mutation({
            query: initialOrder => ({
                url: '/orders',
                method: 'PATCH',
                body: {
                    ...initialOrder,
                }
            }),
            invalidatesTags: (_result, _, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        deleteOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/orders`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (_result, _, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetOrdersQuery,
    useAddNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = ordersApiSlice

export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select()

const selectOrdersData = createSelector(
    selectOrdersResult,
    OrdersResult => OrdersResult?.data  ?? initialState
)

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds
} = ordersAdapter.getSelectors((state: RootState) => selectOrdersData(state) ?? initialState)