import React from 'react'
import Loader from './Loader'
import Footer from './Footer'
import Header from './Header'

function Layout(props) {
    return (
        <div>
            <Header />
            {props.loading && (<Loader/>)}
            <div className='content'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout