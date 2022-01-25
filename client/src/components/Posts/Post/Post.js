import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useStyles from './styles';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { deletePost } from "../../../actions/posts";
import { updatePost } from "../../../api";
import { useSelector } from "react-redux";


const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    //DOUBLE CHECK
    const handleDelete = () => {
        dispatch(deletePost(post._id))
        //redux state must be changed here in order for the effect to take place without refreshing!
    }
    //change post state here???


//need useeffect?
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.positionTitle}, {post.companyName}</Typography>
                <Typography variant="body2">{post.companyLocation}</Typography>
                <br/>
                <Typography variant="body2">{`Applied on:${moment(post.createdOn).format('YYYY-MM-DD')}`}</Typography>
                <Typography variant="body2">{`Start date:${moment(post.startDate).format('YYYY-MM-DD')}`}</Typography>
                <Typography variant="body2">{`End date:${moment(post.endDate).format('YYYY-MM-DD')}`}</Typography>


            </div>
            {/* <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={()=>{
                    setCurrentId(post._id)
                }}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <CardContent>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.message}</Typography>
            </CardContent> */}
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Pin
                </Button>
                <Button size="small" color="primary" onClick={handleDelete}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post