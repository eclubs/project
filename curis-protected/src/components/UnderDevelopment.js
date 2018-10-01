import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './components.css'

class NavMain extends Component {

    render() {
        return(
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                <Card className="ud_card">

                    <CardMedia
                        className="ud_card_media"
                        image="static/images/under_dev3.png"
                        title="Under Development"
                        />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            CURIS site under development...
                        </Typography>
                        <Typography component="p">
                            2018

                        </Typography>

                    </CardContent>

                    <br/>
                </Card>
            </Grid>
        )
    }
}
export default NavMain;
