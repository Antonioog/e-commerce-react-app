import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProductsCartGlobal: (state, action) => {
      return { ...state, products: action.payload };
    },
  },
});

export const { setProductsCartGlobal } = cartSlice.actions;

export const getAllCartProducts = () => (dispatch) => {
  axiosEcommerce
    .get("/cart", getConfig())
    .then((res) => dispatch(setProductsCartGlobal(res.data)))
    .catch((err) => console.log(err));
};

export const addProductCart = (data) => (dispatch) => {
  axiosEcommerce
    .post("/cart", data, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err));
};

export const deleteProductCart = (id) => (dispatch) => {
  axiosEcommerce
    .delete(`/cart/${id}`, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err));
};

export const updateProductCart = (id, data) => (dispatch) => {
  axiosEcommerce
    .put(`/cart/${id}`, data, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err));
};

export const purchaseCart = () => (dispatch) => {
  axiosEcommerce
    .post("/purchases", {}, getConfig())
    .then((res) => dispatch(setProductsCartGlobal([])))
    .catch((err) => console.log(err));
};

export default cartSlice.reducer;
