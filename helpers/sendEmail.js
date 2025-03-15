import 'dotenv/config';
import nodemailer from 'nodemailer';

const { UKR_NET_HOST, UKR_NET_MAIL, UKR_NET_PASSWORD, UKR_NET_PORT } = process.env;
const nodemailerConfig = {
  host: UKR_NET_HOST,
  port: UKR_NET_PORT,
  secure: true,
  auth: {
    user: UKR_NET_MAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

function sendEmail(data) {
  const email = {
    from: `John Doe ${UKR_NET_MAIL}`,
    ...data,
  };

  return transport.sendMail(email);
}

export default sendEmail;
