if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const listRoutes = require('./routes/lists');
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require("connect-mongo");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const dbUrl = process.env.ATLAS_URL || 'mongodb://127.0.0.1:27017/todo';
mongoose.connect(dbUrl)
    .then(() => {
        console.log('mongo database connected');
    })
    .catch((err) => {
        console.log('mongo connection error!!');
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
    replaceWith: '_'
}))

const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

//creating a session
const sessionConfig = {
    store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        name: 'session',
        httpOnly: true,
        // secure: true, //this line makes sure that only https and not http has access to our cookies
        // the problem is that localhost is also http, therefore we won't be able to login or use any other cookie on localhost
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        //auto deletes after 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdnjs.cloudflare.com/",
];
const connectSrcUrls = [
];
const fontSrcUrls = [
    "https://cdnjs.cloudflare.com/",
    "https://fonts.gstatic.com",
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use((req, res, next) => {
    res.locals.user_id = req.session.user_id;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.caution = req.flash('caution');
    next();
})

app.get('/', (req, res, next) => {
    res.render('landingPage');
})

app.use('/', userRoutes);

app.use('/home', listRoutes);

app.use('/home/:id', itemRoutes);


app.all('*', (req, res, next) => {
    next(new Error('Page Not Found'));
})

const handleValidationErr = err => {
    console.log(err);
    return new Error(`Validation Failed... ${err.message}`);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') {
        err = handleValidationErr(err);
    }
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Oh no! Something went Wrong!';
    console.log("****error****", err);
    res.status(status).render('error', { err });
    next(err);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});