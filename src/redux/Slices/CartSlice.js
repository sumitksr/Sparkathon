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
        clearCart: (state) => {
            return [];
        },
    }
});

// Selectors for better performance
export const selectCart = (state) => state.cart;
export const selectCartItemById = (state, itemId) => state.cart.find(item => item.id === itemId);
export const selectCartTotal = (state) => state.cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
export const selectCartCount = (state) => state.cart.length;

export const {add, remove, increment, decrement, clearCart} = CartSlice.actions;
export default CartSlice.reducer;