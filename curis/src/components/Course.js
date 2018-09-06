import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Course = (props) => {
    return(
        <div>
            { props ? (
                <Card>
                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                               image={props.fields.imageMedium.file.url}
                               title={props.fields.name}
                               />
                </Card>
            ): null }
        </div>
    )
}
export default Course
