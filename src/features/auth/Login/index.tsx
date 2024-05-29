import React, {useState, useEffect, SyntheticEvent} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './index.scss'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../authSlice'
import { useLoginMutation } from '../authApiSlice'
import usePersist from "../../../hooks/usePersist"

interface Error {
    status?: number;
    data?: {
        message?: string;
    };
    message: string
}

const Index = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()


    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e: SyntheticEvent | SubmitEvent) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (err: unknown) {
            if (!(err instanceof Error)) {
                setErrMsg('An unknown error occurred');
                return;
            }

            const error = err as Error;

            if (!error.message) {
                setErrMsg('An unknown error occurred');
                return;
            }

            switch (error.status) {
                case 400:
                    setErrMsg('Missing Username or Password');
                    break;
                case 401:
                    setErrMsg('Unauthorized');
                    break;
                default:
                    setErrMsg(error.message);
                    break;
            }
        }
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const handleToggle = () => setPersist(!persist)

    const errClass = errMsg ? "error" : ""

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="login-page">
            <header>
                <h1>Stuff Login</h1>
            </header>
            <main className="login">
                <p className={errClass} aria-live="assertive">{errMsg}</p>

                <form onSubmit={handleSubmit}>
                    <div className="login-box">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />
                    </div>
                    <button>Sign In</button>

                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>
            <footer>
                <Link className={'link-to-home'} to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
};


export default Index;