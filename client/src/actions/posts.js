import * as api from '../api'

// Action Creators (functions that return actions, action is an object that has a type and a payload)
export const getPosts = () => async(dispatch) => {
    try{
        const { data } = await api.fetchPosts();
        //data represents the post
        dispatch({type:'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error)
        //never console log error.message instead of error! information is lost this way!
    }
}

export const createPost = (post) => async(dispatch) => {
    try{
        const { data } = await api.createPost(post);
        dispatch({ type:'CREATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try{
        const { data } = await api.updatePost(id, post);    
        dispatch({type:'UPDATE', payload: data});
        //better to set type as constants!
    } catch(error){
        console.log(error)
    }
}






    //DOUBLE CHECK
    export const deletePost = (id) => async(dispatch) => {
        try{
            
            const { data } = await api.deletePost(id);    

            dispatch({type:'DELETE', payload: id});
            //better to set type as constants!
        } catch(error){
            console.log(error)
    }
}
