import React from 'react';
import {CustomError, Order, User} from "../../../models/models.ts";
import { useState, useEffect } from "react"
import { useUpdateOrderMutation, useDeleteOrderMutation } from "../ordersApiSlice.ts"
import { useNavigate } from "react-router-dom"
import {FaRegSave, FaTrashAlt} from "react-icons/fa";
import cn from "classnames";
import './index.scss'
import moment from 'moment';
import useAuth from "../../../hooks/useAuth"

type Props = {
    order: Order,
    users: User[]
}

const PHONE_REGEX = /^380\d{9}$/;

const Index = ({ order, users }: Props) => {
    
    const { isManager, isAdmin } = useAuth()
    
    const [updateOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateOrderMutation()

    const [deleteOrder, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteOrderMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(order.name)
    const [surname, setSurname] = useState(order.surname)
    const [userId, setUserId] = useState(order.user)
    const [nameBarber, setNameBarber] = useState(order.nameBarber)
    const [time, setTime] = useState(order.time)
    const [timeForInput, setTimeForInput] = useState(moment(order.time).format('YYYY-MM-DDTHH:mm'))
    const [phone, setPhone] = useState(order.phone)
    const [validPhone, setValidPhone] = useState(false);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setName('')
            setSurname('')
            setTime('')
            setPhone('')
            setUserId('')
            navigate('/orders')
        }

    }, [isSuccess, isDelSuccess, navigate])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onSurnameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)
    const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = e.target.value;
        setUserId(selectedUserId);

        const selectedUser = users.find(user => user.id === selectedUserId);
        setNameBarber(selectedUser ? selectedUser.username : '');
    }
    const onPhoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)
    const onTimeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!time) {
            return
        }
        const dateTime = new Date(e.target.value)
        const formattedTime = dateTime.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        setTime(formattedTime)
        setTimeForInput(e.target.value)
    }


    const canSave = [name, surname, phone, timeForInput, userId].every(Boolean) && !isLoading

    const onSaveOrderClicked = async () => {
        if (canSave) {
            await updateOrder({ id: order.id, user: userId, name, nameBarber, surname, phone, time})
        }
    }

    const onDeleteOrderClicked = async () => {
        await deleteOrder({ id: order.id })
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    let deleteButton = null
    if(isManager || isAdmin) {
        deleteButton = (
            <button
                className={'delete-button'}
                title="Delete"
                onClick={onDeleteOrderClicked}
            ><FaTrashAlt/>
            </button>
        )
    }

    const errClass = (isError || isDelError) ? "error" : ""
    const validNameClass = !name ? "form__error" : ''
    const validSurnameClass = !surname ? "form__error" : ''
    const validPhoneClass = !validPhone ? "form__error" : ''
    const validTimeClass = timeForInput === '' ? "form__error" : ''

    const errContent = (
        (error as CustomError)?.data?.message ||
        (delerror as CustomError)?.data?.message || ''
    );

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <div className="order-edit-page">
                <form onSubmit={e => e.preventDefault()}>
                    <div className={'options-box'}>
                        <h2>Edit Order</h2>
                        <div>
                            <button className={cn('save-button', !canSave || 'save-button-active')}
                                    title="Save"
                                    onClick={onSaveOrderClicked}
                                    disabled={!canSave}
                            ><FaRegSave/>
                            </button>
                            {deleteButton}
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