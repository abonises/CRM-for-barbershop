import './index.scss'
import {GoStarFill} from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineReviews } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";

const Index = () => {





    return (
        <section className='main-page'>
            <div className='header-box'>
                <h1>Main Page</h1>
            </div>
            <div className='statistic'>
                <div className='tab-stats top-barber-per-month'>
                    <h1><IoPerson className='icon-stat-tab'/>Top Barber</h1>
                    <div className='barber-rating'>
                        <div className='barber-box'>
                            <img src={'photo_2024-04-07_17-28-45.jpg'} alt="person1"/>
                            <span className='name'>Alex Goodman</span>
                        </div>
                        <div className='rating'>
                            <p>5.0</p>
                            <GoStarFill className='icon-rating'/>
                        </div>
                    </div>
                </div>
                <div className='tab-stats orders-count'>
                    <h1><CgNotes className='icon-stat-tab'/>Orders Count</h1>
                    <span>1</span>
                </div>
                <div className="tab-stats reviews-count">
                    <h1><MdOutlineReviews className='icon-stat-tab'/>Reviews Count</h1>
                    <span>111</span>
                </div>
                <div className="tab-stats all-clients">
                    <h1><IoPeopleSharp className='icon-stat-tab'/>All Clients</h1>
                    <span>200</span>
                </div>
            </div>
        </section>
    );
};

export default Index;