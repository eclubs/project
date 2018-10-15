import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './components.css'

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        user: {
            id: 0,
            name: '',
            sunetid: '',
            suid: '',
            type: '',
            email: '',
            webpage: '',
            interestarea: '',
            major: '',
            gpa: 0,
            year: '',
            transcript: '',
            resume: '',
            admin: false
        }
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/current_user')
            .then(response => response.json())
            .then(data => this.setState({user: data.user}))
            .catch(error => console.error('Error:', error));
    }

    handleChange = (event) => {
        //var user = {...this.state.user};
        var user = {};
        user = Object.assign(this.state.user, user);
        user[event.target.name] = event.target.value;
        this.setState({user});
    };

    handleChecked = (event, checked) => {
        console.log(event.target.name);
        console.log(event.target);
        this.setState({[event.target.name]: event.target.checked});
    };

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        fetch('/protected/index.php/Csresearch/add_project', {
            method: 'POST',
            body: data
        });
    }

    render() {
        return (
            <div className="add-project-div">
                <Paper className="add-project-paper">

                    <form onSubmit={this.handleSubmit} className="add-project-form">
                        <div>
                            <TextField
                                label="Name"
                                id="name"
                                onChange={this.handleChange}
                                inputProps={{name: 'name', id: 'name'}}
                                style={{width: 400}}
                                required
                                disabled
                                value={this.state.user.name}/>
                        </div>
                        <br/>
                        <div>
                            <TextField
                                label="SUNet ID"
                                id="sunetid"
                                onChange={this.handleChange}
                                inputProps={{name: 'sunetid', id: 'sunetid'}}
                                style={{width: 400}}
                                required
                                disabled
                                value={this.state.user.sunetid}/>
                        </div>
                        <br/>
                        <div>
                            <TextField
                                label="SUID"
                                id="suid"
                                onChange={this.handleChange}
                                inputProps={{name: 'suid', id: 'suid'}}
                                style={{width: 400}}
                                value={this.state.user.suid}/>
                        </div>
                        <br/>
                        <div>
                            <TextField
                                label="Preferred Email"
                                id="email"
                                onChange={this.handleChange}
                                inputProps={{name: 'email', id: 'email'}}
                                style={{width: 400}}
                                required
                                value={this.state.user.email}/>
                        </div>
                        <br/>
                        <div>
                            <TextField
                                label="Webpage"
                                id="webpage"
                                onChange={this.handleChange}
                                inputProps={{name: 'webpage', id: 'webpage'}}
                                style={{width: 800}}
                                value={this.state.user.webpage}/>
                        </div>
                        <br/>
                        <div>
                            <TextField
                                label="Research Interest Area"
                                id="interestarea"
                                onChange={this.handleChange}
                                inputProps={{name: 'interestarea', id: 'interestarea'}}
                                style={{width: 400}}
                                value={this.state.user.interestarea}/>
                        </div>
                        <br/>
                        <div>
                            <FormControl required={true}>
                                <InputLabel htmlFor="major">Major</InputLabel>
                                <Select
                                    style={{width: 280}}
                                    value={this.state.user.major}
                                    onChange={this.handleChange}
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
                                onChange={this.handleChange}
                                inputProps={{name: 'gpa', id: 'gpa'}}
                                value={this.state.user.gpa}
                                type="number"/>
                        </div>
                        <br/>
                        <div>
                            <FormControl required={true}>
                                <InputLabel htmlFor="year">Year at Stanford</InputLabel>
                                <Select
                                    style={{width: 280}}
                                    value={this.state.user.year}
                                    onChange={this.handleChange}
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
                            <Button variant="contained" color="primary" type="submit">Update</Button>
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }

}

export default StudentProfile