import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './components.css'

class AddProject extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    state = {
        title: '',
        researchfield: '',
        secondfield: '',
        thirdfield: '',
        quarter: '',
        url: '',
        description: '',
        background: '',
        capacity: 0,
        prerequisite: ''
    };

    research_fields = [
        "AI",
        "Algorithms",
        "Architecture & Hardware",
        "BioComputation",
        "Compilers",
        "Databases",
        "Distributed Systems",
        "Formal Methods and Verification",
        "Graphics",
        "HCI",
        "Networking",
        "Operating Systems",
        "Programming Languages",
        "Robotics",
        "Scientific Computing",
        "Security",
        "Software Engineering",
        "Theory of Computation",
        "Vision"
    ];

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleChecked = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleSubmit(event) {
        //alert('submit!');
        //console.log(this.state);
        event.preventDefault();
        //const {title, researchfield, secondfield, thirdfield} = this.state;

        const form = event.target;
        const data = new FormData(form);

        fetch('/protected/index.php/Csresearch/current_user', {
            method: 'POST',
            body: data
        });
    }

    handleReset(event) {
        alert('reset!');
        event.preventDefault();
    }

    render() {
        return (
            <div className="add-project-div">
            <Paper className="add-project-paper">

                <form onSubmit={this.handleSubmit} className="add-project-form">
                    <div>
                        <TextField
                            label="Project Title"
                            id="title"
                            onChange={this.handleChange}
                            inputProps={{name: 'title', id: 'title'}}
                            required
                            style={{width: 600}}/>
                    </div>
                    <br/>

                    <div>
                        <FormControl required={true}>
                            <InputLabel htmlFor="researchfield">Field of Research</InputLabel>
                            <Select
                                style={{width: 300}}
                                value={this.state.researchfield}
                                onChange={this.handleChange}
                                inputProps={{name: 'researchfield', id: 'researchfield'}}>
                                {
                                    this.research_fields.map(field => {
                                        return (
                                            <MenuItem value={field}>{field}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <br/>

                    <div>
                        <FormControl>
                            <InputLabel>Field of Research (2nd)</InputLabel>
                            <Select
                                style={{width: 300}}
                                value={this.state.secondfield}
                                onChange={this.handleChange}
                                inputProps={{name: 'secondfield', id: 'secondfield'}}>
                                {
                                    this.research_fields.map(field => {
                                        return (
                                            <MenuItem value={field}>{field}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <br/>

                    <div>
                        <FormControl>
                            <InputLabel>Field of Research (3rd)</InputLabel>
                            <Select
                                style={{width: 300}}
                                value={this.state.thirdfield}
                                onChange={this.handleChange}
                                inputProps={{name: 'thirdfield', id: 'thirdfield'}}>
                                {
                                    this.research_fields.map(field => {
                                        return (
                                            <MenuItem value={field}>{field}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <br/><br/>

                    <div>
                        <FormLabel component="legend">School Quarter</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={this.state.quarter == "2018-2019 Autumn"} onChange={this.handleChecked} value="2018-2019 Autumn" />}
                                label="2018-2019 Autumn"
                                />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.quarter == "2018-2019 Winter"} onChange={this.handleChecked} value="2018-2019 Winter" />}
                                label="2018-2019 Winter"
                                />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.quarter == "2018-2019 Spring"} onChange={this.handleChecked} value="2018-2019 Spring" />}
                                label="2018-2019 Spring"
                                />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.quarter == "2018-2019 Summer"} onChange={this.handleChecked} value="2018-2019 Summer" />}
                                label="2018-2019 Summer"
                                />
                        </FormGroup>
                    </div>

                    <div>
                        <TextField
                            label="Project URL"
                            id="url"
                            onChange={this.handleChange}
                            inputProps={{name: 'url', id: 'url'}}
                            style={{width: 600}}/>
                    </div>
                    <br/>

                    <div>
                        <TextField
                            label="Description"
                            id="description"
                            onChange={this.handleChange}
                            inputProps={{name: 'description', id: 'description'}}
                            required
                            multiline={true}
                            rows={10}
                            style={{width: 600}}/>
                    </div>
                    <br/>

                    <div>
                        <TextField
                            label="Recommended Background"
                            id="background"
                            onChange={this.handleChange}
                            inputProps={{name: 'background', id: 'background'}}
                            required
                            multiline={true}
                            rows={6}
                            style={{width: 600}}/>
                    </div>
                    <br/>

                    <div>
                        <TextField
                            label="Student Capacity"
                            id="capacity"
                            onChange={this.handleChange}
                            inputProps={{name: 'capacity', id: 'capacity'}}
                            required
                            type="number"/>
                    </div>
                    <br/>

                    <div>
                        <TextField
                            label="Prerequisite / Preparation"
                            id="prerequisite"
                            onChange={this.handleChange}
                            inputProps={{name: 'prerequisite', id: 'prerequisite'}}
                            required
                            multiline={true}
                            rows={6}
                            style={{width: 600}}/>
                    </div>

                    <br/><br/>

                    <div>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="contained" color="primary" type="button" onClick={this.handleReset}>Clear Values</Button>
                    </div>
                </form>
            </Paper>
            </div>
        );
    }

}

export default AddProject