import './AdminMenu.css'
import { Space, Table, Tag } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

export const AdminMenu = () => {
    
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    };

    const { Column, ColumnGroup } = Table;
    const data = [
        {
            key: '1',
            login: 'John',
            name: 'Brown',
            email: 32,
            comments: 'New York No. 1 Lake Park',
            tags: ['Администратор'],
            fileLength: 0,
            fileSize: 0,
        },
        {
            key: '2',
            login: 'Jim',
            name: 'Green',
            email: 42,
            comments: 'London No. 1 Lake Park',
            tags: ['Пользователь'],
            fileLength: 0,
            fileSize: 0,
        },
    ];

    return (
        <div className='form'>
        <div>
            <HomeOutlined className="header_form" onClick={handleGoBack} />
        </div>
        <h2 className="header_title">Кабинет администратора</h2>
        <Table dataSource={data}>
            <ColumnGroup title="Пользователь">
                <Column title="Логин" dataIndex="login" key="login" />
                <Column title="Имя" dataIndex="name" key="name" />
            </ColumnGroup>
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Комментарий" dataIndex="comments" key="comments" />
            <Column
                title="Права пользователя"
                dataIndex="tags"
                key="tags"
                render={(tags) => (
                    <>
                        {tags.map((tag) => {
                            let color = 'green';
                            if (tag === 'Пользователь') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                )}
            />
            <Column 
                title="Количество файлов" 
                // dataIndex="fileLength" 
                key="fileLength"
                render={(record) => (
                    <Space size="middle">
                        {record.fileLength}
                        <a>Просмотр файлов</a>
                    </Space> 
                    )}
            />
            <Column title="Размер файлов" dataIndex="fileSize" key="fileSize" />
            <Column
                title="Действия"
                key="action"
                render={(record) => (
                    <Space size="middle">
                        <a>Изменить {record.lastName}</a>
                        <a>Удалить</a>
                    </Space>
                )}
            />
            
        </Table>
    </div>
    );
}
