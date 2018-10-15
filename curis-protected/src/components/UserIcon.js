import React from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import LinearProgress from '@material-ui/core/LinearProgress';

import './components.css'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class UserIcon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileUpdating: false,
            profileDialogOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleProfileDialogOpen = () => {
        this.setState({ profileDialogOpen: true });
    };

    handleProfileDialogClose = () => {
        this.setState({ profileDialogOpen: false });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({profileUpdating: true});
        const form = event.target;
        const data = new FormData(form);
        fetch('/protected/index.php/Csresearch/update_user_profile', {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(r => {
                /*if (r.success) {
                    this.setState({dialogText: "Project successfully updated."});
                    this.setState({dialogOpen: true});
                }
                else {
                    this.setState({dialogText: "Project update failed."});
                    this.setState({dialogOpen: true});
                }*/
                this.setState({profileUpdating: false});
                this.setState({profileDialogOpen: false});
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <React.Fragment>
                <img
                    alt={this.props.user.name}
                    title={this.props.user.name}
                    src="static/images/loginuser_512.png"
                    className="user-icon-img"
                    onClick={this.handleProfileDialogOpen}/>

                <Dialog
                    fullScreen
                    open={this.state.profileDialogOpen}
                    onClose={this.handleProfileDialogClose}
                    TransitionComponent={Transition}
                    >
                    <AppBar className="user-profile-app-bar">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className="user-profile-dialog-title">
                                User Profile
                            </Typography>
                            <IconButton color="inherit" onClick={this.handleProfileDialogClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Paper className="user-profile-paper">

                        <form onSubmit={this.handleSubmit}>
                            <input type='hidden' name="id" value={this.props.user.id} />
                            <div>
                                <TextField
                                    label="Name"
                                    id="name"
                                    onChange={this.props.onUserProfileChange}
                                    inputProps={{name: 'name', id: 'name'}}
                                    style={{width: 400}}
                                    required
                                    disabled
                                    value={this.props.user.name}/>
                            </div>
                            <br/>
                            <div>
                                <TextField
                                    label="SUNet ID"
                                    id="sunetid"
                                    onChange={this.props.onUserProfileChange}
                                    inputProps={{name: 'sunetid', id: 'sunetid'}}
                                    style={{width: 400}}
                                    required
                                    disabled
                                    value={this.props.user.sunetid}/>
                            </div>
                            <br/>
                            <div>
                                <TextField
                                    label="SUID"
                                    id="suid"
                                    onChange={this.props.onUserProfileChange}
                                    inputProps={{name: 'suid', id: 'suid'}}
                                    style={{width: 400}}
                                    value={this.props.user.suid}/>
                            </div>
                            <br/>
                            <div>
                                <TextField
                                    label="Preferred Email"
                                    id="email"
                                    onChange={this.props.onUserProfileChange}
                                    inputProps={{name: 'email', id: 'email'}}
                                    style={{width: 400}}
                                    required
                                    value={this.props.user.email}/>
                            </div>
                            <br/>
                            <div>
                                <TextField
                                    label="Webpage"
                                    id="webpage"
                                    onChange={this.props.onUserProfileChange}
                                    inputProps={{name: 'webpage', id: 'webpage'}}
                                    style={{width: 800}}
                                    value={this.props.user.webpage}/>
                            </div>
                            <br/>
                            <div>
                                <TextField
                                    label="Research Interest Area"
                                    id="interestarea"
                                    onChange={this.props.onUserProfileChange}
                                    inputProps={{name: 'interestarea', id: 'interestarea'}}
                                    style={{width: 400}}
                                    value={this.props.user.interestarea}/>
                            </div>
                            <br/>
                            <div>
                                <FormControl required={true}>
                                    <InputLabel htmlFor="major">Major</InputLabel>
                                    <Select
                                        style={{width: 280}}
                                        value={this.props.user.major}
                                        onChange={this.props.onUserProfileChange}
                                        inputProps={{name: 'major', id: 'major'}}>
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="CS">CS</MenuItem>
                                        <MenuItem value="Symsys">Symsys</MenuItem>
                                        <MenuItem value="EE">EE</MenuItem>
                                        <MenuItem value="MCS">MCS</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <br/>
                            <div>
                                <TextField
                                    label="GPA"
                                    id="gpa"
                                    onChange={this.props.onUserProfileChange}
                                    inputProps={{name: 'gpa', id: 'gpa'}}
                                    value={this.props.user.gpa}
                                    type="number"/>
                            </div>
                            <br/>
                            <div>
                                <FormControl required={true}>
                                    <InputLabel htmlFor="year">Year at Stanford</InputLabel>
                                    <Select
                                        style={{width: 280}}
                                        value={this.props.user.year}
                                        onChange={this.props.onUserProfileChange}
                                        inputProps={{name: 'year', id: 'year'}}>
                                        <MenuItem value="N/A">N/A</MenuItem>
                                        <MenuItem value="Freshman">Freshman</MenuItem>
                                        <MenuItem value="Sophomore">Sophomore</MenuItem>
                                        <MenuItem value="Junior">Junior</MenuItem>
                                        <MenuItem value="Senior">Senior</MenuItem>
                                        <MenuItem value="Graduate">Graduate</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <br/><br/>

                            <div>
                                {
                                    this.state.profileUpdating
                                    ? <LinearProgress />
                                    : <Button variant="contained" color="primary" type="submit">Save</Button>
                                }
                            </div>
                        </form>
                    </Paper>

                </Dialog>
            </React.Fragment>
        );
    }
}

export default UserIcon;