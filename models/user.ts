import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  code?: string;
  verified?: Boolean;
}

const UserSchema = new Schema<IUser>({
  nombre: { type: String, required: [true, "El nombre es obligatorio"] },
  email: {
    type: String,
    required: [true, "El Email es obligatorio"],
    unique: true,
  },
  password: { type: String, required: [true, "La Contraseña es obligatoria"] },
  rol: { type: String, default: ROLES.user },
  code: { type: String },
  verified: { type: Boolean, default: false },
});
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, code, ...usuario } = this.toObject();
  return usuario;
};
const Usuario: Model<IUser> = model<IUser>("Usuario", UserSchema);
export default Usuario;
