import './index.scss'
import { useGetUsersQuery } from "../usersApiSlice.ts"
import User from "../User";
import { AiOutlineUserAdd } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

const Index = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    const navigate = useNavigate()

    const handleNewUser = (e) => {
        navigate('/stuff/new')
    }

    let content

    if(isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">Error</p>
    }

    if (isSuccess) {
        const {ids} = users

        const listContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId}/>)
            : null

        content = (
            <div className='stuff-page'>
                <div className='header-box'>
                    <h1>Stuff</h1>
                    <button onClick={handleNewUser}>
                        <AiOutlineUserAdd />
                    </button>

                </div>
                <div className='stuff-list-box'>
                    <div className='properties-list'>
                        <span>Photo</span>
                        <span>Name</span>
                        <span>Roles</span>
                        <span>Rating</span>
                        <span>Phone Number</span>
                    </div>
                    <ul className='stuff-list'>
                        {listContent}
                    </ul>
                </div>
            </div>
        )
    }
    return content;
};

export default Index;