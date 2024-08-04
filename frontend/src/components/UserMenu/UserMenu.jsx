import React from 'react';
import './UserMenu.css'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../App/hooks'
import { getUser, logout } from '../App/Slices/authSlice';
import { loadFiles } from '../App/Slices/FileSlice';
import { File } from '../File/File'
import { Loading } from '../Loading/Loading'

export const UserMenu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const files = useAppSelector(state => state.file.files)
    const filesUser = useAppSelector(state => state.file.filesUser)
    const loading = useAppSelector(state => state.file.loading);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadFiles());
        dispatch(getUser());
    }, []);

    const getCardFilm = async () => {
        console.log(files)
    }

    const submitLogout = async () => {
        await dispatch(logout);
        navigate('/mycloud');
    }

    return (
        <>
            <div className='user_header'>
                <div className='user_header_text'>Личный кабинет</div>
                <img className='user_cloud_image' src='src\assets\cloud.png' />
                <div className='card_user_btn'>
                    {user['is_staff'] &&
                        <Button
                            variant="primary"
                        // onClick={submitLogout}
                        >Кабинет администратора
                        </Button>}

                    <Button
                        variant="primary"
                        onClick={submitLogout}
                    >Выход
                    </Button>
                </div>
            </div>
            <Upload >
                {loading && <Loading className='card_load' />}
                {!loading && <Button className='upload_btn' icon={<UploadOutlined />}>Загрузить файл</Button>}
            </Upload>

            {user && <section className='user_menu'>
                <Card className='card_user'>
                    <Card.Img className='card_user'
                        onClick={() => getCardFilm()}
                        variant="top"
                        src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
                    />
                    <Card.Body className='card_user_text'>
                        <Card.Title>Имя: {user.username}</Card.Title>
                        <Card.Title>Логин: {user.userlogin}</Card.Title>
                        <Card.Title>Почта: {user.email}</Card.Title>
                        <Card.Text>Количество файлов: {filesUser.length}</Card.Text>
                        <Card.Text>Общий размер файлов: 'FFFF'</Card.Text>
                    </Card.Body>
                </Card>
                <div className='list_content'>
                    {files.map((file) => {
                        if (file.user === JSON.parse(sessionStorage.getItem('user')).id) {
                            return (
                                <File key={file.id} fileItem={file} />
                            )
                        }
                    })}
                </div>
            </section>}
        </>
    )
}


