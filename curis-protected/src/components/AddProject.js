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
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    state = {
        title: '',
        researchfield: '',
        secondfield: '',
        thirdfield: '',
        year_quarter_0: false,
        year_quarter_1: false,
        year_quarter_2: false,
        year_quarter_3: false,
        compensation_type_0: '',
        compensation_type_1: '',
        compensation_type_2: '',
        compensation_type_3: '',
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

    handleChecked = (event, checked) => {
        console.log(event.target.name);
        console.log(event.target);
        this.setState({[event.target.name]: event.target.checked});
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
                                style={{width: 800}}/>
                        </div>
                        <br/>

                        <div>
                            <FormControl required={true}>
                                <InputLabel htmlFor="researchfield">Field of Research</InputLabel>
                                <Select
                                    style={{width: 280}}
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

                            <FormControl style={{marginLeft: 50}}>
                                <InputLabel>Field of Research (2nd)</InputLabel>
                                <Select
                                    style={{width: 280}}
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


                            <FormControl style={{marginLeft: 50}}>
                                <InputLabel>Field of Research (3rd)</InputLabel>
                                <Select
                                    style={{width: 280}}
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
                        <br/>

                        <div>
                            <FormLabel component="legend" required>School Quarter</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox name="year_quarter_0" checked={this.state.year_quarter_0} onChange={this.handleChecked} value="2018-2019 Autumn" />}
                                    label="2018-2019 Autumn"
                                    />
                                {
                                    this.state.year_quarter_0 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.compensation_type_0}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation_type_0', id: 'compensation_type_0'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                                <FormControlLabel
                                    control={<Checkbox name="quarter1" checked={this.state.quarter1} onChange={this.handleChecked} value="2018-2019 Winter" />}
                                    label="2018-2019 Winter"
                                    />
                                {
                                    this.state.quarter1 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.compensation1}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation1', id: 'compensation1'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                                <FormControlLabel
                                    control={<Checkbox name="quarter2" checked={this.state.quarter2} onChange={this.handleChecked} value="2018-2019 Spring" />}
                                    label="2018-2019 Spring"
                                    />
                                {
                                    this.state.quarter2 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.compensation2}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation2', id: 'compensation2'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                                <FormControlLabel
                                    control={<Checkbox name="quarter3" checked={this.state.quarter3} onChange={this.handleChecked} value="2018-2019 Summer" />}
                                    label="2018-2019 Summer"
                                    />
                                {
                                    this.state.quarter3 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.compensation3}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation3', id: 'compensation3'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                            </FormGroup>
                        </div>

                        <div>
                            <TextField
                                label="Project URL"
                                id="url"
                                onChange={this.handleChange}
                                inputProps={{name: 'url', id: 'url'}}
                                style={{width: 800}}/>
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
                                style={{width: 800, 'border-style': 'dotted', 'border-width': '1px', padding: 5}}/>
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
                                style={{width: 800, 'border-style': 'dotted', 'border-width': '1px', padding: 5}}/>
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
                                style={{width: 800, 'border-style': 'dotted', 'border-width': '1px', padding: 5}}/>
                        </div>

                        <br/><br/>

                        <div>
                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="contained" color="primary" type="button" onClick={this.handleReset}>Clear
                                Values</Button>
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }

}

export default AddProject