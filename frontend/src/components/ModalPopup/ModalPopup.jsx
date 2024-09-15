import React from 'react'
import './ModalPopup.css'
import { Button } from 'antd';

export const ModalPopup = ({ active, setModalActive, user, handleDeleteUser, fileDelete, handleDeleteFile }) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
      <div className={active ? 'modal_content active' : 'modal_content'} onClick={e => e.stopPropagation()}>
        {user &&
          <>
            <h3>Действительно вы хотите удалить пользователя {user.username}? </h3>
            <div className='btn_edit_user'>
              <Button
                onClick={() => handleDeleteUser(user)}
              >Да
              </Button>
              <Button
                onClick={() => setModalActive(false)}
              >Нет
              </Button>
            </div>
          </>
        }

        {fileDelete &&
          <>
            <h3>Действительно вы хотите удалить файл {fileDelete.filename}? </h3>
            <div className='btn_edit_user'>
              <Button
                onClick={() => handleDeleteFile(fileDelete)}
              >Да
              </Button>
              <Button
                onClick={() => setModalActive(false)}
              >Нет
              </Button>
            </div>
          </>}

      </div>
    </div>
  )
}
