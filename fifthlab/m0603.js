const from="***********************"
const to="********************"
const nodemailer=require("nodemailer");
function send(message)
{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'***********' ,
            pass: '****************'
        },
    });
    transporter.sendMail({
        from: from,
        to: to,
        subject: "LABTEST",
        text: message,
    });
}
module.exports = {send:send};