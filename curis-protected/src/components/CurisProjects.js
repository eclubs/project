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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import './components.css'

class CurisProjects extends Component {

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
        "2018-2019",
        "2019-2020"
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


    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects() {
        /*fetch('/protected/index.php/Csresearch/get_my_projects')
            .then(response => response.json())
            .then(data => {
                this.setProjectsToState(data.projects);
                this.setState({loading: false});
            })
            .catch(error => console.error('Error:', error));*/
    }

    handleRowClick(projectId) {
        /*const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(projectId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== projectId) :
            currentExpandedRows.concat(projectId);

        this.setState({expandedRows : newExpandedRows});*/
    }



    /*handleSubmit(event, proj_id) {
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
    }*/

    /*handleComfirmOk() {
        this.confirmDialogClose();
        this.projectUpdating(this.state.projectIdToDelete);
        let formData = new FormData();
        formData.set('id', this.state.projectIdToDelete);

        fetch('/protected/index.php/Csresearch/remove_project', {
            method: 'POST',
            body: formData})
            .then(response => response.json())
            .then(r => {
                if (r.success) {
                    this.fetchMyProjects();
                    this.setState({dialogText: "Project successfully deleted."});
                    this.setState({dialogOpen: true});
                }
                else {
                    this.setState({dialogText: "Project delete failed."});
                    this.setState({dialogOpen: true});
                }
                this.projectDoneUpdating(this.state.projectIdToDelete);
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({dialogText: "Error when deleting project, see log for details."});
                this.setState({dialogOpen: true});
                this.projectDoneUpdating(this.state.projectIdToDelete);
            });
    }*/

    /*handleComfirmCancel() {
        this.setState({projectIdToDelete: 0});
        this.setState({confirmDialogOpen: false});
    }

    dialogClose() {
        this.setState({dialogOpen: false});
    }

    confirmDialogClose() {
        this.setState({confirmDialogOpen: false});
    }*/


    renderFilters() {
        return (
            <Select
                style={{width: 280}}
                onChange={this.handleChange}
                inputProps={{name: 'year', id: 'year'}}>
                {
                    this.years.map(field => {
                        return (
                            <MenuItem value={field}>{field}</MenuItem>
                        );
                    })
                }
            </Select>
        )
    }

    render() {
        return (
            <div>
                { this.renderFilters() }
            </div>
        )
    }

}

export default CurisProjects