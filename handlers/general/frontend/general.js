const validator = require('validator');

let queryEmqail = function (req, res) {
    let mailOptions;
    let { email, query, subject } = req.body;
    
    if (email === undefined) {
        return res.status(500).json({
            response: false,
            message: "Please provide email address."
        });
    }
    if (!validator.isEmail(email)) {
        return res.status(500).json({
            response: false,
            message: "Invalid email."
        });
    }
    if (typeof query !== 'string') {
        return res.status(500).json({
            response: false,
            message: "query is required as a string.."
        });
    }
    if (typeof subject !== 'string') {
        return res.status(500).json({
            response: false,
            message: "Subject for the query is required as a string."
        });
    }

    mailOptions = {
        to: email,
        subject: "User Query",
        html: `<h2>${subject}</h2><p>
        ${query}
        </p>`
    };

    smtpTransport.sendMail(mailOptions, function (err, success) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to send the email."
            });
        } else {
            res.status(200).json({
                response: true,
                message: "Query sent."
            });
        }
    });
}

module.exports = {
    queryEmqail,
}