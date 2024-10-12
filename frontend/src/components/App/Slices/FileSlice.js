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
            const response = await fetch('http://127.0.0.1:8000/api/files', {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                console.log('Файлы отсутствуют');
            }

            const data = response.json()
            return data
    }
);


export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/files/${id}`, {
                credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
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
            const response = await fetch(`http://127.0.0.1:8000/api/files/`, {
                headers: {
                    'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
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
            const response = await fetch(`http://127.0.0.1:8000/api/files/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + JSON.parse(sessionStorage.getItem('user')).token,
                },
                method: 'PATCH',
                body: JSON.stringify({ filename: newFileName, description: newDescription, downloadTime: dateDownload }),
            })

            if (!response.ok) {
                throw new Error('Файл с таким именем уже существует!');
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
            })
            .addCase(updateFile.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateFile.fulfilled, (state) => {
                state.error = null;
            });
    }
});

export const { addFile, clearFiles, addFilesSize } = fileSlice.actions;
export default fileSlice.reducer
