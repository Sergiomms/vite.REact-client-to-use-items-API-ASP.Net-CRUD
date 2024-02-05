import { createReducer } from "@reduxjs/toolkit";
import {
  itemsRequest,
  itemRequest,
  createItem,
  editItem,
  deleteItem
} from "./actions";


const initialState = {
  loadingItems: false,
  successItems: false,
  errorItems: false,
  loadingItem: false,
  successItem: false,
  errorItem: false,
  loadingCreate: false,
  successCreate: false,
  errorCreate: false,
  loadingEdit: false,
  successEdit: false,
  errorEdit: false,
  loadingDelete: false,
  successDelete: false,
  errorDelete: false
};


export const itemsReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(itemsRequest.pending, (state) => {
    state.loadingItems = true;
    state.successItems = false;
    state.errorItems = false;
  })
  .addCase(itemsRequest.fulfilled, (state, { payload }) => {
    state.loadingItems = false;
    state.successItems = payload;
    state.successItem = false;
    state.errorItems = false;
  })
  .addCase(itemsRequest.rejected, (state) => {
    state.loadingItems = false;
    state.successItems = false;
    state.errorItems = true;
  })
  .addCase(itemRequest.pending, (state) => {
    state.loadingItem = true;
    state.successItem = false;
    state.errorItem = false;
  })
  .addCase(itemRequest.fulfilled, (state, { payload }) => {
    state.loadingItem = false;
    state.successItem = payload;
    state.errorItem = false;
  })
  .addCase(itemRequest.rejected, (state) => {
    state.loadingItem = false;
    state.successItem = false;
    state.errorItem = true;
  })
  .addCase(createItem.pending, (state) => {
    state.loadingCreate = true;
    state.successCreate = false;
    state.errorCreate = false;
  })
  .addCase(createItem.fulfilled, (state, { payload }) => {
    state.loadingCreate = false;
    state.successItems = payload;
    state.successCreate = true;
    state.errorCreate = false;
  })
  .addCase(createItem.rejected, (state) => {
    state.loadingCreate = false;
    state.successCreate = false;
    state.errorCreate = true;
  })
  .addCase(editItem.pending, (state) => {
    state.loadingEdit = true;
    state.successEdit = false;
    state.errorEdit = false;
  })
  .addCase(editItem.fulfilled, (state, { payload }) => {
    state.loadingEdit = false;
    state.successItems = payload;
    state.successItem = false;
    state.successEdit = true;
    state.errorEdit = false;
  })
  .addCase(editItem.rejected, (state) => {
    state.loadingEdit = false;
    state.successEdit = false;
    state.errorEdit = true;
  })
  .addCase(deleteItem.pending, (state) => {
    state.loadingDelete = true;
    state.successDelete = false;
    state.errorDelete = false;
  })
  .addCase(deleteItem.fulfilled, (state, { payload }) => {
    state.loadingDelete = false;
    state.successItems = payload;
    state.successItem = false;
    state.successDelete = true;
    state.errorDelete = false;
  })
  .addCase(deleteItem.rejected, (state) => {
    state.loadingDelete = false;
    state.successDelete = false;
    state.errorDelete = true;
  })
})

