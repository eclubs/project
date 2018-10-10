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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

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

    years = [
        "2018-2019"
    ];

    quarters = [
        "Autumn",
        "Winter",
        "Spring",
        "Summer"
    ];

    constructor(props) {
        super(props);

        this.state = {
            projects: {},
            expandedRows : [],
            dialogOpen: false,
            dialogText: "",
            confirmDialogOpen: false,
            confirmDialogText: "",
            projectIdToDelete: 0,
            loading: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.dialogClose = this.dialogClose.bind(this);
        this.handleComfirmOk = this.handleComfirmOk.bind(this);
        this.handleComfirmCancel = this.handleComfirmCancel.bind(this);
    }



    setProjectsToState(projects) {
        var projects_obj = {};
        for (var i=0; i<projects.length; i++) {
            projects_obj[projects[i].id] = projects[i];
            projects_obj[projects[i].id]["updating"] = false;
        }
        this.setState({projects: projects_obj});
        //console.log(this.state);
    }

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/get_my_projects')
            .then(response => response.json())
            .then(data => {
                this.setProjectsToState(data.projects);
                this.setState({loading: false});
            })
            .catch(error => console.error('Error:', error));
    }

    handleRowClick(projectId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(projectId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== projectId) :
            currentExpandedRows.concat(projectId);

        this.setState({expandedRows : newExpandedRows});
    }

    handleChange = (event, proj_id) => {
        let projs = {...this.state.projects};
        projs[proj_id][event.target.name] = event.target.value;
        this.setState({projects: projs});
    }

    handleSubmit(event, proj_id) {
        event.preventDefault();

        this.projectUpdating(proj_id);

        const form = event.target;
        const data = new FormData(form);

        fetch('/protected/index.php/Csresearch/update_project', {
            method: 'POST',
            body: data})
            .then(response => response.json())
            .then(r => {
                if (r.success) {
                    this.setState({dialogText: "Project successfully updated."});
                    this.setState({dialogOpen: true});
                }
                else {
                    this.setState({dialogText: "Project update failed."});
                    this.setState({dialogOpen: true});
                }
                this.projectDoneUpdating(proj_id);
            })
            .catch(error => console.error('Error:', error));
    }

    handleDelete(proj_id) {
        let text = "Are you sure you want to delete project \"" + this.state.projects[proj_id].title + "\"?";
        this.setState({projectIdToDelete: proj_id});
        this.setState({confirmDialogText: text});
        this.setState({confirmDialogOpen: true});


    }

    handleComfirmOk() {
        this.projectUpdating(this.state.projectIdToDelete);
        let data = {id: this.state.projectIdToDelete};
        fetch('/protected/index.php/Csresearch/remove_project', {
            method: 'POST',
            body: data})
            .then(response => response.json())
            .then(r => {
                if (r.success) {
                    this.setState({dialogText: "Project successfully deleted."});
                    this.setState({dialogOpen: true});
                }
                else {
                    this.setState({dialogText: "Project delete failed."});
                    this.setState({dialogOpen: true});
                }
                this.projectDoneUpdating(this.state.projectIdToDelete);
            })
            .catch(error => console.error('Error:', error));
    }

    handleComfirmCancel() {
        this.setState({projectIdToDelete: 0});
        this.setState({confirmDialogOpen: false});
    }

    dialogClose() {
        this.setState({dialogOpen: false});
    }

    confirmDialogClose() {
        this.setState({confirmDialogOpen: false});
    }

    projectUpdating(project_id) {
        let projs = {...this.state.projects};
        projs[project_id]["updating"] = true;
        this.setState({projects: projs});
    }

    projectDoneUpdating(project_id) {
        let projs = {...this.state.projects};
        projs[project_id]["updating"] = false;
        this.setState({projects: projs});
    }


    renderProject(project) {
        const rowClick = () => this.handleRowClick(project.id);
        const thisProjectRows = [
            <TableRow key={project.id} onClick={rowClick}>
                <TableCell className="my_project_table_title">
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
                            <form onSubmit={(e) => this.handleSubmit(e, project.id)}>
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
                                            value={this.state.projects[project.id].term}
                                            onChange={(e) => this.handleChange(e, project.id)}
                                            inputProps={{name: 'term', id: 'term'}}>
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

                                <div>
                                    <TextField
                                        label="Project URL (optional)"
                                        id="url"
                                        onChange={(e) => this.handleChange(e, project.id)}
                                        inputProps={{name: 'url', id: 'url'}}
                                        value={this.state.projects[project.id].url}
                                        style={{width: 800}}/>
                                </div>
                                <br/>
                                <br/>

                                <div>
                                    <TextField
                                        label="Description"
                                        id="description"
                                        onChange={(e) => this.handleChange(e, project.id)}
                                        inputProps={{name: 'description', id: 'description'}}
                                        required
                                        multiline={true}
                                        rows={10}
                                        value={this.state.projects[project.id].description}
                                        className="my_project_description_input"/>
                                </div>
                                <br/>

                                <div>
                                    <TextField
                                        label="Recommended Background"
                                        id="background"
                                        onChange={(e) => this.handleChange(e, project.id)}
                                        inputProps={{name: 'background', id: 'background'}}
                                        required
                                        multiline={true}
                                        rows={10}
                                        value={this.state.projects[project.id].background}
                                        className="my_project_description_input"/>
                                </div>
                                <br/>

                                <div>
                                    <TextField
                                        label="Prerequisite / Preparation"
                                        id="prerequisite"
                                        onChange={(e) => this.handleChange(e, project.id)}
                                        inputProps={{name: 'prerequisite', id: 'prerequisite'}}
                                        required
                                        multiline={true}
                                        rows={10}
                                        value={this.state.projects[project.id].prerequisite}
                                        className="my_project_description_input"/>
                                </div>

                                <br/><br/>

                                <div>
                                    {
                                        project.updating
                                            ? <LinearProgress />
                                            : <div>
                                                <Button variant="contained" color="primary" type="submit">Update</Button>
                                                <img src="static/images/trash1.png" className="my_project_trash_button" onClick={() => this.handleDelete(project.id)}/>
                                              </div>
                                    }
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

    renderDialog() {
        return (
            <Dialog
                open={this.state.dialogOpen}
                onClose={this.dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
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
        )
    }

    renderConfirmDialog() {
        return (
            <Dialog
                open={this.state.confirmDialogOpen}
                onClose={this.confirmDialogClose}
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                >
                <DialogTitle id="confirmation-dialog-title">Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.state.confirmDialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleComfirmOk} color="primary">
                        Yes
                    </Button>
                    <Button onClick={this.handleComfirmCancel} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
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
            this.state.loading
                ? <CircularProgress size={50} style={{marginTop: 220}}/>
                :
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

                        { this.renderDialog() }
                        { this.renderConfirmDialog() }
                    </Paper>
        );
    }

}

export default MyProjects