import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from './address.schema';
import { Product } from './product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: [] })
  cart: any[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  wishlist: Product;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop()
  refreshToken: string;

  @Prop()
  passwordChangedAt: string;

  @Prop()
  passwordResetToken: string;

  @Prop()
  passwordResetExpires: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

