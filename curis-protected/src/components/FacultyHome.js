import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import './components.css'

class CurisInfo extends Component {

    state = {
        infoPage: ""
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/get_dyn_page/faculty.home')
            .then(response => response.text())
            .then(text => this.setState({infoPage: text}))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div>
                <Paper className="add-project-paper" dangerouslySetInnerHTML={{__html: this.state.infoPage}}>
                </Paper>
            </div>
        )
    }
}

export default CurisInfo;