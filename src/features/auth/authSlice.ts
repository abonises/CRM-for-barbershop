import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../../app/store.ts";

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null},
    reducers: {
        setCredentials: (state, action) => {
            const {accessToken} = action.payload
            state.token = accessToken
        },
        logOut: (state) => {
            state.token = null
        },
    }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export const selectCurrentToken = (state: RootState) => state.api.auth.token