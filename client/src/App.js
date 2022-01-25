import React, { useEffect, useState } from "react";
import { Container, AppBar,  Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from './actions/posts';
import memories from './images/memories.png';
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from './styles';

const App = () =>{
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPosts());
    },[dispatch])

    return (
        <Container maxidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h4" align="center">
                    Welcome back! You have applied to {posts? posts.length : 0} jobs in total this season.
                </Typography>
                {/* <img className={classes.heading} src={memories} alt="memories" height="60"/> */}
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;