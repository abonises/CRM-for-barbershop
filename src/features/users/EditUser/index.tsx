import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById} from "../usersApiSlice.ts";
import EditUserForm from "../EditUserForm";

const Index = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id!))

    console.log(user)
    console.log(typeof(user))

    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    return content

};

export default Index;