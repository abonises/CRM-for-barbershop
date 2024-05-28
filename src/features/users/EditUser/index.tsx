import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById} from "../usersApiSlice.ts";
import EditUserForm from "../EditUserForm";
import { RootState } from '../../../app/store'

const Index = () => {
    const { id } = useParams()

    const user = useSelector((state: RootState) => selectUserById(state, id!))

    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    return content

};

export default Index;