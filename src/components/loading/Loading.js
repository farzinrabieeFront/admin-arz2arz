import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({ show, ...props }) => {
    return (
        <>
            {
                show ?
                    <ReactLoading {...props} />
                    : null
            }
        </>
    )
}

export default Loading
