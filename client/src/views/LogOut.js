import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom'

const LogOut = (props) => {
    useEffect(() => {
        props.onLogOut();
    }, [props]);

    return <Redirect to="/login" />
};

export default LogOut;