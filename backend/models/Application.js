const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ApplicationSchema = new Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mis: {
        type: String, //stored as a string to validate its format
        required: [true, 'MIS number is required'],
        trim: true,
        match: [/^\d{9}$/, 'Please enter a valid 9-digit MIS number']
    },

    fromDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    toDate: {
        type: Date,
        required: [true, 'End date is required']
    },

    parentName: {
        type: String,
        required: [true, "Parent's name is required"],
        trim: true,
        minlength: 2
    },

    parentMobile: {
        type: String,
        required: [true, "Parent's mobile number is required"],
        trim: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number']
    },

    room: {
        type: String,
        required: [true, 'Room number is required'],
        trim: true,
        minlength:2
    },

    address: {
        type: String,
        required: [true, 'Travel address is required'],
        trim: true,
        minlength: 10
    },

    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    wardenRemark: {
        type: String,
        trim: true
    }
},{
    timestamps:true
});
const ApplicationModel=mongoose.model('Application', ApplicationSchema);
module.exports=ApplicationModel;
