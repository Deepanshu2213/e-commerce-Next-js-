import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
export interface UserI {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  id: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  login: (email: string, password: string) => Promise<IUser>;
}

export const userSchema = new Schema<IUser, IUserModel>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ email: email });
  if (user) {
    const passworDB = user.get('password');
    const match = await bcrypt.compare(password, passworDB);
    if ((match || password == passworDB) && email == user.get('email')) {
      user.set('password', undefined);
      return user;
    }
    throw new Error('Invalid password');
  }
  throw new Error('Incorrect Email');
};

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
});
userSchema.pre('find', function () {
  this.select('-password');
});
userSchema.pre('findOne', function () {
  this.select('-password');
});
export const User =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>('User', userSchema);
