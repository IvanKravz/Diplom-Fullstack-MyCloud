import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from 'react-use-cookie';

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
        try {
            const response = await fetch('http://127.0.0.1:8000/api/files', {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Ошибка загрузки файлов');
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
            var csrftoken = getCookie('csrftoken');
            const response = await fetch(`http://127.0.0.1:8000/api/files/${id}`, {
                credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
            })

            if (!response.ok) {
                throw new Error('Ошибка удаления');
            }

        } catch (error) {
            console.error(error)
        }
    }
);


export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async (formData) => {
        try {
            var csrftoken = getCookie('csrftoken');
            const response = await fetch(`http://127.0.0.1:8000/api/files/`, {
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Ошибка загрузки файла');
            }

        } catch (error) {
            console.error(error)
        }
    }
);

export const updateFile = createAsyncThunk(
    'file/updateFile',
    async ({ id, newFileName, newDescription, dateDownload }) => {
        try {
            var csrftoken = getCookie('csrftoken');
            const response = await fetch(`http://127.0.0.1:8000/api/files/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                method: 'PATCH',
                body: JSON.stringify({ filename: newFileName, description: newDescription, downloadTime: dateDownload }),
            })

            if (!response.ok) {
                throw new Error('Файл не изменен');
            }

        } catch (error) {
            console.error(error);
        }
    }
)

export const fileSlice = createSlice({
    name: 'file',
    initialState: initialFileState,
    reducers: {
        addFile(state, action) {
            if (!state.filesUser.some(file => action.payload.id === file.id)) {
                state.filesUser.push(action.payload)
            }
        },
        clearFiles(state) {
            state.filesUser = []
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
            .addCase(uploadFile.rejected, (state, action) => {
                state.success = false;
                state.error = action.error.message || 'Ошибка загрузки файла';
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.success = false;
                state.error = action.error.message || 'Ошибка удаления';
            });
    }
});

export const { addFile, clearFiles, addFilesSize } = fileSlice.actions;
export default fileSlice.reducer
