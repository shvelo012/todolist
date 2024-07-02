import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'

import Navbar from './Common/Navbar'
import Footer from './Common/Footer'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Confidentiality from './Confidentiality'

import { CHECK_AUTH_STATUS_REQUEST } from './Auth/constants'

import './normalize.scss'
import './common.scss'
import './loader.scss'

const App = ({ isAuthenticated, dispatch, location }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            dispatch({ type: CHECK_AUTH_STATUS_REQUEST, payload: { token } })
        } else {
            // add custom delay to wait for font download
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated !== null) {
            if (!isAuthenticated) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }

            setIsLoading(false)
        }
    }, [isAuthenticated])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    if (isLoading) {
        return <div className='mt-loader'></div>
    }

    return (
        <div className='App'>
            <Navbar />
            <div className='mt-content'>
                <Route exact path='/' render={() => (
                    !isAuthenticated ? <Redirect to='/login' /> : <Redirect to='/app' />
                )} />
                <Auth />
                <Dashboard />
                <Confidentiality />
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth

    return {
        isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps, null)(App))
