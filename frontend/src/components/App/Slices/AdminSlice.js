import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialAdminState = {
    users: [],
    files: [],
    loading: false,
    error: null,
};

export const loadUsers = createAsyncThunk (
    'admin/loadUsers',
    async () => {
        const response = await fetch('http://127.0.0.1:8000/api/users/', {
            // credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    
        if (!response.ok) {
            throw new Error('Ошибка данных');
        }

        const data = await response.json();
        return data
    }
)

export const deleteUser = createAsyncThunk (
    'admin/deleteUser',
    async (userId) => {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка данных');
        }

        const data = await response.json();
        return data
    }
)

export const createUser = createAsyncThunk (
    'admin/createUser',
    async ({ userlogin, username, email, password, is_staff }) => {
        const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
)


export const adminSlice = createSlice({
    name: 'admin',
    initialState: initialAdminState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            // .addCase(deleteUser.fulfilled, (state, action) => {
            //     state.users = action.payload;
            // })
            // .addCase(loadUsers.fulfilled, (state, action) => {
            //     state.files = action.payload;
            // })
    }      
})

export default adminSlice.reducer