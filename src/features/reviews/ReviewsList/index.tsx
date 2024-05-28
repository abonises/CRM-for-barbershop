import './index.scss'
import {useGetReviewsQuery} from "../reviewsApiSlice.ts";
import {CustomError} from "../../../models/models.ts";
import { RiStickyNoteAddLine } from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import Review from "../Review";

const Index = () => {
    const {
        data: reviews,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReviewsQuery()

    const navigate = useNavigate()

    const handleNewReview = () => {
        navigate('/reviews/new')
    }

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{(error as CustomError)?.data?.message}</p>
    }

    if (isSuccess) {
        const {ids} = reviews

        const listContent = ids?.length
            ? ids.map(ReviewId => <Review key={ReviewId} ReviewId={ReviewId}/>)
            : null

        content = (<div className='reviews-page'>
            <div className='header-box'>
                <h1>Reviews</h1>
                <button onClick={handleNewReview}>
                    <RiStickyNoteAddLine/>
                </button>
            </div>
            <div className='reviews-list-box'>
                <div className='properties-list'>
                    <span>Barber</span>
                    <span>Title</span>
                    <span>Text</span>
                    <span>Rating</span>
                </div>
                <ul className='reviews-list'>
                    {listContent}
                </ul>
            </div>
        </div>)
    }

    return content;
}
export default Index;