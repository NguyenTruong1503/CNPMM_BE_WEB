import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const accountSchema = new mongoose.Schema({
    accountId : {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        default: "Anonymous",
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
    phone: {
        type: String,
        default: '',
        validate: {
            validator: item => {
                // Kiểm tra độ dài và ký tự số
                return item.length === 10 && /^[0-9]+$/.test(item);
            },
            message: "Số điện thoại không hợp lệ"
        }
    },
    is_active: {
        type: Boolean,
        default: true,
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
        type:String,
        default:"https://1.bp.blogspot.com/-CV8fOXMMw60/YZ-UJ4X9sAI/AAAAAAAACMc/2Svet97exjgNdJ9CeTKUU3OuA-mnCQEzwCLcBGAsYHQ/s595/3a.jpg"
    },
}, { timestamps: true });

accountSchema.plugin(AutoIncrement, { inc_field: 'accountId', start_seq: 1 });
export const Account = mongoose.model('Account', accountSchema);
