import {IconType} from "react-icons";


export type Tabs = {
    id: number,
    title: string,
    icon: IconType
}

export type User = {
    ids: string[]
    _id: string;
    id: string,
    username: string,
    password: string,
    roles: string[],
    active: boolean,
    rating: string,
    phone: string
}


export type Order = {
    ids: string[]
    username: string,
    _id: string;
    id: string,
    user: string,
    name: string,
    nameBarber: string,
    surname: string,
    phone: string,
    time: string,
}

export type Review = {
    ids: string[]
    _id: string;
    id: string,
    user: string,
    nameBarber: string,
    title: string,
    text: string,
    rating: string
}

export type CustomError = {
    data?: {
        message?: string;
    };
}
