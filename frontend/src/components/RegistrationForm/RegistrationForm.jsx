import './RegistrationForm.css'
import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { login, register } from '../App/Slices/authSlice';

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
        navigate('/mycloud')
    };

    const submitRegister = async () => {
        const response = await dispatch(register({ userlogin, username, email, is_staff, password }))
        await dispatch(login({ username, password }))
        if (register.fulfilled.match(response)) {
            navigate('/mycloud/user')
        }
    }

    const handleSelect = (event) => {
        setStaff(event)
    }

    return (
        <div className='form_reg'>
            <div>
                <HomeOutlined className="header_form" onClick={handleGoBack} />
            </div>
            <h2 className="header_title">Регистрация</h2>

            <Form className='input_form' variant="filled">

                <Form.Item 
                    className='form_item'
                    name="InputLogin"
                    rules={[{ required: true, message: 'Введите логин!' }]}>
                    <Input
                        title="Разрешены латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                        pattern="^[A-Z][a-zA-Z0-9]{4,20}$"
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
                        onChange={handleSelect}>
                    </Select>
                   
                </Form.Item>

                <Form.Item 
                    className='form_item'
                    name="Cascader"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input
                        title="Разрешено не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ"
                        pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}"
                        allowClear
                        placeholder="Пароль" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                {/* <Form.Item >
                    <Upload  name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                    </Upload>
                </Form.Item> */}

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
