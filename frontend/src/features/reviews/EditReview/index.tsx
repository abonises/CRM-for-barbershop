import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectReviewById} from "../reviewsApiSlice.ts";
import EditReviewForm from "../EditReviewForm";
import { RootState } from '../../../app/store'
import {selectAllUsers} from "../../users/usersApiSlice.ts";

const Index = () => {
    const { id } = useParams()

    const review = useSelector((state: RootState) => selectReviewById(state, id!))
    const users = useSelector(selectAllUsers)

    const content = review && users ? <EditReviewForm review={review} users={users} /> : <p>Loading...</p>

    return content

};

export default Index;