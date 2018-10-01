import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class MyProjects extends Component {

    state = {
        projects: []
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/get_my_projects')
            .then(response => response.json())
            .then(data => this.setState({projects: data.projects}))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Students</TableCell>
                            <TableCell>Research Area</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.projects.map(project => {
                            return (
                                <TableRow key={project.id}>
                                    <TableCell component="th" scope="row">
                                        {project.title}
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{project.researchfield}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}

export default MyProjects