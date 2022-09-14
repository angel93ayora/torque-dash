const User = require('../models').User;
const ForwardUrl = require('../models').ForwardUrl;
const passport = require('passport');
const shortid = require('shortid');

class UserController {
    static async login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next);
    }
    static logout(req, res) {
        req.logout();
        req.flash('success', 'You have been logged out.');
        res.redirect('/login');
    }
    static async register(req, res) {
        try {
            // Get userdata from request
            let { email, password } = req.body;

            // Validate if user data ok
            const { error } = User.validate(req.body);
            if (error) return res.render('register', { error: error.message });

            // Check if user is already registered
            let user = await User.findOne({ where: { email: email } });
            if (user) return res.render('register', { error: 'This email is already registered' });

            // Save new user to db
            user = await User.create({ email: email, password: password });

            // Send response
            req.flash('success', 'Account created. You may now log in.');
            return res.redirect('/login');

        } catch (err) {
            console.log('Error:', err.message);
            res.sendStatus(500);
        }
    }
    static async getForwardUrls(req, res) {
        try{
            let user = await User.findOne({
                where: { id: req.user.id }
            });

            let forwardUrlsObjects = await user.getForwardUrls();
            let forwardUrls = [];
            for (let obj of forwardUrlsObjects)
                forwardUrls.push(obj.value);

            res.send(forwardUrls);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
    static async updateForwardUrls(req, res) {
        try{
            let urls = req.body.urls;
            let user = await User.findOne({
                where: { id: req.user.id }
            });

            await ForwardUrl.destroy({where: {userId: user.id}});
            
            if (!urls)
                return res.sendStatus(200);
            
            
            if (urls.constructor.name != "Array")
                return res.sendStatus(500);
            
            for (let k in urls)
                urls[k] = {value: "" + urls[k]};

            let fwInstances = await ForwardUrl.bulkCreate(urls);
            user.setForwardUrls(fwInstances);

            res.sendStatus(200);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
    static async getShareId(req, res) {
        try{
            let user = await User.findOne({
                where: { id: req.user.id }
            });
            let shareId = user.shareId;
            console.log(shareId);
            res.status(200).send(shareId);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
    static async toggleShareId(req, res) {
        try{
            let user = await User.findOne({
                where: { id: req.user.id }
            });
            let shareId = user.shareId;
            if(!shareId){
                await user.update({ shareId: shortid.generate() });
            }
            else {
                await user.update({ shareId: null });
            }
            res.sendStatus(200);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}

module.exports = UserController;