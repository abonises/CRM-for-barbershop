import React, {useState, useEffect} from "react"
import { useAddNewUserMutation } from "../usersApiSlice"
import {useNavigate} from "react-router-dom"
import {ROLES} from "../../../config/roles"
import {RATINGS} from "../../../config/ratings"
import {FaRegSave} from "react-icons/fa";
import './index.scss'
import cn from 'classnames'
import {CustomError} from "../../../models/models.ts";


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const PHONE_REGEX = /^\d{12}$/


const Index = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])
    const [rating, setRating] = useState('')
    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRating('')
            setPhone('')
            setRoles([])
            navigate('/stuff')
        }

    }, [isSuccess, navigate])

    const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
    const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const onPhoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)

    const onRolesChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onRatingChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRating(e.target.value)
    }

    const canSave = [roles.length, validPhone, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles, rating, phone })
        }
    }

    const optionsRoles = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option>
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

    const errClass = isError ? "error" : ''
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !roles.length ? 'form__input--incomplete' : ''
    const validPhoneClass = !validPhone ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{(error as CustomError)?.data?.message}</p>

            <div className='user-new-page'>
                <form onSubmit={e => e.preventDefault()}>
                    <div className={'options-box'}>
                        <h2>New User</h2>
                        <div>
                            <button
                                    className={cn('save-btn', !canSave || 'save-btn-active')}
                                    title="Save"
                                    onClick={onSaveUserClicked}
                                    disabled={!canSave}
                            ><FaRegSave/>
                            </button>
                        </div>
                    </div>
                    <div className={'personal-data-box'}>
                        <label htmlFor="username">
                            Username: <span> [3-20 letters]</span></label>
                        <input
                            className={`form__input ${validUserClass}`}
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={username}
                            onChange={onUsernameChanged}
                        />

                        <label htmlFor="password">
                            Password: <span>[empty = no change]</span> <span
                            className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                        <input
                            className={`form__input ${validPwdClass}`}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />

                        <label htmlFor="phone-number">
                            Phone: <span
                            className="nowrap">[12 digits, Format: 380000000000]</span></label>
                        <input
                            required
                            className={`form__input ${validPhoneClass}`}
                            id="phone"
                            name="phone"
                            type="tel"
                            value={phone}
                            onChange={onPhoneChanged}
                        />
                    </div>

                    <div className={'select-options-box'}>
                        <div className={'roles-rating-box'}>
                            <label htmlFor="roles">
                                ASSIGNED ROLES:</label>
                            <div className={'select-container'}>
                                <select
                                    className={`form__select ${validRolesClass}`}
                                    id="roles"
                                    name="roles"
                                    multiple={true}
                                    size={3}
                                    value={roles}
                                    onChange={onRolesChanged}
                                >
                                    {optionsRoles}
                                </select>
                            </div>

                            <label htmlFor="rating">
                                ASSIGNED RATING:</label>
                            <select
                                className={`form__select ${validRolesClass}`}
                                id="rating"
                                name="rating"
                                size={5}
                                value={rating}
                                onChange={onRatingChanged}
                            >
                                {optionsRating}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

    return content;
};

export default Index;