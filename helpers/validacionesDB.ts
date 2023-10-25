import { sendEmail } from "../mailer/mailer";
import Usuario, { IUser } from "../models/user";

export const existeEmail = async (email: string): Promise<void> => {
  const existeEmail: IUser | null = await Usuario.findOne({ email });
  if (existeEmail && existeEmail.verified) {
    throw new Error(`El email ${email} ya está registrado`);
  }
  if (existeEmail && !existeEmail.verified) {
    await sendEmail(email, existeEmail.code as string);
    throw new Error(
      `El email ${email} ya está registrado pero no ha sido verificado, se envio nuevamente el codigo de verificaion a su email`
    );
  }
};
