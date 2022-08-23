import React from 'react'

function UserItem(props) {
    return (
        <div>
            <div className="row wa-item-chat py-2 cursor-pointer" onClick={props.openChat}>
                <div className="col-2 p-0">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle img-fluid" />
                </div>
                <div className="col-8">
                    <b>John Doe</b>
                    <br />
                    <p className="wa-preview-message">Hey dont you see my...</p>
                </div>
                <div className="col-2" style={{ textAlign: "right" }}>
                    <span>16:24</span>
                    <span className="badge badge-pill wa-badge">54</span>
                </div>
            </div>
            <hr />
        </div>

    )
}

export default UserItem