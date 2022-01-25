import React, {useState, useEffect} from "react";
import { TextField, Button, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts';
import MomentUtils from '@date-io/moment';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
// import { getPosts } from "../../actions/posts";

// GET CURRENT POST ID!

const Form = ( {currentId, setCurrentId} ) => {
    const newDate = new Date()
    const emptyPost ={
        companyName: '',
        positionTitle: '',
        startDate: newDate,
        endDate: newDate,
        companyLocation: '',
        applicationDate: newDate,
        interviewDate: newDate,
        applicant: '',
        referred: false,
        highlighted: false,
        note: '',
        selectedCompanyMediaFile: '',
        priority: 'Medium',
        createdOn: newDate,
    };

    const [postData, setPostData] = useState(emptyPost);
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();

    const clear = () => {
        setCurrentId(null);
        setPostData(emptyPost);
    }

    useEffect(() =>{
        if(post) setPostData(post);
    },[post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData)
        // if no currently selected id, we create a post instead of update!
        if(currentId) {
            dispatch(updatePost(currentId, postData));
        }
        // prevent browser refresh! 
        else{
            dispatch(createPost(postData));
        }
    }




                                                                                    //TODO
//Date picker select value is not working




    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">New job application</Typography>
            <TextField name="companyName" variant="outlined" label="Company Name" fullWidth value={postData.companyName} onChange={(e)=>{setPostData({ ...postData, companyName: e.target.value })}}/>
            <TextField name="positionTitle" variant="outlined" label="Position Title" fullWidth value={postData.positionTitle} onChange={(e)=>setPostData({ ...postData, positionTitle: e.target.value })}/>
            <TextField name="companyLocation" variant="outlined" label="Company location" fullWidth value={postData.companyLocation} onChange={(e)=>setPostData({ ...postData, companyLocation: e.target.value })}/>
            
            {/* use e.target.checked instead of e.target.value here! e.target.value is always false... */}

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker label="Start Date" inputVariant="outlined" value={postData.startDate} onChange={(date) => setPostData({ ...postData, startDate: date }) } />
                <DatePicker label="End Date" inputVariant="outlined" value={postData.endDate} onChange={(date) => setPostData({ ...postData, endDate: date }) } />
                <DatePicker label="Interview Date" inputVariant="outlined" value={postData.interviewDate} onChange={(date) => setPostData({ ...postData, interviewDate: date }) } />
            </MuiPickersUtilsProvider>

            <FormGroup>
                <FormControlLabel control={<Checkbox  value={postData.referred} onChange={(e)=>setPostData({ ...postData, referred: e.target.checked })}/>} label="Referred by an employee" />
            </FormGroup>
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

{/* 
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({ ...postData, creator: e.target.value })}/>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({ ...postData, creator: e.target.value })}/>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({ ...postData, title: e.target.value })}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({ ...postData, message: e.target.value })}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({ ...postData, tags: e.target.value })}/> */}
            <Button className={classes.buttonSubmit} variant="container" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form