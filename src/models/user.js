import { model, Schema } from 'mongoose';
//модель пользователя
const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
//если пользователь не ввел имя, имя=почта
userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});
//удалил пароль из ответа
userSchema.method.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
