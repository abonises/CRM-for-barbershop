import {useEffect, useState} from "react";
import {NavLink, Link } from "react-router-dom";
import './index.scss'
import { TiScissors } from "react-icons/ti";
import { tabsArray } from '../../../public/data/data.ts'
import cn from 'classnames'
import {RxDashboard} from "react-icons/rx";
import { MdLogin } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import {CustomError} from "../../models/models.ts";


export default function Navigator() {
    const [activeTab, setActiveTab] = useState(true);

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
            title="Logout"
            onClick={sendLogout}
        >
            logout
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
                        {logoutButton}
                    </div>
                </nav>
            </header>
        </section>
    );
}