import { Outlet} from 'react-router';
import SideBar from '../SideBar'
import './index.scss'

const Index = () => {
    return (
        <main className={'main-wrapper'}>
            <SideBar />
            <div className={'content-wrapper'}>
                <Outlet />
            </div>
        </main>
    );
};

export default Index;