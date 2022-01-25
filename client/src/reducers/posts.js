export default (posts = [], action) => {
    switch (action.type){
        //return value is the array of posts
        case 'UPDATE':{
            return posts.map((post) => post._id===action.payload._id ? action.payload : post)
            // return posts.map((post) => post===action.payload._id ? action.payload : post)
        }
        case 'FETCH_ALL':
            return action.payload;
            //why payload is undefined???
        case 'CREATE':
            return [...posts, action.payload];







            
        //DOUBLE CHECK
        case 'DELETE':
            //id of the deleted post is passed down from action
            return posts.filter((p)=>p._id !== action.payload);
// action.payload is the id of the post we want to delete, NOT action._id !!!!!


        default:
            return posts;
    }
}