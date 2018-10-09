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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import './components.css'

class AddProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {
                title: '',
                type: '',
                department: '',
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
            },
            updating: false,
            dialogOpen: false,
            dialogText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.dialogClose = this.dialogClose.bind(this);
    }

    project_types = [
        "CURIS",
        "Year Round Research"
    ];

    departments = [
        "CS",
        "EE"
    ];

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
        let project = {...this.state.project};
        project[event.target.name] = event.target.value;
        this.setState({project: project});
    };

    handleChecked = (event, checked) => {
        let project = {...this.state.project};
        project[event.target.name] = event.target.checked;
        this.setState({project: project});
    };

    handleSubmit(event) {
        event.preventDefault();

        this.setState({updating: true});

        const form = event.target;
        const data = new FormData(form);

        fetch('/protected/index.php/Csresearch/add_project', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(r => {
            if (r.success) {
                this.setState({dialogText: "Project successfully added."});
            }
            else {
                this.setState({dialogText: "Project add failed."});
            }
            this.setState({dialogOpen: true});
            this.setState({updating: false});
        })
        .catch(error => console.error('Error:', error));
    }

    handleReset(event) {
        event.preventDefault();
        this.setState({
            project: {
                title: '',
                type: '',
                department: '',
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
            },
            updating: false
        });
    }

    dialogClose() {
        this.setState({dialogOpen: false});
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
                                value={this.state.project.title}
                                required
                                style={{width: 800}}/>
                        </div>
                        <br/>

                        <div>
                            <FormControl required={true}>
                                <InputLabel htmlFor="type">Project Type</InputLabel>
                                <Select
                                    style={{width: 280}}
                                    value={this.state.project.type}
                                    onChange={this.handleChange}
                                    inputProps={{name: 'type', id: 'type'}}>
                                    {
                                        this.project_types.map(field => {
                                            return (
                                                <MenuItem value={field}>{field}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>

                            {
                                this.state.type === "Year Round Research" ?
                                    <FormControl style={{marginLeft: 50}}>
                                        <InputLabel htmlFor="type">Department</InputLabel>
                                        <Select
                                            style={{width: 280}}
                                            value={this.state.project.department}
                                            onChange={this.handleChange}
                                            inputProps={{name: 'department', id: 'department'}}>
                                            {
                                                this.departments.map(field => {
                                                    return (
                                                        <MenuItem value={field}>{field}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    :
                                    <span/>
                            }
                        </div>
                        <br/>

                        <div>
                            <FormControl required={true}>
                                <InputLabel htmlFor="researchfield">Field of Research</InputLabel>
                                <Select
                                    style={{width: 280}}
                                    value={this.state.project.researchfield}
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
                                    value={this.state.project.secondfield}
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
                                    value={this.state.project.thirdfield}
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
                                value={this.state.project.capacity}
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
                                    control={<Checkbox name="year_quarter_0" checked={this.state.project.year_quarter_0} onChange={this.handleChecked} value="2018-2019 Autumn" />}
                                    label="2018-2019 Autumn"
                                    style={{width: 250}}
                                    />
                                {
                                    this.state.project.year_quarter_0 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.project.compensation_type_0}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation_type_0', id: 'compensation_type_0'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                                <FormControlLabel
                                    control={<Checkbox name="year_quarter_1" checked={this.state.project.year_quarter_1} onChange={this.handleChecked} value="2018-2019 Winter" />}
                                    label="2018-2019 Winter"
                                    style={{width: 250}}
                                    />
                                {
                                    this.state.project.year_quarter_1 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.project.compensation_type_1}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation_type_1', id: 'compensation_type_1'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                                <FormControlLabel
                                    control={<Checkbox name="year_quarter_2" checked={this.state.project.year_quarter_2} onChange={this.handleChecked} value="2018-2019 Spring" />}
                                    label="2018-2019 Spring"
                                    style={{width: 250}}
                                    />
                                {
                                    this.state.project.year_quarter_2 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.project.compensation_type_2}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation_type_2', id: 'compensation_type_2'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                                <FormControlLabel
                                    control={<Checkbox name="year_quarter_3" checked={this.state.project.year_quarter_3} onChange={this.handleChecked} value="2018-2019 Summer" />}
                                    label="2018-2019 Summer"
                                    style={{width: 250}}
                                    />
                                {
                                    this.state.project.year_quarter_3 ?
                                        <FormControl style={{marginLeft: 50}}>
                                            <InputLabel>Compensation Type</InputLabel>
                                            <Select
                                                style={{width: 300}}
                                                value={this.state.project.compensation_type_3}
                                                onChange={this.handleChange}
                                                inputProps={{name: 'compensation_type_3', id: 'compensation_type_3'}}>

                                                <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                            </Select>
                                        </FormControl> : ""
                                }
                            </FormGroup>
                        </div>

                        <div>
                            <TextField
                                label="Project URL (Optional)"
                                id="url"
                                onChange={this.handleChange}
                                inputProps={{name: 'url', id: 'url'}}
                                value={this.state.project.url}
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
                                value={this.state.project.description}
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
                                rows={10}
                                value={this.state.project.background}
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
                                rows={10}
                                value={this.state.project.prerequisite}
                                style={{width: 800, 'border-style': 'dotted', 'border-width': '1px', padding: 5}}/>
                        </div>

                        <br/><br/>

                        {
                            this.state.updating
                                ? <LinearProgress />
                                :
                                    <div>
                                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button variant="contained" color="primary" type="button" onClick={this.handleReset}>Clear
                                            Values</Button>
                                    </div>
                        }
                    </form>
                </Paper>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.dialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">Project</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.dialogText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogClose} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default AddProject