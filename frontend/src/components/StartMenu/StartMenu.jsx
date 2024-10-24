import './StartMenu.css'
import { Button } from 'antd';
import { Link } from "react-router-dom";
import cloud from '../../assets/cloud.png';
import files from '../../assets/files.jpg';

export const StartMenu = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  return (
    <>
      <div className='menu'>
        <div>
          <div className='menu_title'>Сохраняйте важные файлы в MyCloud </div>
          <h4 className='menu_text'>Загрузите в MyCloud свои файлы.
            Пользуйтесь приложением чтобы сохранить все самое необходимое</h4>
        </div>
        <img className='menu_image' src={cloud} />
      </div>
      <div className='menu_button'>

        {!user &&
          <Link className='login' to='/login'>
            <Button className='login_btn'>Войти</Button>
          </Link>
        }
        {user &&
          <Link className='login' to='/user'>
            <Button className='login_btn'>Войти как {user.username}</Button>
          </Link>
        }
        <Link className='login' to='/reg'>
          <Button className='auth_btn'>Регистрация</Button>
        </Link>
      </div>
      <div className='menu_info'>
        <h2 className='text_info'>Приложение для хранения всех данных</h2>
        <h4 className='text_info'>Используйте MyCloud для хранения фотографий, видеозаписей и файлов</h4>
        <img className='menu_info_image' src={files} />
      </div>
    </>
  )
}
