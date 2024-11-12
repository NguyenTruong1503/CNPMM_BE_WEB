import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.config.js';
import 'dotenv/config';

const sendMail = async (to, subject, htmlContent) => {
    try {
        const transport = nodemailer.createTransport({
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: false, // Set to true if using SSL/TTLS
            auth: {
                user: mailConfig.USERNAME,
                pass: mailConfig.PASSWORD,
            },
        });

        const options = {
            from: `"Manga Store - Đuổi Theo Manga" <${mailConfig.FROM_ADDRESS}>`,
            to,
            subject,
            html: htmlContent,
        };

        const info = await transport.sendMail(options);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendMail;