import './AdminMenu.css'
import '../ModalPopup/ModalPopup.css'
import { Space, Table, Tag, Button} from 'antd';
import { LeftCircleOutlined, UserDeleteOutlined, EditOutlined, FolderOpenFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { loadUsers, deleteUser } from '../App/Slices/AdminSlice';
import { loadFiles } from '../App/Slices/FileSlice';
import { useEffect, useState } from 'react';
import { AdminCreateUser } from '../AdminCreateUser/AdminCreateUser';
import { ModalPopup } from '../ModalPopup/ModalPopup';
import { ModalPopupEditUser } from '../ModalPopupEditUser/ModalPopupEditUser';
// import { AdminEditFilesUser } from '../AdminEditFilesUser/AdminEditFilesUser';

export const AdminMenu = () => {

    const userParse = JSON.parse(sessionStorage.getItem('user'));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { Column, ColumnGroup } = Table;
    const users = useAppSelector(state => state.admin.users);
    const loading = useAppSelector(state => state.admin.loading);
    const [modalActive, setModalActive] = useState(false);
    const [user, setUser] = useState('');
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(false);
    const [modalEditActive, setModalEditActive] = useState(false);

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
    
    console.log(users)
    return (
        <>
            {userParse?.is_staff &&
                <div className='form'>
                    <LeftCircleOutlined className="header_form" onClick={() => navigate('/mycloud/user')} />
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
                                dataIndex="files"
                                key="files"
                                render={(files) => {
                                    // console.log(files)
                                    let len = files.length;
                                    return (
                                        <Space size='large'>
                                            {len}
                                            <FolderOpenFilled 
                                                className='folder_open_filed'
                                                onClick={() => { setActiveFile(true); setFiles(files) }}/>
                                        </Space>
                                    )
                                }}
                            />
                            <Column
                                title="Действия"
                                key="action"
                                render={(user) => (
                                    <Space size="middle" >
                                        <EditOutlined
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
                    <h2>Необходимо войти в профиль с правами администратора!</h2>
                    <Button
                        size="md" onClick={() => navigate('/mycloud/login')}>Войти
                    </Button>
                </>
            }

            {<ModalPopupEditUser active={modalEditActive} setModalActive={setModalEditActive} user={user} />}
            {userParse && <ModalPopup active={modalActive} setModalActive={setModalActive} user={user} handleDeleteUser={handleDeleteUser} />}
            {/* {<AdminEditFilesUser files={files} />} */}
        </>
    );
}
