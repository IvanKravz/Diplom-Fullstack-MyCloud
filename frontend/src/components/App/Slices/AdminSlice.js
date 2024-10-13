import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from '../../Validations/Validations'


const initialAdminState = {
    users: [],
    files: [],
    loading: false,
    error: null,
};

export const loadUsers = createAsyncThunk(
    'admin/loadUsers',
    async () => {
        const response = await fetch(`${apiUrl}/users/`, {
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
        return data
    }
)

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId) => {
        const response = await fetch(`${apiUrl}/users/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка данных');
        }

        const data = await response.json();
        return data
    }
)

export const createUser = createAsyncThunk(
    'admin/createUser',
    async ({ userlogin, username, email, is_staff, password, files=[] }) => {
        const response = await fetch(`${apiUrl}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
            },
            body: JSON.stringify({ userlogin, username, email, is_staff, password, files })
        });

        if (!response.ok) {
            const massage = await response.json().then((data) => {
                let errName
                let errLogin
                let errEmail
                if (!data['username']) {
                    errName = ''
                } else {
                    errName = String(data['username'])
                }
                if (!data['userlogin']) {
                    errLogin = ''
                }
                else {
                    errLogin = String(data['userlogin'])
                }
                if (!data['email']) {
                    errEmail = ''
                } else {
                    errEmail = String(data['email'])
                }

                const error =
                    `${errName.replace(/.$/, "!").toUpperCase()} 
                    ${errLogin.replace(/.$/, "!").toUpperCase()}  
                    ${errEmail.replace(/.$/, "!").toUpperCase()}`

                return error
            })
            throw new Error(massage)
        }

        const data = await response.json();
        return data
    }
)

export const adminSlice = createSlice({
    name: 'admin',
    initialState: initialAdminState,
    reducers: (create)=> ({
        addFiles: create.reducer((state, action) => {
            state.files.push(action.payload)
        }),
        removeFiles: create.reducer((state, action) => {
            state.files = state.files.filter((p) => p.id !== action.payload)
        }),
        clearFiles: create.reducer((state) => {
            state.files = []
        }),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})

export default adminSlice.reducer
export const { addFiles, removeFiles, clearFiles } = adminSlice.actions;