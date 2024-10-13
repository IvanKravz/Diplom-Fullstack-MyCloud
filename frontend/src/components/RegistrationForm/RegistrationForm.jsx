import './RegistrationForm.css'
import { Button, Form, Input, Select } from 'antd';
import { useAppDispatch } from '../App/hooks';
import { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { login, register } from '../App/Slices/authSlice';
import { loginValidate, passwordValidate } from '../Validations/Validations'

export const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userlogin, setUserLogin] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [is_staff, setStaff] = useState(false);
    const [password, setPassword] = useState('');
    const options = [
        { label: 'Пользователь', value: false },
        { label: 'Администратор', value: true },
    ];

    const handleGoBack = () => {
        navigate('/')
    };

    const submitRegister = async () => {
        const response = await dispatch(register({ userlogin, username, email, is_staff, password }))
        if (register.fulfilled.match(response)) {
            await dispatch(login({ username, password }))
            navigate('/')
        }
    }

    return (
        <div className='form_reg'>
            <HomeOutlined className="header_form" onClick={handleGoBack} />
            <h2 className="header_title">Регистрация</h2>

            <Form className='input_form'>

                <Form.Item
                    className='form_item'
                    name="InputLogin"
                    rules={[{ required: true, message: 'Введите логин!' }]}>
                    <Input
                        title="Разрешены латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                        pattern={loginValidate}
                        allowClear
                        value={userlogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                        placeholder="Логин латинскими буквами и цифрами"
                    />
                </Form.Item>

                <Form.Item
                    className='form_item'
                    name="InputName"
                    rules={[{ required: true, message: 'Введите имя!' }]}>
                    <Input
                        allowClear
                        placeholder="Имя"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Item>

                <Form.Item className='form_item'
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
                    className='form_item'
                    name="Select"
                    rules={[{ required: true, message: 'Выбрать пользователя!' }]}>
                    <Select
                        options={options}
                        placeholder="Выбрать пользователя"
                        onChange={(event) => setStaff(event)}>
                    </Select>

                </Form.Item>

                <Form.Item
                    className='form_item'
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

                <Form.Item>
                    <Button
                        className="btn_reg"
                        type="primary"
                        htmlType="submit"
                        onClick={submitRegister}
                    >Зарегистрировать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
