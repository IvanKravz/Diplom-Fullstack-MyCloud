import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { StartMenu } from './components/StartMenu'
import { LoginForm } from './components/LoginForm/LoginForm'
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm'
import './App.css'
import { AdminMenu } from './components/AdminMenu/AdminMenu'
import { UserMenu } from './components/UserMenu/UserMenu'
import { NotFound } from './components/NotFound/NotFound'

function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='/mycloud' element={<StartMenu/>}/>
        <Route path='mycloud/login' element={<LoginForm/>}/>
        <Route path='mycloud/reg' element={<RegistrationForm/>}/>
        <Route path='mycloud/admin' element={<AdminMenu/>}/>
        <Route path='mycloud/user' element={<UserMenu/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={routes} />
  )
}

export default App
