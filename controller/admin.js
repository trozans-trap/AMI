var bcrypt = require('bcryptjs');
var User = require('../models/user')


exports.home = async (req, res) => {
    res.render('home');
}

exports.getSignup = async (req, res) => {

    res.render('signup');
}

exports.Signup = async (req, res) => {
    const { username, name, email, password, phone, city, state } = req.body;
    const newUser = new User({
        username,
        name,
        email,
        password,
        phone,
        city,
        state
    });
    console.log(newUser);

    User.findOne({ username: username }).then(
        user => {
            if (user)
                res.render('error', { error: "Username alredy Used try another" });
            else {
                User.findOne({ email: email }).then(
                    user => {
                        if (user)
                            res.render('error', { error: "email alredy Used try another" });
                        else {
                            //Hash Password
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) res.render('error', { error: err });
                                    //Set password to hashed
                                    newUser.password = hash;
                                    //save User
                                    newUser.save().then((person) => {
                                        console.log(person);
                                        res.render('success', { data: "Registerd Succesfully" });
                                    }).catch(err => {
                                        console.log(err);
                                        res.render('error', { error: err });
                                    });
                                });
                            });
                        }
                    });
            }
        }
    )


}


exports.getLogin = async (req, res) => {
    res.render('login');
}

//Login POST
var olduser = null;
exports.Login = async (req, res) => {

    const { username, password } = req.body;
    if (!username | !password)
        res.render('home');
    else {
        User.findOne({ username: username })
            .then(user => {

                if (user) {
                    olduser = username;
                    console.log(user);
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err)
                            throw err;
                        if (isMatch) {
                            res.render('dashboard');
                        }
                        else {
                            res.render('error', { error: "Wrong Password" });
                        }
                    });
                }
                else
                    res.render('error', { error: "No such User Exists" });
            });
    }
}


exports.dashboard = async (req, res) => {
    if (olduser != null)
        res.render('dashboard');
}



exports.getAbout = async (req, res) => {
    if (olduser != null)
        res.render('about');
}

exports.getOrder = async (req, res) => {
    if (olduser != null)
        res.render('order');
}

exports.getResources = async (req, res) => {
    if (olduser != null)
        res.render('consuling');
}

exports.Team = async (req, res) => {
    if (olduser != null)
        res.render('Team');
}

exports.counsel = async (req, res) => {
    if (olduser != null)
        res.render('consul');
}

exports.logout = async (req, res) => {
    olduser = null;
    res.render('home')
}