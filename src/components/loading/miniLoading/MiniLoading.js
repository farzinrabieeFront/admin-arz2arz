
import React from 'react'
import ReactLoading from 'react-loading';

const MiniLoading = ({ show, ...props }) => {
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

export default MiniLoading
