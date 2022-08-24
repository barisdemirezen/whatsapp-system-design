import React from 'react'

function UserItem(props) {
    return (
        <div>
            <div className="row wa-item-chat py-2 cursor-pointer seperator-bottom" onClick={() => props.openChat(props.data.userid)}>
                <div className="col-2 p-0">
                    <img src={props.data.imageUrl} className="rounded-circle img-fluid" />
                </div>
                <div className="col-8">
                    <b>{props.data.name}</b>
                    <br />
                    <p className="wa-preview-message">Hey dont you see my...</p>
                </div>
                <div className="col-2" style={{ textAlign: "right" }}>
                    <span>{props.data.lastMessageTime}</span>
                    <span className="badge badge-pill wa-badge">54</span>
                </div>
            </div>
            <hr />
        </div>

    )
}

export default UserItem