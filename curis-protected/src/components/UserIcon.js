import React from 'react'

class UserIcon extends React.Component {
    state = {
        user: {
            id: "id",
            name: "User Name"
        }
    };

    render() {
        return (
            <React.Fragment>
                <img alt={this.props.user.name} title={this.props.user.name} width="32" height="32" src="static/images/loginuser_512.png"/>
            </React.Fragment>
        );
    }
}

export default UserIcon;