import React from 'react'
import './DownloadFile.css'
import { Input, Button } from 'antd';
import { useState, useRef } from 'react';
import { useAppDispatch } from '../App/hooks'
import { loadFiles, uploadFile } from '../App/Slices/FileSlice';

export const DownloadFile = () => {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef(null);
    const [filename, setFilename] = useState('')
    const [description, setDescription] = useState('');
    const [click, setClick] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const onOpen = () => {
        setClick(true)
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile && filename.length <= 10) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filename', filename);
            formData.append('description', description);
            formData.append('user', JSON.parse(sessionStorage.getItem('user')).id);
            dispatch(uploadFile(formData))
                .then(() => {
                    dispatch(loadFiles());
                    setSelectedFile(null);
                })
                .catch((error) => {
                    console.error('Ошибка загрузки файла:', error);
                });
        };

    }

    return (
        <>
            <div>
                {!click &&
                    <Button
                        onClick={onOpen}
                    >Загрузить файл
                    </Button>}
            </div>
            {click &&
                <>
                    <div className='upload_menu'>
                        <label className='upload_label' >
                            <img className='img_upload' src={require('../../assets/Upload.png')} alt="Загрузка файла" />
                            <input
                                className='input_upload'
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileInputChange} />
                        </label>
                        {selectedFile &&
                            <Button
                                onClick={handleUpload}
                            >Отправить файл
                            </Button>
                        }
                    </div>

                    {selectedFile &&
                        selectedFile.name
                    }
                    <section className='upload_file_menu'>
                        <div className='input_text'>
                            <Input className='input_file'
                                label='Имя файла'
                                placeholder={selectedFile ? selectedFile.name : "Имя файла до 10 знаков"}
                                allowClear
                                value={filename}
                                onChange={(e) => setFilename(e.target.value)}>
                            </Input>
                        </div>
                        <div className='input_text'>
                            <Input className='input_file'
                                label='Комментарий'
                                placeholder="Комментарий"
                                allowClear
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </Input>
                        </div>
                    </section>
                </>
            }
        </>
    )
}
