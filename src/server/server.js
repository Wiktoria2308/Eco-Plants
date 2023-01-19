// const stripe_api_key = import.meta.env.VITE_STRIPE_API_KEY;
// const stripe = require('stripe')(stripe_api_key);
// const express = require('express');
// const app = express();
// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const YOUR_DOMAIN = 'http://localhost:3000';


// app.post('create-checkout-session', async (req, res) => {
//     console.log(req)
//   const session = await stripe.checkout.sessions.create({
//     line_items: req.body.items,
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}success`,
//     cancel_url: `${YOUR_DOMAIN}cancel`,
//   });
//   res.redirect(303, session.url);
// });




// app.listen(3000, () => console.log('Running on port 3000'));