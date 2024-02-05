import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const itemsRequest = createAsyncThunk(
  "items/itemsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const itemsUrl = `https://localhost:7265/api/${payload.route}`;
      const response = await axios.get(itemsUrl);

      return response.data;
    } catch (err) {
      if (err.response.status !== 200) {
        console.error("Could not find any Items. Please try again.");
      }
      return rejectWithValue("request error");
    }
  }
);

export const itemRequest = createAsyncThunk(
  "items/itemRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const itemsUrl = `https://localhost:7265/api/${payload.route}/(id)?id=${payload.id}`;
      const response = await axios.get(itemsUrl);

      return response.data;
    } catch (err) {
      if (err.response.status !== 200) {
        console.error("Could not find any Item. Please try again.");
      }
      return rejectWithValue("request error");
    }
  }
);

export const createItem = createAsyncThunk(
  "items/itemsCreate",
  async (payload, { rejectWithValue }) => {
    try {
      const itemsUrl = `https://localhost:7265/api/${payload.route}`;
      const response = await axios.post(itemsUrl, 
        {
          descricao: payload.description,
          preco: payload.price
        }
      );

      return response.data;
    } catch (err) {
      if (err.response.status !== 200) {
        console.error("Could not create your Item. Please try again.");
      }
      return rejectWithValue("request error");
    }
  }
);

export const editItem = createAsyncThunk(
  "items/itemsEdit",
  async (payload, { rejectWithValue }) => {
    try {
      const itemsUrl = `https://localhost:7265/api/${payload.route}`;
      const response = await axios.put(itemsUrl, 
        {
          id: payload.id,
          descricao: payload.description,
          preco: payload.price
        }
      );

      return response.data;
    } catch (err) {
      if (err.response.status !== 200) {
        console.error("Could not edit your Item. Please try again.");
      }
      return rejectWithValue("request error");
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/itemsDelete",
  async (payload, { rejectWithValue }) => {
    try {
      const itemsUrl = `https://localhost:7265/api/${payload.route}/(id)?id=${payload.id}`;
      const response = await axios.delete(itemsUrl);

      return response.data;
    } catch (err) {
      if (err.response.status !== 200) {
        console.error("Could not delete your Item. Please try again.");
      }
      return rejectWithValue("request error");
    }
  }
);