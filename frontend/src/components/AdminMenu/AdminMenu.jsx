import './AdminMenu.css'
import '../ModalPopup/ModalPopup.css'
import { Space, Table, Tag, Button } from 'antd';
import { LeftCircleOutlined, UserDeleteOutlined, EditFilled, FrownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { loadUsers, deleteUser, addFiles, removeFiles, clearFiles } from '../App/Slices/AdminSlice';
import { loadFiles } from '../App/Slices/FileSlice';
import { useEffect, useState } from 'react';
import { AdminCreateUser } from '../AdminCreateUser/AdminCreateUser';
import { ModalPopup } from '../ModalPopup/ModalPopup';
import { ModalPopupEditUser } from '../ModalPopupEditUser/ModalPopupEditUser';
import { AdminEditFilesUser } from '../AdminEditFilesUser/AdminEditFilesUser';
import folderOpen from '../../assets/folder_open.png';
import folderClosed from '../../assets/folder_closed.png';

export const AdminMenu = () => {
    const userParse = JSON.parse(sessionStorage.getItem('user'));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { Column, ColumnGroup } = Table;
    const users = useAppSelector(state => state.admin.users);
    const loading = useAppSelector(state => state.admin.loading);
    const getFiles = useAppSelector(state => state.admin.files);
    const [modalActive, setModalActive] = useState(false);
    const [user, setUser] = useState('');
    const [files, setFiles] = useState([]);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [activeMenuFiles, setActiveMenuFiles] = useState(false);

    useEffect(() => {
        dispatch(loadUsers());
        dispatch(loadFiles());
    }, [])

    const handleDeleteUser = (user) => {
        if (user.id === userParse.id) {
            dispatch(deleteUser(user.id))
                .then(() => {
                    sessionStorage.removeItem('user');
                    navigate('/mycloud');
                })
        } else {
            dispatch(deleteUser(user.id))
                .then(() => {
                    dispatch(loadUsers());
                })
            setModalActive(false)
        }
    }

    const handleAddIdFolder = (user) => {
        const file = getFiles.some((p) => p.id !== user.id)
        if (file) {
            dispatch(clearFiles())
            dispatch(addFiles(user))
            setActiveMenuFiles(true)  
        } else {
            dispatch(addFiles(user))
            setActiveMenuFiles(true) 
        } 
    }

    const handleRemoveIdFolder = (user) => {
        const file = getFiles.some((p) => p.id !== user.id)
        setActiveMenuFiles(false)
        if (!file) {
            dispatch(removeFiles(user.id))
            setActiveMenuFiles(false)
        }
    }

    const isClickFolder = (id) => {
        return getFiles.some(user => user.id === id);
    };

    return (
        <>
            {userParse?.is_staff &&
                <div className='form'>
                    <LeftCircleOutlined className="header_form" onClick={() => navigate('/user')} />
                    <h2 className="header_title">Кабинет администратора</h2>
                    {loading && <div className="card_loading">...Загружается</div>}
                    <AdminCreateUser />
                    <Table dataSource={users} >
                        {!loading && <ColumnGroup title="Пользователи">
                            <Column title="Логин" dataIndex="userlogin" key="userlogin" />
                            <Column title="Имя" dataIndex="username" key="username" />
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column
                                title="Права пользователя"
                                dataIndex="is_staff"
                                key="is_staff"
                                render={(is_staff) => {
                                    let color = 'volcano';
                                    let name = 'Администратор';
                                    if (is_staff === false) {
                                        color = 'green';
                                        name = 'Пользователь'
                                    }
                                    return (
                                        <Tag color={color}>
                                            {name}
                                        </Tag>
                                    )
                                }}
                            />
                            <Column
                                title="Количество файлов"
                                render={(user) => {
                                    let len = user.files.length;
                                    return (
                                        <Space size='large'>
                                            {len}
                                            {isClickFolder(user.id) ?
                                                <img className='folder_open_filed'
                                                    src={folderOpen}
                                                    onClick={() => { handleRemoveIdFolder(user); setFiles(user.files); setUser(user) }} /> :
                                                <img className='folder_open_filed'
                                                    src={folderClosed}
                                                    onClick={() => { handleAddIdFolder(user); setFiles(user.files); setUser(user) }} />
                                            }

                                        </Space>
                                    )
                                }}
                            />
                            <Column
                                title="Действия"
                                key="action"
                                render={(user) => (
                                    <Space size="middle" >
                                        <EditFilled
                                            className='edit_outlined'
                                            onClick={() => { setModalEditActive(true); setUser(user) }}
                                        />
                                        <UserDeleteOutlined
                                            className='user_delete_outlined'
                                            onClick={() => { setModalActive(true); setUser(user) }}
                                        />
                                    </Space>
                                )}
                            />
                        </ColumnGroup>}
                    </Table>
                </div>
            }
            {!userParse?.is_staff &&
                <>
                    <FrownOutlined className='admin_menu_auth_smile'/>
                    <h2>Необходимо войти в профиль с правами администратора!</h2>
                    <Button
                        size="md" onClick={() => navigate('/login')}>Войти
                    </Button>
                </>
            }

            {<ModalPopupEditUser active={modalEditActive} setModalActive={setModalEditActive} user={user} />}
            {userParse && <ModalPopup active={modalActive} setModalActive={setModalActive} user={user} handleDeleteUser={handleDeleteUser} />}
            {activeMenuFiles && <AdminEditFilesUser files={files} user={user} />}
        </>
    );
}
