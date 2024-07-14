import './RegistrationForm.css'
import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

export const RegistrationForm = () => {

    const options = [
        { label: 'Пользователь', value: 1 },
        { label: 'Администратор', value: 2 },
    ];

    const navigate = useNavigate();

    // const [form] = Form.useForm();

    // const onReset = () => {
    //     form.resetFields();
    // };

    const handleGoBack = () => {
        navigate(-1)
    };

    return (
        //  <form className='form' /* action={handleFormAction} */> 
        //     <h2>Вход в аккаунт</h2>
        //     <input type="text" name="username" placeholder="Имя"/>
        //     <input type="password" name="password" placeholder="Пароль"/>
        //     <button>Вход</button>
        // </form>
        <div className='form_reg'>
            <div>
                <HomeOutlined className="header_form" onClick={handleGoBack} />
            </div>
            <h2 className="header_title">Регистрация</h2>

            <Form className='input_form' variant="filled">

                <Form.Item className='form_item'

                    name="InputLogin"
                    rules={[{ required: true, message: 'Введите логин!' }]}>
                    <Input
                        title="Разрешены латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                        pattern="^[A-Z][a-zA-Z0-9]{4,20}$"
                        allowClear
                        placeholder="Логин латинскими буквами и цифрами" />
                </Form.Item>

                <Form.Item className='form_item'
                    name="InputName"
                    rules={[{ required: true, message: 'Введите имя!' }]}>
                    <Input allowClear placeholder="Имя" />
                </Form.Item>

                <Form.Item className='form_item'
                    name="TextArea"
                >
                    <Input.TextArea allowClear placeholder="Комментарий" />
                </Form.Item>

                <Form.Item className='form_item'
                    rules={[{ required: true, message: 'Введите email!' }]}
                >
                    <Input allowClear type="email" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    className='form_item'
                    name="Select"
                    rules={[{ required: true, message: 'Выбрать пользователя!' }]}>
                    <Select options={options} placeholder="Выбрать пользователя" />
                </Form.Item>

                <Form.Item className='form_item'
                    name="Cascader"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input
                        title="Разрешено не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ"
                        pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}"
                        allowClear
                        placeholder="Пароль" />
                </Form.Item>

                <Form.Item >
                    <Upload  name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        className="btn_reg"
                        type="primary"
                        htmlType="submit">
                        Зарегистрировать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
