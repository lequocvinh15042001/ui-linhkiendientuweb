import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getOTP } from '../actions/userActions'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userForgotPassword = useSelector(state => state.userForgotPassword)
    const { loading, error, userForgotPass } = userForgotPassword

    useEffect(() => {
        if (userForgotPass) {
            navigate('/login')
            window.location.reload()
        }
    }, [navigate, userForgotPass])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getOTP(email))
    }

    return (
        <FormContainer>
            <h1 className='d-flex justify-content-center py-3'>Quên mật khẩu</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='d-flex justify-content-center py-3'>
                    <Button type='submit' variant='primary'>Gửi mật khẩu mới</Button>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default ForgotPassword