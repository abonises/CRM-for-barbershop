import React from 'react';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewOrderMutation } from "../ordersApiSlice"
import {CustomError, User} from "../../../models/models.ts";
import cn from "classnames";
import {FaRegSave} from "react-icons/fa";
import './index.scss'

type Props = {
    users: User[]
}

const PHONE_REGEX = /^380\d{9}$/;

const Index = ({ users }: Props) => {
    const [addNewOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewOrderMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [userId, setUserId] = useState(users[0].id)
    const [nameBarber, setNameBarber] = useState(users[0].username)
    const [time, setTime] = useState('')
    const [timeForInput, setTimeForInput] = useState('')
    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false);

    useEffect(() => {

        if (isSuccess) {
            setName('')
            setSurname('')
            setTime('')
            setPhone('')
            setUserId('')
            navigate('/orders')
        }

    }, [isSuccess, navigate])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onSurnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)
    const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserId(e.target.value)
        setNameBarber(e.target.value)
    }
    const onPhoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)
    const onTimeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateTime = new Date(e.target.value)
        const formattedTime = dateTime.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        setTime(formattedTime)
        setTimeForInput(e.target.value)
    }

    const canSave = [name, surname, phone, timeForInput, userId].every(Boolean) && !isLoading

    const onSaveOrderClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(userId, name, nameBarber, surname, phone, time)
        if (canSave) {
            await addNewOrder({ user: userId, name, nameBarber, surname, phone, time})
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError) ? "error" : ""
    const validNameClass = !name ? "form__error" : ''
    const validSurnameClass = !surname ? "form__error" : ''
    const validPhoneClass = !validPhone ? "form__error" : ''
    const validTimeClass = timeForInput === '' ? "form__error" : ''

    const content = (
        <>
            <p className={errClass}>{(error as CustomError)?.data?.message}</p>

            <div className="order-new-page">
                <form onSubmit={e => e.preventDefault()}>
                    <div className={'options-box'}>
                        <h2>New Order</h2>
                        <div>
                            <button className={cn('save-btn', !canSave || 'save-button-active')}
                                    title="Save"
                                    onClick={onSaveOrderClicked}
                                    disabled={!canSave}
                            ><FaRegSave/>
                            </button>
                        </div>
                    </div>
                    <div className="personal-data-box">
                        <label htmlFor="order-name">
                            Name:</label>
                        <input
                            className={`${validNameClass}`}
                            id="order-name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={onNameChanged}
                        />

                        <label htmlFor="order-surname">
                            Surname:</label>
                        <input
                            className={`${validSurnameClass}`}
                            id="order-surname"
                            name="surname"
                            type="text"
                            value={surname}
                            onChange={onSurnameChanged}
                        />

                        <label htmlFor="order-phone">
                            Phone:</label>
                        <input
                            className={`${validPhoneClass}`}
                            id="order-phone"
                            name="phone"
                            type="number"
                            value={phone}
                            onChange={onPhoneChanged}
                        />
                    </div>
                    <div className={'select-options-box'}>
                        <label htmlFor="order-username">
                            BARBER: </label>
                        <select
                            id="order-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                        <div className={'time-box'}>
                            <div>
                                <label htmlFor="order-time">
                                    Select Time:</label>
                                <input
                                    className={`${validTimeClass}`}
                                    type="datetime-local"
                                    id='time'
                                    name='time'
                                    value={timeForInput}
                                    onChange={onTimeChanged}
                                />
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )

    return content

};

export default Index;