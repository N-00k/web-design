
// require('./db/conn'); 
require('dotenv').config()
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controller/Product');
const categoriesRouter = require('./routes/Categories')
const brandsRouter = require('./routes/Brands')
const productsRouter = require('./routes/Products')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/Users')
const authRouter = require('./routes/Auth');
const { loginUser } = require('./controller/Auth');
const cartRouter = require('./routes/Cart')
const ordersRouter = require('./routes/Order')
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
////
const jwt = require('jsonwebtoken');
////
const crypto = require('crypto');
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');
const { log } = require('console');
const { User } = require('./model/User');
const { type } = require('os');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



const SECTRET_KEY = 'SECTRET_KEY';
///JSW option 


const path = require('path');

const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;





/////middlewares
server.use(express.static(path.resolve(__dirname, 'build')))
server.use(cookieParser());

server.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

server.use(passport.authenticate('session'));

server.use(
    cors({
        exposedHeaders: ['X-Total-Count'],
    })
);


server.use(express.json()); //////// to parse req.body   
server.use(express.raw({ type: '*/*' }))

server.use('/products', productsRouter.router)
server.use('/categories', categoriesRouter.router)
server.use('/brands', brandsRouter.router)

server.use('/users', isAuth(), userRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart', isAuth(), cartRouter.router)
server.use('/orders', isAuth(), ordersRouter.router)


passport.use(
    'local',
    new LocalStrategy({ usernameField: 'email' }, async function (
        email,
        password,
        done
    ) {
        // by default passport uses username
        // console.log({ email, password });
        try {
            //////console.log(req.bo    dy);

            const user = await User.findOne({ email: email });
            //////TODO:///this temporay , we will use striong password  auth
            // console.log({ email, password, user });

            if (!user) {
                done(null, false, { message: 'invalid credentials' }) //// it for safety  
            }
            crypto.pbkdf2(
                password,
                user.salt,
                310000,
                32,
                'sha256',
                async function (err, hashedPassword) {
                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                        return done(null, false, { message: 'invalid credentials' })
                        ///this lines sends to serializer  
                    }
                    const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
                    // console.log("Token", token);

                    done(null, { id: user.id, role: user.role, token });//////this lines sends to serializer
                })
        } catch (err) {
            done(err);
        }
    }
    ));

passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log("Jwt_pay");

    // console.log("jwt_payload", typeof (jwt_payload));
    try {
        const user = await User.findById(jwt_payload.id)
        if (user) {
            return done(null, sanitizeUser(user));
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);

    }

}));


//////this create session variable req.user on being called from callback 
passport.serializeUser(function (user, cb) {
    // console.log('serialize', user);
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            role: user.role
        });
    });
});
/////// this change session variable req.user when called from authorised request 
passport.deserializeUser(function (user, cb) {
    // console.log('deserialize', user);

    process.nextTick(function () {
        return cb(null, user);
    });
});

//////////////Payments///////////////////////////////////////start paymen


// // server.post("/create-payment-intent", async (req, res) => {
// //     const { totalAmount } = req.body;

// //     // Create a PaymentIntent with the order amount and currency
// //     const paymentIntent = await stripe.paymentIntents.create({
// //         amount: totalAmount * 100,////    
// //         currency: "usd",
// //         automatic_payment_methods: {
// //             enabled: true,
// //         },
// //     });

// //     res.send({
// //         clientSecret: paymentIntent.client_secret,
// //     });
// // });

// // server.post('/create-payment-intent', async (req, res) => {
// //     const { totalAmount, orderId } = req.body;
// //     console.log("hello", req.body);

// //     ////////////////old Create a PaymentIntent with the order amount and currency///////////
// //     // const paymentIntent = await stripe.paymentIntents.create({
// //     //     amount: totalAmount * 100, // for decimal compensation
// //     //     currency: 'inr',
// //     //     automatic_payment_methods: {
// //     //         enabled: true,
// //     //     },
// //     //     metadata: {
// //     //         orderId,
// //     //     },
// //     // });
// //     const paymentIntent = await stripe.paymentIntents.create({
// //         amount: 2000, // $20.00 in cents
// //         currency: 'usd',
// //         automatic_payment_methods: {
// //             enabled: true,
// //         },
// //     });
// //     res.send({
// //         clientSecret: paymentIntent.client_secret,
// //     });


// // });


// server.post("/create-payment-intent", async (req, res) => {
//    const { totalAmount } = req.body;

//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: totalAmount * 100,
//         currency: "usd",
//         // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//         automatic_payment_methods: {
//             enabled: true,
//         },
//     });

//     res.send({
//         clientSecret: paymentIntent.client_secret,
//     });
// });



// ///////////////////
// main().catch(err => console.log(err))
// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
//     console.log('database connected');   /////data base has been connected 
// }



// server.listen(8080, () => {
//     console.log('server started');

// })

////////////////////////////end 
///////////////////////COPYYYYYYYYYYYYYYYYy
// Payments

// This is your test secret API key.

const stripe = require('stripe')(process.env.STRIPE_SERVER_KEY);

server.post('/create-payment-intent', async (req, res) => {
    const { totalAmount, orderId } = req.body;
    console.log("hello", req.body);


    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // for decimal compensation
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            orderId,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});


//////////Webhooks
const endpointSecret = process.env.ENDPOINT_SECRET;
// app.post('/webhook', expresseraw({ type: 'application/json' }), (request, response) => {
//     const sig = request.headers['stripe-signature'];
//     let event;
//     try {
//         event = stripe.webhooks.constructureEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//         response.status(400).send(`Webhook Error:${err.message}`);
//         return;
//     }
//     /////////handle the event
//     switch (event.type) {
//         case 'payment_intent.succeeded':
//             const paymentIntentSucceeded = event.data.object;
//             break;
//         default:    
//             console.log(`unhandled event type ${event.type}`);
//     }
//     response.send();

// });





main().catch((err) => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    await mongoose.connect(process.env.MONGODB_URL);

    console.log('database connected');   /////data base has been connected 
}



server.listen(process.env.PORT, () => {
    console.log('server started');

})