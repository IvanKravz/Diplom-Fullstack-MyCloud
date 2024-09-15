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

export const register = createAsyncThunk(
    'auth/register',
    async ({ userlogin, username, email, is_staff, password }) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userlogin,
                    username,
                    email,
                    is_staff,
                    password
                }),
            })

            if (!response.ok) {
                console.log(response)
                throw new Error('Неверные данные')
            }

            const data = await response.json()
            sessionStorage.setItem('user', JSON.stringify(data))
            return data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
);


export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                credentials: 'include',
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
);


export const logout = async () => {
    sessionStorage.removeItem('user')
    client.post(
        "/api/logout",
        { withCredentials: true, credentials: 'include' }
    )
};


export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${JSON.parse(sessionStorage.getItem('user')).id}`, {
                credentials: 'include',
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
);

export const userEdit = createAsyncThunk(
    'auth/userEdit',
    async ({ userlogin, username, email, password }) => {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${JSON.parse(sessionStorage.getItem('user')).id}/`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
            body: JSON.stringify({
                userlogin,
                username,
                email,
                password
            }),
        })

        if (!response.ok) {
            console.log(response)
            throw new Error('Неверные данные')
        }


        // const data = await response.json()
        // return data
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
            .addCase(login.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error.message;
                console.log('state.error', state.error)
            })
            .addCase(register.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});


export default authSlice.reducer