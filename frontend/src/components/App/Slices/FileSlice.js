import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialFileState = {
    files: [],
    loading: false,
    error: null,
    success: null,
};
