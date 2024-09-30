import React from 'react';
import './UserMenu.css'
import { Button } from 'antd';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../App/hooks'
import { getUser, logout } from '../App/Slices/authSlice';
import { loadFiles, clearFiles } from '../App/Slices/FileSlice';
import { File } from '../File/File'
import { Loading } from '../Loading/Loading'
import { DownloadFile } from '../DownloadFile/DownloadFile';
import { getReadableFileSizeString, getSize } from '../Validations/Validations';
import { UserEdit } from '../UserEdit/UserEdit';
import { ModalPopup } from '../ModalPopup/ModalPopup';
import { deleteUser } from '../App/Slices/AdminSlice';

export const UserMenu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const userParse = JSON.parse(sessionStorage.getItem('user'));
    const files = useAppSelector(state => state.file.files)
    const filesUser = useAppSelector(state => state.file.filesUser)
    const loading = useAppSelector(state => state.file.loading);
    const error = useAppSelector(state => state.file.error);
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        dispatch(loadFiles());
        dispatch(getUser());
    }, []);

    const submitLogout = async () => {
        await dispatch(logout);
        dispatch(clearFiles())
        navigate('/mycloud');
    }

    const clickOff = () => {
        setClick(false)
    }

    const handleDeleteUser = (user) => {
        dispatch(deleteUser(user.id))
            .then(() => {
                sessionStorage.removeItem('user');
                navigate('/mycloud');
            })
    }

    return (
        <>
            {userParse &&
                <>
                    <div className='user_header'>
                        <div className='user_header_text'>MyCloud</div>
                        <img className='user_cloud_image' src={require('../../assets/cloud.png')} />
                    </div>
                    <div className='user_header'>
                        <div className='user_header_text_cab'>Личный кабинет</div>
                        <div className='card_user_btn'>
                            {user['is_staff'] &&
                                <Button
                                    variant="primary"
                                    onClick={() => navigate('/mycloud/user/admin')}
                                >Кабинет администратора
                                </Button>
                            }
                            <Button
                                variant="primary"
                                onClick={submitLogout}
                            >Выход
                            </Button>
                        </div>
                    </div>
                    <div className='upload_header'>
                        {loading && <Loading className='card_load' />}
                        {!loading && <DownloadFile />}
                        <h3>{error}</h3>
                    </div>
                    {!loading &&
                        <section className='user_menu'>
                            <Card className='card_user'>
                                {user['is_staff'] &&
                                    <Card.Img className='card_user'
                                        variant="top"
                                        src={require('../../assets/Mandalorec.png')}
                                    />
                                }
                                {!user['is_staff'] &&
                                    <Card.Img className='card_user'
                                        variant="top"
                                        src={require('../../assets/Grogu.png')}
                                    />
                                }
                                <Card.Body className='card_user_text'>
                                    <div>Имя: {user.username}</div>
                                    <div>Логин: {user.userlogin}</div>
                                    <div>Почта: {user.email}</div>
                                    <div>Количество файлов: {filesUser.length}</div>
                                    <div>Общий размер файлов: {getSize(filesUser)}</div>
                                    {!click && <Button variant="primary" onClick={() => setClick(true)}>Редактировать профиль </Button>}
                                </Card.Body>
                                {click && <UserEdit clickOff={clickOff} setModalActive={setModalActive} user={user} />}
                            </Card>
                            <div className='list_content'>
                                {files?.map((file) => {
                                    if (file.user === userParse.id) {
                                        return (
                                            <File key={file.id} fileItem={file} fileSize={getReadableFileSizeString} />
                                        )
                                    }
                                })}
                            </div>
                        </section>
                    }
                </>
            }
            {!userParse &&
                <>
                    <h2>Необходимо войти в профиль!</h2>
                    <Button size="md" onClick={() => navigate('/mycloud/login')}>Войти </Button>
                </>
            }
            {<ModalPopup active={modalActive} setModalActive={setModalActive} user={user} handleDeleteUser={handleDeleteUser} />}
        </>
    )
}
