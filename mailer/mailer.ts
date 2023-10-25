import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zepcion@gmail.com",
    pass: "pklp lwel yxhj csjt",
  },
  from: "zepcion@gmail.com",
});

export const sendEmail = async (email: string, code: string): Promise<void> => {
  const mailOptions = {
    from: '"Juan Pablo"zepcion@gmail.com',
    to: email,
    subject: "Código de verificación",
    text: `
            Llego tu codigo para Estilo Rustico.
            El código es ${code}
            
            `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado");
  } catch (error) {
    console.error("Error al enviar  el Email", error);
  }
};
