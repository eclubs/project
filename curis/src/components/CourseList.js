import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import * as contentful from 'contentful';
import Course from '../components/Course';

const SPACE_ID = '8eb3mhyo9wui';
const ACCESS_TOKEN = '285e237fabc5f606e44d70195903f442686563c263556ecd92582517f47e4bcb';

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

class CourseList extends Component {
    state = {
        courses: [],
        searchString: ''
    }

    constructor() {
        super();
        this.getCourses()
    }

    getCourses = () => {
        client.getEntries({
            content_type: 'entryPoint',
            query: this.state.searchString
        })
            .then(function (entries) {
                // log the title for all the entries that have it
                entries.items.forEach(function (entry) {
                    if(entry.fields.name) {
                        console.log(entry.fields.name)
                    }
                })
            })
        /*.then((response) => {
                this.setState({courses: response.items})
            })*/
        .catch((error) => {
                console.log("Error occured while fetching data");
                console.log(error);
            })
    }

    onSearchInputChange = (event) => {
        /*console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getCourses()*/
    }

    render() {
        return (
            <div>
                {this.state.courses ? (
                    <div>
                        <TextField style={{padding: 24}}
                                   id="searchInput"
                                   placeholder="Search for Items"
                                   margin="normal"
                                   onChange={this.onSearchInputChange()} />
                        <Grid container spacing={24} style={{padding: 24}}>
                            { this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No item found"}
            </div>
        )
    }
}
export default CourseList;