import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import './components.css'

class CurisHome extends Component {

    state = {
        infoPage: "",
        loading: true
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/get_dyn_page/curis.home')
            .then(response => response.text())
            .then(text => this.setState({infoPage: text, loading: false}))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            this.state.loading
                ? <CircularProgress size={50} style={{marginTop: 220}}/>
                : <Paper className="content-paper" dangerouslySetInnerHTML={{__html: this.state.infoPage}}></Paper>

        )
    }
}

export default CurisHome;