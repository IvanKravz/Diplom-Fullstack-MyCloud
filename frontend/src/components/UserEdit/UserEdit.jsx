import React from 'react'
import { Button, Form, Input } from 'antd';
import { regexLogin, regexPassword, regexEmail, loginText, loginPassword, loginEmail } from '../Validations/Validations'
import { userEditLogin, userEditName, userEditEmail, userEditPassword, getUser } from '../App/Slices/authSlice';
import { loadFiles } from '../App/Slices/FileSlice';
import { useAppDispatch } from '../App/hooks';
import { useState } from 'react';

export const UserEdit = ({ clickOff, setModalActive, user }) => {
    const dispatch = useAppDispatch();
    const [userlogin, setUserLogin] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeLogin, setActiveLogin] = useState(false);
    const [activeName, setActiveName] = useState(false);
    const [activeEmail, setActiveEmail] = useState(false);
    const [activePassword, setActivePassword] = useState(false);
    const [errInput, setErrorInput] = useState('');
    const regLogin = regexLogin.test(userlogin);
    const regEmail = regexEmail.test(email);
    const regPassword = regexPassword.test(password);

    const submitUserEditName = async (id) => {
        if (!username) return
        const response = await dispatch(userEditName({ id, username }))
        if (userEditName.fulfilled.match(response)) {
            dispatch(getUser());
            dispatch(loadFiles());
        }
    }

    const submitUserEditLogin = async (id) => {
        if (!userlogin) return
        if (regLogin) {
            const response = await dispatch(userEditLogin({ id, userlogin }))
            if (userEditLogin.fulfilled.match(response)) {
                dispatch(getUser());
                dispatch(loadFiles());
            }
        } else {
            setErrorInput(loginText)
        }
    }

    const submitUserEditEmail = async (id) => {
        if (!email) return
        if (regEmail) {
            const response = await dispatch(userEditEmail({ id, email }))
            if (userEditEmail.fulfilled.match(response)) {
                dispatch(getUser());
                dispatch(loadFiles());
            }
        } else {
            setErrorInput(loginEmail)
        }
    }

    const submitUserEditPassword = async (id) => {
        if (!password) return
        if (regPassword) {
            const response = await dispatch(userEditPassword({ id, password }))
            if (userEditPassword.fulfilled.match(response)) {
                dispatch(getUser());
                dispatch(loadFiles());
            }
        } else {
            setErrorInput(loginPassword)
        }
    }

    return (
        <Form className='input_form'>
            <Form.Item className='form_item'>
                <Input
                    allowClear
                    placeholder="Имя"
                    required
                    onClick={() => {setActiveName(true); setActiveLogin(false); setActiveEmail(false); setActivePassword(false)}}
                    onChange={(e) => setUserName(e.target.value)}
                />
                {activeName && <Button
                    onClick={() => submitUserEditName(user.id)}
                >Ок
                </Button>}
            </Form.Item>
            <Form.Item className='form_item'>
                <Input
                    title={loginText}
                    allowClear
                    required
                    onClick={() => {setActiveName(false); setActiveLogin(true); setActiveEmail(false); setActivePassword(false)}}
                    onChange={(e) => setUserLogin(e.target.value)}
                    placeholder="Логин латинскими буквами и цифрами"
                />
                {activeLogin && <Button
                    onClick={() => submitUserEditLogin(user.id)}
                >Ок
                </Button>}
            </Form.Item>
            <Form.Item className='form_item'>
                <Input
                    allowClear
                    type="email"
                    required
                    placeholder="Email"
                    onClick={() => {setActiveName(false); setActiveLogin(false); setActiveEmail(true); setActivePassword(false)}}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {activeEmail && <Button
                    onClick={() => submitUserEditEmail(user.id)}
                >Ок
                </Button>}
            </Form.Item>
            <Form.Item className='form_item'>
                <Input
                    title={loginPassword}
                    allowClear
                    required
                    placeholder="Пароль"
                    onClick={() => {setActiveName(false); setActiveLogin(false); setActiveEmail(false); setActivePassword(true)}}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                {activePassword && <Button
                    onClick={() => submitUserEditPassword(user.id)}
                >Ок
                </Button>}
            </Form.Item>
            {errInput}
            <div className='btn_edit_user'>
                <Button className='btn_modal'
                    onClick={clickOff}
                >Отмена
                </Button>
                <Button
                    className='btn_delete_user'
                    onClick={() => { setModalActive(true) }}
                >Удалить профиль
                </Button>
            </div>
        </Form>
    )
}
