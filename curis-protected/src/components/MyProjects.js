import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import './components.css'

class MyProjects extends Component {
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

    static years = [
        "2018-2019"
    ];

    static quarters = [
        "Autumn",
        "Winter",
        "Spring",
        "Summer"
    ];

    state = {
        projects: {},
        expandedRows : []
    };

    setProjectsToState(projects) {
        var projects_obj = {};
        for (var i=0; i<projects.length; i++) {
            projects_obj[projects[i].id] = projects[i];
        }
        this.setState({projects: projects_obj});
    }

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/get_my_projects')
            .then(response => response.json())
            .then(data => this.setProjectsToState(data.projects))
            .catch(error => console.error('Error:', error));
    }

    handleRowClick(projectId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(projectId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== projectId) :
            currentExpandedRows.concat(projectId);

        this.setState({expandedRows : newExpandedRows});
    };

    handleChange = (event, proj_id) => {
        console.log(proj_id);

        let projs = {...this.state.projects};
        projs[proj_id][event.target.name] = event.target.value;
        this.setState({projects: projs});

        console.log(this.state);
    };

    handleSubmit(event) {

    }


    renderProject(project) {
        const rowClick = () => this.handleRowClick(project.id);
        const thisProjectRows = [
            <TableRow key={project.id} onClick={rowClick}>
                <TableCell>
                    {
                        project.type === "CURIS"
                        ? <img width="16px" height="16px" alt="CURIS project" title="CURIS project" src="static/images/curis_logo_small.png"/>
                        : <img width="16px" height="16px" alt="Year Round Research Project" title="Year Round Research Project" src="static/images/project_icon.png"/>
                    }
                    &nbsp;&nbsp;&nbsp;
                    {project.title}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{project.researchfield}</TableCell>
            </TableRow>
        ];

        if (this.state.expandedRows.includes(project.id)) {
            thisProjectRows.push(
                <TableRow key={"expanded-" + project.id}>
                    <TableCell colSpan={4}>
                        <Paper className="add-project-paper">
                            <form onSubmit={this.handleSubmit} className="add-project-form">
                                <input type='hidden' name="id" value={project.id} />
                                <div>
                                    <TextField
                                        label="Project Title"
                                        id={"title-" + project.id}
                                        onChange={(e) => this.handleChange(e, project.id)}
                                        inputProps={{name: 'title', id: 'title'}}
                                        value={this.state.projects[project.id].title}
                                        required
                                        style={{width: 800}}/>
                                </div>
                                <br/>

                                <div>
                                    <FormControl required={true}>
                                        <InputLabel htmlFor="type">Project Type</InputLabel>
                                        <Select
                                            style={{width: 280}}
                                            value={this.state.projects[project.id].type}
                                            onChange={(e) => this.handleChange(e, project.id)}
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
                                        this.state.projects[project.id].type === "Year Round Research" ?
                                            <FormControl style={{marginLeft: 50}}>
                                                <InputLabel htmlFor="type">Department</InputLabel>
                                                <Select
                                                    style={{width: 280}}
                                                    value={this.state.projects[project.id].department}
                                                    onChange={(e) => this.handleChange(e, project.id)}
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
                                            value={this.state.projects[project.id].researchfield}
                                            onChange={(e) => this.handleChange(e, project.id)}
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
                                            value={this.state.projects[project.id].secondfield}
                                            onChange={(e) => this.handleChange(e, project.id)}
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
                                            value={this.state.projects[project.id].thirdfield}
                                            onChange={(e) => this.handleChange(e, project.id)}
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
                                    <FormControl required={true}>
                                        <InputLabel>School Year</InputLabel>
                                        <Select
                                            style={{width: 280}}
                                            value={this.state.projects[project.id].year}
                                            onChange={(e) => this.handleChange(e, project.id)}
                                            inputProps={{name: 'year', id: 'year'}}>
                                            {
                                                this.years.map(field => {
                                                    return (
                                                        <MenuItem value={field}>{field}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl style={{marginLeft: 50}}>
                                        <InputLabel>School Quarter</InputLabel>
                                        <Select
                                            style={{width: 280}}
                                            value={this.state.projects[project.id].quarter}
                                            onChange={(e) => this.handleChange(e, project.id)}
                                            inputProps={{name: 'quarter', id: 'quarter'}}>
                                            {
                                                this.quarters.map(field => {
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
                                        value={this.state.projects[project.id].capacity}
                                        onChange={(e) => this.handleChange(e, project.id)}
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
                                            control={<Checkbox name="year_quarter_0" checked={this.state.projects[project.id].year_quarter_0} onChange={this.handleChecked} value="2018-2019 Autumn" />}
                                            label="2018-2019 Autumn"
                                            style={{width: 250}}
                                            />
                                        {
                                            project.year_quarter_0 ?
                                                <FormControl style={{marginLeft: 50}}>
                                                    <InputLabel>Compensation Type</InputLabel>
                                                    <Select
                                                        style={{width: 300}}
                                                        value={this.state.projects[project.id].compensation_type_0}
                                                        onChange={this.handleChange}
                                                        inputProps={{name: 'compensation_type_0', id: 'compensation_type_0'}}>

                                                        <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                        <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                                    </Select>
                                                </FormControl> : ""
                                        }
                                        <FormControlLabel
                                            control={<Checkbox name="year_quarter_1" checked={this.state.projects[project.id].year_quarter_1} onChange={this.handleChecked} value="2018-2019 Winter" />}
                                            label="2018-2019 Winter"
                                            style={{width: 250}}
                                            />
                                        {
                                            project.year_quarter_1 ?
                                                <FormControl style={{marginLeft: 50}}>
                                                    <InputLabel>Compensation Type</InputLabel>
                                                    <Select
                                                        style={{width: 300}}
                                                        value={this.state.projects[project.id].compensation_type_1}
                                                        onChange={this.handleChange}
                                                        inputProps={{name: 'compensation_type_1', id: 'compensation_type_1'}}>

                                                        <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                        <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                                    </Select>
                                                </FormControl> : ""
                                        }
                                        <FormControlLabel
                                            control={<Checkbox name="year_quarter_2" checked={this.state.projects[project.id].year_quarter_2} onChange={this.handleChecked} value="2018-2019 Spring" />}
                                            label="2018-2019 Spring"
                                            style={{width: 250}}
                                            />
                                        {
                                            project.year_quarter_2 ?
                                                <FormControl style={{marginLeft: 50}}>
                                                    <InputLabel>Compensation Type</InputLabel>
                                                    <Select
                                                        style={{width: 300}}
                                                        value={this.state.projects[project.id].compensation_type_2}
                                                        onChange={this.handleChange}
                                                        inputProps={{name: 'compensation_type_2', id: 'compensation_type_2'}}>

                                                        <MenuItem value="Academic Credit">Academic Credit</MenuItem>
                                                        <MenuItem value="RAship (stipend)">RAship (stipend)</MenuItem>
                                                    </Select>
                                                </FormControl> : ""
                                        }
                                        <FormControlLabel
                                            control={<Checkbox name="year_quarter_3" checked={this.state.projects[project.id].year_quarter_3} onChange={this.handleChecked} value="2018-2019 Summer" />}
                                            label="2018-2019 Summer"
                                            style={{width: 250}}
                                            />
                                        {
                                            project.year_quarter_3 ?
                                                <FormControl style={{marginLeft: 50}}>
                                                    <InputLabel>Compensation Type</InputLabel>
                                                    <Select
                                                        style={{width: 300}}
                                                        value={this.state.projects[project.id].compensation_type_3}
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
                                        value={project.url}
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
                                        value={project.description}
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
                                        value={project.background}
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
                                        value={project.prerequisite}
                                        style={{width: 800, 'border-style': 'dotted', 'border-width': '1px', padding: 5}}/>
                                </div>
                            </form>

                        </Paper>
                        <br/><br/>
                    </TableCell>
                </TableRow>
            );
        }

        return thisProjectRows;
    }

    render() {
        var allProjectRows = [];

        for (var project_id in this.state.projects) {
            if (this.state.projects.hasOwnProperty(project_id)) {
                const perProjectRows = this.renderProject(this.state.projects[project_id]);
                allProjectRows = allProjectRows.concat(perProjectRows);
            }
        }

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col">Title</TableCell>
                            <TableCell>Students</TableCell>
                            <TableCell>Research Area</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allProjectRows}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}

export default MyProjects