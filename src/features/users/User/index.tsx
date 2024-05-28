import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useSelector } from 'react-redux'
import { selectUserById } from '../usersApiSlice.ts'
import {GoStarFill} from "react-icons/go"
import { MdEdit } from "react-icons/md";
import {RootState} from "../../../app/store.ts";

type Props = {
    userId: string
}

const Index = ({ userId }: Props) => {

    const user = useSelector((state: RootState) => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/stuff/${userId}`)

        return (
            <li key={user.id} className="person-element">
                <div className='person'>
                    <img className='person-img' src={'photo_2024-04-07_17-28-45.jpg'} alt="person1"/>
                    <span className='person-name'>{user.username}</span>
                    <div className='roles'>
                        <p>{Array.from(user.roles).join(' ')}</p>
                    </div>
                    <div className='rating'>
                        <p>{user.rating}</p>
                        <GoStarFill className='icon-rating'/>
                    </div>
                    <span className='phone-number'>+{user.phone}</span>
                    <button onClick={handleEdit}><MdEdit /></button>
                </div>
            </li>
        )
    }else return null
};

export default Index;