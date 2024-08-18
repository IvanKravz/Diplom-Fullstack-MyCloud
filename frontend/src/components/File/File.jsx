import React from 'react'
import Card from 'react-bootstrap/Card';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { addFile, deleteFile, loadFiles, updateFile } from '../App/Slices/FileSlice';
import { useAppDispatch } from '../App/hooks'
import './File.css'
import TextArea from 'antd/es/input/TextArea';

import { saveAs } from 'file-saver'

export const File = ({ fileItem, fileSize }) => {
    const { id, file, filename, size, upload_time, downloadTime, description, link } = fileItem

    const dispatch = useAppDispatch();
    const [newFile, setNewFile] = useState(null)
    const [newFileName, setNewFilename] = useState(null)
    const [newDescription, setNewDescription] = useState(null);
    const [click, setClick] = useState(false);
    const [clickComments, setClickComments] = useState(false);
    const isValid = /\.(png|svg|jpg|jpeg|gif)$/i.test(link);

    function get_url(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }

    useEffect(() => {
        dispatch(addFile(fileItem))
    }, []);

    const downloadDate = ({ id, file, link }) => {
        saveAs(file)
        const dateDownload = new Date().toLocaleString()
        dispatch(updateFile({ id:id, dateDownload: dateDownload }))
            .then(() => {
                dispatch(loadFiles());
            })
            .catch((error) => {
                console.error('Ошибка изменения файла:', error);
            });
    }

    const submitDelete = (id) => {
        dispatch(deleteFile(id))
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }

    const handleUpdateFile = ({ id, newFileName = filename, newDescription }) => {

        if (newFileName.length <= 10) {
            dispatch(updateFile({ id: id, newFileName: newFileName, newDescription: newDescription }))
                .then(() => {
                    dispatch(loadFiles());
                })
                .catch((error) => {
                    console.error('Ошибка изменения файла:', error);
                });
        }
        setClick(false);

    }

    return (
        <Card className='card_file'>
            <div className='card_img'>
                {!click &&
                    <>
                        {filename}.{get_url(file)}
                    </>
                }
                {click &&
                    <>
                        <Input className='input_update_file'
                            label='Имя файла'
                            allowClear
                            required
                            // value={filename}
                            onChange={(e) => setNewFilename(e.target.value)}
                        >
                        </Input>
                    </>
                }
                <a href={file}>
                    {isValid && <Card.Img className='card_file_img'
                        variant="top"
                        src={link}
                    />}
                    {!isValid && <Card.Img className='card_file_img'
                        variant="top"
                        src={require('../../assets/notFoto.jpg')}
                    />}
                </a>
            </div>
            <Card.Body className='card_text_file'>
                <Card.Text>Размер файла: {fileSize({ size })}</Card.Text>
                <Card.Text>Дата загрузки файла: {upload_time}</Card.Text>
                <Card.Text>Дата последнего скачивания: {downloadTime}</Card.Text>

                {!clickComments && <Card.Text
                    className='card_text_comment'
                    onClick={() => setClickComments(true)}>
                    Комментарий: {description}
                </Card.Text>
                }
                {clickComments &&
                    <>
                        <Card.Text
                            className='card_text_comment'
                        > Комментарий: {
                                <TextArea
                                    className='input_text_file'
                                    label='Имя файла'
                                    allowClear
                                    defaultValue={description}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                >
                                </TextArea>}

                        </Card.Text>
                        <div className='btn_comments'>
                            <Button
                                onClick={() => handleUpdateFile({ id, newDescription })}
                            >&#x2713;
                            </Button>
                            <Button                                
                                onClick={() => setClickComments(false)}
                            >&#x2715;
                            </Button>
                        </div>
                    </>
                }

            </Card.Body>
            <div className='btn_card_file'>
                <Button
                    className='btn_upload'
                    variant="primary"
                    onClick={() => downloadDate({ id, file, link })}
                >Скачать
                </Button>
                <Button
                    variant="primary"
                    onClick={() => submitDelete(id)}
                >Удалить
                </Button>
                {!click &&
                    <Button
                        variant="primary"
                        onClick={() => setClick(true)}
                    >Переименовать
                    </Button>
                }
                {click &&
                    <>
                        <Button
                            variant="primary"
                            onClick={() => handleUpdateFile({ id, newFileName })}
                        >ОК
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setClick(false)}
                        >Отмена
                        </Button>
                    </>
                }
            </div>
        </Card>
    )
}
