import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

const initialAuthState = {
    user: {},
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                throw new Error('Ошибка данных');
            }

            const data = await response.json();
            sessionStorage.setItem('user', JSON.stringify(data));
            return data
        } catch (error) {
            throw error;
        }
    }
)


export const logout = () => {
    sessionStorage.removeItem('user')
    client.post(
        "/api/logout",
        { withCredentials: true }
    )
}
       

export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${JSON.parse(sessionStorage.getItem('user')).id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Ошибка данных');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            throw error;
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message || 'Вход в систему не удался';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                console.log('state.user', state.user)
            })
    }
})


export default authSlice.reducer