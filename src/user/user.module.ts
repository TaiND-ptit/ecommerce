import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            if (!this.isModified('password')) {
              next();
            }
            const salt = bcrypt.genSaltSync(10);
            this.password = await bcrypt.hash(this.password, salt);
          });
          // schema.methods = {
          //   isCorrectPassword: async function (password: string) {
          //     return await bcrypt.compareSync(password, this.password);
          //   }
          // }
          return schema;
        },
      },
    ]),
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
