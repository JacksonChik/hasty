import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    companyName: String,
    positionTitle: String,
    startDate: Date,
    endDate: Date,
    companyLocation: String,
    applicationDate: {
        type: Date,
        default: new Date()
    },
    interviewDate: {
        type: Date,
        default: undefined
    },
    applicant: String,
    referred: {
        type: Boolean,
        default: false
    },
    highlighted: {
        type: Boolean,
        default: false
    },
    note: String,
    selectedCompanyMediaFile: String,
    priority:{
        type: String,
        default: "Medium"
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage; 