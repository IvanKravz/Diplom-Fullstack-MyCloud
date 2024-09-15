import './AdminCreateUser.css'
import { Form, Input, Select } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createUser, loadUsers } from '../App/Slices/AdminSlice';
import { loginValidate, passwordValidate } from '../Validations/Validations'
import { useAppDispatch, useAppSelector } from '../App/hooks';

export const AdminCreateUser = () => {
    const dispatch = useAppDispatch();
    const [userlogin, setUserLogin] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [is_staff, setStaff] = useState(false);
    const [password, setPassword] = useState('');
    const error = useAppSelector(state => state.admin.error);
    const options = [
        { label: 'Пользователь', value: false },
        { label: 'Администратор', value: true },
    ];

    const submitCreateUser = async () => {
        const response = await dispatch(createUser({ userlogin, username, email, is_staff, password }))
        if (createUser.fulfilled.match(response)) {
            location.reload();
        }
    }

    const handleSelect = (event) => {
        setStaff(event)
    }

    return (
        <>
            {error}
            <Form className='input_create_form'>
                <Form.Item
                    className='form_input_item'
                    name="InputLogin"
                    rules={[{ required: true, message: 'Введите логин!' }]}>
                    <Input
                        title="Разрешены латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                        pattern={loginValidate}
                        allowClear
                        value={userlogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                        placeholder="Логин, латинские буквы и цифры"
                    />
                </Form.Item>

                <Form.Item
                    className='form_input_item'
                    name="InputName"
                    rules={[{ required: true, message: 'Введите имя!' }]}>
                    <Input
                        allowClear
                        placeholder="Имя"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    className='form_input_item'
                    rules={[{ required: true, message: 'Введите email!' }]}
                >
                    <Input
                        allowClear
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    className='form_input_item'
                    name="Select"
                    rules={[{ required: true, message: 'Выбрать пользователя!' }]}>
                    <Select
                        options={options}
                        placeholder="Выбрать пользователя"
                        onChange={handleSelect}>
                    </Select>

                </Form.Item>

                <Form.Item
                    className='form_input_item'
                    name="Cascader"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input
                        title="Разрешено не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ"
                        pattern={passwordValidate}
                        allowClear
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <UserAddOutlined
                    className='btn_create_user'
                    onClick={submitCreateUser}
                // style={{ cursor: 'pointer', fontSize: '23px', color: 'SeaGreen' }}
                />
                {/* <Button
                        htmlType="submit"
                        onClick={submitRegister}
                    >Добавить пользователя
                    </Button> */}
            </Form>
        </>
    )
}
