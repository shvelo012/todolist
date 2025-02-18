import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { TextField, Button } from '@material-ui/core';
import { LOGIN_REQUEST } from './constants';
import './Login.scss';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const query = queryString.parse(props.location.search);
        const search = query ? query.message : '';
        setSearch(search);
    }, [props.location.search]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (props.isLoading) {
            return;
        }

        setSearch('');

        props.dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
    };

    const { error } = props;

    return (
        <div className='mt-login mt-auth'>
            <div className='mt-auth__form-container'>
                {search && (
                    <div className='mt-info mt-info--success'>{search}</div>
                )}
                {error && !search && (
                    <div className='mt-info mt-info--error'>{error.message}</div>
                )}
                <h2 className='mt-auth__title'>Log in</h2>
                <form className='mt-auth__form' onSubmit={handleSubmit}>
                    <TextField
                        label='Email'
                        type='email'
                        name='email'
                        autoComplete='email'
                        margin='normal'
                        variant='outlined'
                        required={true}
                        fullWidth={true}
                        value={email}
                        error={error && error.field === 'email'}
                        onChange={handleChange}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        name='password'
                        margin='normal'
                        variant='outlined'
                        required={true}
                        fullWidth={true}
                        value={password}
                        error={error && error.field === 'password'}
                        onChange={handleChange}
                    />
                    <div className='mt-auth__actions'>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='large'
                            fullWidth={true}
                            style={{
                                paddingTop: 12,
                                paddingBottom: 12,
                            }}
                        >
                            Log in
                        </Button>
                        <p className='mt-login__forgot'>
                            <Link to='/forgot' className='mt-auth__action-link'>
                                Forgot your password?
                            </Link>
                        </p>
                        <p className='mt-login__signup'>
                            Don't have an account?&nbsp;
                            <Link to='/signup' className='mt-auth__action-link'>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { user, isLoading, error } = state.login;

    return {
        user,
        isLoading,
        error,
    };
};

export default withRouter(connect(mapStateToProps)(Login));
