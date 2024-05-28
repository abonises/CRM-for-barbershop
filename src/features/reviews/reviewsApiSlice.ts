import {
    createSelector,
    createEntityAdapter, EntityState, EntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"
import {Review} from '../../models/models'
import { RootState } from '../../app/store'

const reviewsAdapter: EntityAdapter<Review, string> = createEntityAdapter<Review>({})

const initialState = reviewsAdapter.getInitialState()

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query<EntityState<Review, string>, void>({
            query: () => '/reviews',
            transformResponse: (responseData: Review[]) => {
                const loadedReviews = responseData.map(review => {
                    review.id = review._id
                    return review
                });
                return reviewsAdapter.setAll(initialState, loadedReviews)
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'Review', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Review', id }))
                    ]
                } else return [{ type: 'Review', id: 'LIST' }]
            }
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => ({
                url: `/reviews`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (_result, _, arg) => [
                { type: 'Review', id: arg.id }
            ]
        }),
    }),
})


export const {
    useGetReviewsQuery,
    useDeleteReviewMutation,
} = reviewsApiSlice

export const selectReviewsResult = reviewsApiSlice.endpoints.getReviews.select()

const selectReviewsData = createSelector(
    selectReviewsResult,
    ReviewsResult => ReviewsResult?.data  ?? initialState
)

export const {
    selectAll: selectAllReviews,
    selectById: selectReviewById,
    selectIds: selectReviewIds
} = reviewsAdapter.getSelectors((state: RootState) => selectReviewsData(state) ?? initialState)