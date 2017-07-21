import passport from 'passport';
import LocalStrategy from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';

import User from '../modules/users/user.model';
import constants from '../configs/constants';

//Local strategy
const localOpts = {
    usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const user = await User.findOne({email});

         if (!user) {
            return done(null, false);
        } else if (!user.comparePassword(password)) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
});

//Jwt strategy
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
    secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', {session: false});
export const authJwt = passport.authenticate('jwt', {session: false});