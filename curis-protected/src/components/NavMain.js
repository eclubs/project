import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import NavMainCard from './NavMainCard'
import './components.css'

class NavMain extends Component {

    gotoAdmin = () => {
        window.location.href = '/protected/index.php/Csresearch/admin';
    };

    render() {
        return(
            <div>
                <Grid container direction="row"
                      justify="center"
                      alignItems="flex-start"
                      spacing={24} style={{padding: 64, 'margin-top': '64px'}}>
                    <Grid item>
                        <NavMainCard
                            id="academic_year_research"
                            text="Academic Year Research"
                            image="static/images/orange_google_cloud.png"
                            pageHandler={this.props.pageHandler}/>
                    </Grid>
                    <Grid item>
                        <NavMainCard
                            id="curis"
                            text="CURIS"
                            image="static/images/green_google_cloud.png"
                            pageHandler={this.props.pageHandler}/>
                    </Grid>
                    <Grid item>
                        <NavMainCard
                            id="projects"
                            text="Post Projects"
                            image="static/images/blue_google_cloud.png"
                            pageHandler={this.props.pageHandler}/>
                    </Grid>
                    <Grid item>
                        <NavMainCard
                            id="admin"
                            text="Admin"
                            image="static/images/yellow_google_cloud.png"
                            pageHandler={this.gotoAdmin}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default NavMain;