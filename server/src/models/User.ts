import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: { type: String },
    name: {
      type: String,
      required: true,
    },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = model('User', schema);

export default User;
