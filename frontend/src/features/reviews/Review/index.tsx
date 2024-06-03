import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useSelector } from 'react-redux'
import { selectReviewById } from '../reviewsApiSlice'
import {MdEdit} from "react-icons/md";
import {RootState} from "../../../app/store.ts";
import {GoStarFill} from "react-icons/go";

type Props = {
    ReviewId: string
}

const Index = ({ ReviewId }: Props) => {


    const review = useSelector((state: RootState) => selectReviewById(state, ReviewId))

    const navigate = useNavigate()



    if (review) {

        const handleEdit = () => navigate(`/reviews/${ReviewId}`)

        return (
            <li key={review.id} className="review-element">
                <div className='review'>
                    <span className='review-barber'>{review.nameBarber}</span>
                    <span className='review-title'>{review.title}</span>
                    <div className={'review-text'}>
                        <details className={'review-text'}>
                            <summary>
                                Text
                            </summary>
                            {review.text}
                        </details>
                    </div>
                    <div className='rating'>
                        <p>{review.rating}</p>
                        <GoStarFill className='icon-rating'/>
                    </div>
                    <button onClick={handleEdit}><MdEdit/></button>
                </div>
            </li>
        )

    } else return null
};

export default Index;