import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';

export default app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(passport.initialize());
    app.use(morgan('dev'));
};