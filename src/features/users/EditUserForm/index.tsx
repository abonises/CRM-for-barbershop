import React, {useState, useEffect} from "react"
import {useUpdateUserMutation, useDeleteUserMutation} from "../usersApiSlice"
import {useNavigate} from "react-router-dom"
import {ROLES} from "../../../config/roles"
import {RATINGS} from "../../../config/ratings"
import {User} from "../../../models/models.ts";
import {FaTrashAlt} from "react-icons/fa";
import {FaRegSave} from "react-icons/fa";
import './index.scss'
import cn from 'classnames'
import {CustomError} from "../../../models/models.ts";


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const PHONE_REGEX = /^380\d{9}$/;

type Props = {
    user: User
}

const Index = ({user}: Props) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [rating, setRating] = useState(user.rating)
    const [phone, setPhone] = useState(user.phone)
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
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRating('')
            setPhone('')
            setRoles([])
            navigate('/stuff')
        }

    }, [isSuccess, isDelSuccess, navigate])

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

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async () => {
        if (password) {
            await updateUser({id: user.id, username, password, roles, active, rating, phone})
        } else {
            await updateUser({id: user.id, username, roles, active, rating, phone})
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({id: user.id})
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

    let canSave
    if (password) {
        canSave = [roles.length, validPhone, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validPhone, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "error" : ''
    const validUserClass = !validUsername ? 'form__error' : ''
    const validPwdClass = password && !validPassword ? 'form__error' : ''
    const validRolesClass = !(roles.length) ? 'form__error' : ''
    const validRatingClass = !rating ? 'form__error' : ''
    const validPhoneClass = !validPhone ? 'form__error' : ''

    const errContent = (
        (error as CustomError)?.data?.message ||
        (delerror as CustomError)?.data?.message || ''
    );

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <div className='user-edit-page'>
                <form onSubmit={e => e.preventDefault()}>
                    <div className={'options-box'}>
                        <h2>Edit User</h2>
                        <div>
                            <button className={cn('save-button', !canSave || 'save-button-active')}
                                title="Save"
                                onClick={onSaveUserClicked}
                                disabled={!canSave}
                            ><FaRegSave/>
                            </button>
                            <button
                                    className={'delete-button'}
                                    title="Delete"
                                    onClick={onDeleteUserClicked}
                            ><FaTrashAlt/>
                            </button>
                        </div>
                    </div>
                    <div className={'personal-data-box'}>
                        <label htmlFor="username">
                            Username: <span> [3-20 letters]</span></label>
                        <input
                            className={`${validUserClass}`}
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
                            className={`${validPwdClass}`}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />

                        <label htmlFor="phone-number">
                            Phone: <span
                            className="nowrap">[12 digits, Format: +380]</span></label>
                        <input
                            required
                            className={`${validPhoneClass}`}
                            id="phone"
                            name="phone"
                            type="tel"
                            value={phone}
                            onChange={onPhoneChanged}
                        />
                    </div>

                    <div className={'select-options-box'}>
                        <label htmlFor="user-active">
                            ACTIVE:
                            <input

                                id="user-active"
                                name="user-active"
                                type="checkbox"
                                checked={active}
                                onChange={onActiveChanged}
                            />
                        </label>

                        <div className={'roles-rating-box'}>
                            <label htmlFor="roles">
                                ASSIGNED ROLES:</label>
                            <div className={'select-container'}>
                                <select
                                    className={`${validRolesClass}`}
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
                    </div>
                </form>
            </div>
        </>
    )

    return content;
};

export default Index;