import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { apiUrl } from '../../Validations/Validations'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: apiUrl
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
            const response = await fetch(`${apiUrl}/register`, {
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
            const response = await fetch(`${apiUrl}/login`, {
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
        "/logout",
        { withCredentials: true, credentials: 'include' }
    )
};


export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const response = await fetch(`${apiUrl}/users/${JSON.parse(sessionStorage.getItem('user')).id}`, {
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

export const userEditName = createAsyncThunk(
    'auth/userEditName',
    async ({ id, username}) => {
        const response = await fetch(`${apiUrl}/users/${id}/`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
            body: JSON.stringify({
                username
            }),
        })

        if (!response.ok) {
            console.log(response)
            throw new Error('Неверные данные')
        }
    }
)

export const userEditLogin = createAsyncThunk(
    'auth/userEditLogin',
    async ({ id, userlogin}) => {
        const response = await fetch(`${apiUrl}/users/${id}/`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
            body: JSON.stringify({
                userlogin
            }),
        })

        if (!response.ok) {
            console.log(response)
            throw new Error('Неверные данные')
        }
    }
)

export const userEditEmail = createAsyncThunk(
    'auth/userEditEmail',
    async ({ id, email}) => {
        const response = await fetch(`${apiUrl}/users/${id}/`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
            body: JSON.stringify({
                email
            }),
        })

        if (!response.ok) {
            console.log(response)
            throw new Error('Неверные данные')
        }
    }
)

export const userEditPassword = createAsyncThunk(
    'auth/userEditPassword',
    async ({ id, password}) => {
        const response = await fetch(`${apiUrl}/users/${id}/`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
            body: JSON.stringify({
                password
            }),
        })

        if (!response.ok) {
            console.log(response)
            throw new Error('Неверные данные')
        }
    }
)

export const userEditStaff = createAsyncThunk(
    'auth/userEdit',
    async ({ id, is_staff }) => {
        const response = await fetch(`${apiUrl}/users/${id}/`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
            body: JSON.stringify({
                is_staff
            }),
        })

        if (!response.ok) {
            console.log(response)
            throw new Error('Неверные данные')
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
            .addCase(login.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error.message;
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