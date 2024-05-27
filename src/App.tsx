import {Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout";
import MainPage from "./components/Pages/MainPage";
import StuffList from './features/users/StuffList';
import Login from "./features/auth/Login";
import OrdersList from "./features/orders/OrdersList";
import EditUser from "./features/users/EditUser";
import Prefetch from "./features/auth/Prefetch";
import NewUserForm from "./features/users/NewUserForm";


function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout />} >
            <Route path="login" element={<Login />} />

            <Route element={<Prefetch />}>
                <Route index element={<MainPage />}/>

                <Route path="stuff">
                    <Route index element={<StuffList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                </Route>

                <Route path="orders">
                    <Route index element={<OrdersList />} />
                </Route>

                <Route path="reviews">
                    <Route index element={<MainPage />} />
                </Route>
            </Route>

        </Route>
      </Routes>
  )
}

export default App
