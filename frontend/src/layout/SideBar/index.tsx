import {useEffect, useState} from "react";
import {NavLink, Link } from "react-router-dom";
import './index.scss'
import { TiScissors } from "react-icons/ti";
import { tabsArray } from '../../../public/data/data.ts'
import cn from 'classnames'
import {RxDashboard} from "react-icons/rx";
import { MdLogin } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import {CustomError} from "../../models/models.ts";
import { MdLogout } from "react-icons/md";


export default function Navigator() {
    const [activeTab, setActiveTab] = useState(true);

    const {username, status} = useAuth()

    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {(error as CustomError).data?.message}</p>


    const logoutButton = (
        <button
            className={'logout-button'}
            title="Logout"
            onClick={sendLogout}
        >
            <MdLogout className='icons'/> Logout
        </button>
    )

    return (
        <section className='side-bar'>
            <header>
                <nav>
                    <div className='logo-main-page'>
                        <NavLink className='nav-link' to='/'>
                            <TiScissors className='icons'/>BarberShop CRM
                        </NavLink>
                    </div>
                    <div className='tabs'>
                        <NavLink onClick={() => setActiveTab(true)} className={cn('nav-link', activeTab || 'active')}
                                 to='/'><RxDashboard className='icons'/>Main</NavLink>
                        {tabsArray.map(({id, title, icon: Icon}) => (
                            <NavLink key={id} onClick={() => setActiveTab(true)}
                                     className={cn('nav-link', activeTab || 'active')} to={title.toLowerCase()}><Icon
                                className='icons'/>{title}</NavLink>
                        ))}
                        <Link className={cn('nav-link', activeTab || 'active')} to="login"><MdLogin className='icons'/>Sign In</Link>
                    </div>
                    {logoutButton}
                    <div className='user-info'>
                        <p>User: {username}</p>
                        <p>Status: {status}</p>
                    </div>
                </nav>
            </header>
        </section>
    );
}