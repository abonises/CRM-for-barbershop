import React from 'react';
import {CustomError, Review, User} from "../../../models/models.ts";
import { useState, useEffect } from "react"
import { useUpdateReviewMutation, useDeleteReviewMutation } from "../reviewsApiSlice.ts"
import { useNavigate } from "react-router-dom"
import {FaRegSave, FaTrashAlt} from "react-icons/fa";
import cn from "classnames";
import './index.scss'
import {RATINGS} from "../../../config/ratings.ts";

type Props = {
    review: Review,
    users: User[]
}


const TITLE_REGEX = /^[A-z]{3,20}$/
const TEXT_REGEX = /^.{5,50}$/

const Index = ({ review, users }: Props) => {

    const [updateReview, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateReviewMutation()

    const [deleteReview, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteReviewMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState<string>(review.title)
    const [validTitle, setValidTitle] = useState<boolean>(false)
    const [text, setText] = useState<string>(review.text)
    const [validText, setValidText] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>(review.user)
    const [rating, setRating] = useState<string>(review.rating)
    const [nameBarber, setNameBarber] = useState<string>(review.nameBarber)
    
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            console.log('good')
            setTitle('')
            setText('')
            setRating('')
            setUserId('')
            navigate('/reviews')
        }

    }, [isSuccess, isDelSuccess, navigate])

    useEffect(() => {
        setValidTitle(TITLE_REGEX.test(title))
    }, [title])

    useEffect(() => {
        setValidText(TEXT_REGEX.test(text))
    }, [text])

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)
    const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = e.target.value;
        setUserId(selectedUserId);

        const selectedUser = users.find(user => user.id === selectedUserId);
        setNameBarber(selectedUser ? selectedUser.username : '');
    }

    const onRatingChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRating(e.target.value)
    }


    const canSave = [validTitle, validText, rating, userId].every(Boolean) && !isLoading

    const onSaveReviewClicked = async () => {
        if (canSave) {
            await updateReview({ id: review.id, user: userId, title, text, nameBarber, rating })
        }
    }

    const onDeleteReviewClicked = async () => {
        await deleteReview({ id: review.id })
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const optionsRating = Object.values(RATINGS).map(rating => {
        return (
            <option
                key={rating}
                value={rating}

            > {rating}</option>
        )
    })

    const errClass = (isError || isDelError) ? "error" : ""
    const validTitleClass = !validTitle ? "form__error" : ''
    const validTextClass = !validText ? "form__error" : ''
    const validRatingClass = !rating ? 'form__error' : ''

    const errContent = (
        (error as CustomError)?.data?.message ||
        (delerror as CustomError)?.data?.message || ''
    );

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <div className="review-edit-page">
                <form onSubmit={e => e.preventDefault()}>
                    <div className={'options-box'}>
                        <h2>Edit Review</h2>
                        <div>
                            <button className={cn('save-button', !canSave || 'save-button-active')}
                                    title="Save"
                                    onClick={onSaveReviewClicked}
                                    disabled={!canSave}
                            ><FaRegSave/>
                            </button>
                            <button
                                className={'delete-button'}
                                title="Delete"
                                onClick={onDeleteReviewClicked}
                            ><FaTrashAlt/>
                            </button>
                        </div>
                    </div>
                    <div className="personal-data-box">
                        <label htmlFor="review-title">
                            Title:</label>
                        <input
                            className={`${validTitleClass}`}
                            id="review-title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />

                        <label htmlFor="review-text">
                            Text:</label>
                        <textarea
                            className={`${validTextClass}`}
                            id="review-text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                        />
                    </div>
                    <div className={'select-options-box'}>
                        <label htmlFor="review-username">
                            BARBER: </label>
                        <select
                            id="review-username"
                            name="username"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                        <label htmlFor="rating">
                            ASSIGNED RATING:</label>
                        <select
                            className={`${validRatingClass}`}
                            id="rating"
                            name="rating"
                            size={5}
                            value={rating}
                            onChange={onRatingChanged}
                        >
                            {optionsRating}
                        </select>
                    </div>


                </form>
            </div>
        </>
    )

    return content

};

export default Index;