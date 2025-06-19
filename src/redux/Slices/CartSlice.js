import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add:(state,action) => {
            const item = state.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        remove:(state,action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        increment: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    return state.filter((item) => item.id !== action.payload);
                }
            }
            return state;
        },
    }
});

export const {add, remove, increment, decrement} = CartSlice.actions;
export default CartSlice.reducer;