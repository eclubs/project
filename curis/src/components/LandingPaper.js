import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './components.css'

class LandingPaper extends Component {

    state = {
        landingText: ""
    };

    enter = () => {
        window.location.href = '/protected/index.html';
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/get_dyn_page/landing')
            .then(response => response.text())
            .then(text => this.setState({landingText: text}))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (this.state.landingText === "")
            ?
                (
                    <div className="div_spinning">
                        <img src="static/images/spinning2.gif"/>
                    </div>
                )
            :
                (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        >

                        <Card className="card">

                            <CardMedia
                                className="media"
                                image="static/images/cs-building.jpg"
                                title="Gates"
                                />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">

                                </Typography>
                                <Typography component="p" dangerouslySetInnerHTML={{__html: this.state.landingText}}>

                                </Typography>

                                <Typography component="p">
                                    <br/>
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button size="medium" color="primary" onClick={this.enter}>
                                    Enter
                                </Button>
                            </CardActions>
                            <br/>
                        </Card>
                    </Grid>
                );
    }
}

export default LandingPaper;