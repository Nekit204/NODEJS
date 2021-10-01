const sendmail = require('sendmail')({silent: true});
const from="enderfillvxc@gmail.com"
const to="lucaskreygon@gmail.com"

function send(message)
{
    sendmail({
        from: to,
        to: from,
        subject: 'm0603',
        html: message
    }, function (err, reply){
        console.log(err && err.stack);
        console.dir(reply);
    });
}
module.exports = {send:send};