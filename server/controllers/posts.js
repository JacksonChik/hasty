import express from 'express';
import mongoose from 'mongoose';   

import PostMessage  from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createPost = async (req, res) => {

    const newPostMessage = new PostMessage(req.body)
//is this ok?

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const updatePost = async (req,res) => {
    const {id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}); 

    res.json(updatedPost);
}








//DOUBLE CHECK
export const deletePost = async (req, res) => {
    try{
        const {id: _id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        const postAfterDelete = await PostMessage.findByIdAndDelete(_id);

        res.status(200).json(postAfterDelete);
    } catch (error) {
        res.status(404).json({ message: error });

    }

}

export default router;