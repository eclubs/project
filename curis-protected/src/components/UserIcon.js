import React from 'react'
import Avatar from '@material-ui/core/Avatar'

class UserIcon extends React.Component {
    state = {
        user: {
            id: "id",
            displayName: "User Name"
        }
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/current_user')
            .then(response => response.json())
            .then(data => this.setState({user: data.user}));
    }

    render() {
        return (
            <React.Fragment>
                <img alt={this.state.user.displayName} title={this.state.user.displayName} src="static/images/loginuser2_32.png"/>
            </React.Fragment>
        );
    }
}

export default UserIcon;