import React from 'react'

function MessageBox(props) {

    const isRead = () => {
        if (props.data.status === 'READ')
            return (<i className="large material-icons wa-icon wa-chat-icon fa fa-check-double ms-1"></i>);
    }

    if (props.data.type === 'OUTGOING') {
        return (
            <div className="row mt-1">
                <div className="offset-6 col-5">
                    <div className="card wa-card-chat wa-card-green">
                        <div className='col-10'>
                            {props.data.message}
                        </div>
                        <div className='col-2 text-end'>
                            <span>{props.data.time}</span>
                            {isRead()}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row mt-1">
                <div className="col-5">
                    <div className="card wa-card-chat wa-card-default">
                        {props.data.message}
                        <div className='text-end'>
                            <span>{props.data.time}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageBox