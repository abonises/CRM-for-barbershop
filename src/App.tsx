import {Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout";
import MainPage from "./components/Pages/MainPage";
import StuffList from './features/users/StuffList';
import Login from "./features/auth/Login";
import OrdersList from "./features/orders/OrdersList";
import EditUser from "./features/users/EditUser";
import Prefetch from "./features/auth/Prefetch";
import NewUserForm from "./features/users/NewUserForm";
import EditOrder from "./features/orders/EditOrder";
import NewOrder from "./features/orders/NewOrder";
import ReviewsList from "./features/reviews/ReviewsList";
import EditReview from "./features/reviews/EditReview";
import PersistLogin from "./features/auth/PersistLogin";
import { ROLES } from './config/roles'
import RequireAuth from "./features/auth/RequireAuth";


function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout />} >
            <Route path="login" element={<Login />} />

            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
                    <Route element={<Prefetch />}>
                        <Route index element={<MainPage />}/>

                        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>
                            <Route path="stuff">
                                <Route index element={<StuffList />} />
                                <Route path=":id" element={<EditUser />} />
                                <Route path="new" element={<NewUserForm />} />
                            </Route>
                        </Route>

                        <Route path="orders">
                            <Route index element={<OrdersList />} />
                            <Route path=":id" element={<EditOrder />} />
                            <Route path="new" element={<NewOrder/>}/>
                        </Route>

                        <Route path="reviews">
                            <Route index element={<ReviewsList />} />
                            <Route path=":id" element={<EditReview />} />
                        </Route>
                    </Route>
                </Route>
            </Route>

        </Route>
      </Routes>
  )
}

export default App
