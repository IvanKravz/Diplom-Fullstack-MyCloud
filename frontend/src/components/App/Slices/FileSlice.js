import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialFileState = {
    files: [],
    filesUser: [],
    loading: false,
    error: null,
    success: null,
};


export const loadFiles = createAsyncThunk(
    'file/loadFiles',
    async () => {
        const user = JSON.parse(sessionStorage.getItem('user'))

        if (!user) {
            throw new Error()
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/files', {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Ошибка данных');
            }

            const data = response.json()
            return data

        } catch (error) {
            console.error(error)
        }
    }
);

export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/files/${id}`, {
                // credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Ошибка данных');
            }

        } catch (error) {
            console.error(error)
        }
    }
);


export const fileSlice = createSlice({
    name: 'file',
    initialState: initialFileState,
    reducers: {
        addFile(state, action) {
            if (!state.filesUser.some(file => action.payload.id === file.id)) {
                state.filesUser.push(action.payload)
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить файл';
            })
            .addCase(loadFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.success = false;
                state.error = action.error.message || 'Ошибка удаления';
            });
    }
});

export const { addFile } = fileSlice.actions;
export default fileSlice.reducer