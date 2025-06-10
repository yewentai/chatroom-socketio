import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = model('Message', messageSchema);

export default Message;