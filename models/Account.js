import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const accountSchema = new mongoose.Schema({
    accountId : {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:item=>{
                return item.length >= 6
            },
            message:"Tên tài khoản phải dài hơn 6 kí tự"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:item=>{
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(item)
            },
            message:"Email không hợp lệ"
        }
    },
    password: {
        type: String,
        required: true,
        validate:{
            validator:item=>{
                return item.length >= 8
            },
            message:"Mật khẩu phải dài hơn 8 kí tự"
        }
    },
    name: {
        type: String,
        required: true,
    },
    
    is_active: {
        type: Boolean,
        default: false,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    bonus_point: {
        type: Number,
        default: 0,
    },
    avatar: {
        type: String,
        default:"https://1.bp.blogspot.com/-CV8fOXMMw60/YZ-UJ4X9sAI/AAAAAAAACMc/2Svet97exjgNdJ9CeTKUU3OuA-mnCQEzwCLcBGAsYHQ/s595/3a.jpg"
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true });

accountSchema.plugin(AutoIncrement, { inc_field: 'accountId' });
export const Account = mongoose.model('Account', accountSchema);
