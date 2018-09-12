import React from 'react'
import Avatar from '@material-ui/core/Avatar'

class UserIcon extends React.Component {
    state = {
        user: {
            id: "id",
            name: "User Name"
        }
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/current_user')
            .then(response => response.json())
            .then(data => this.setState({user: data.user}))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <React.Fragment>
                <img alt={this.state.user.name} title={this.state.user.name} src="static/images/loginuser2_32.png"/>
            </React.Fragment>
        );
    }
}

export default UserIcon;