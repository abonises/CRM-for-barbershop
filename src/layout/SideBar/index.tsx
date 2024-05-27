import {useState} from "react";
import {NavLink, Link } from "react-router-dom";
import './index.scss'
import { TiScissors } from "react-icons/ti";
import { tabsArray } from '../../../public/data/data.ts'
import cn from 'classnames'
import {RxDashboard} from "react-icons/rx";
import { MdLogin } from "react-icons/md";

export default function Navigator() {
    const [activeTab, setActiveTab] = useState(true);


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
                </nav>
            </header>
        </section>
    );
}