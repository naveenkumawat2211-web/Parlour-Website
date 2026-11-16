# Khushi Beauty Parlour

A responsive salon website and local-only admin demo using React, Vite, Tailwind CSS, React Router and Framer Motion.

## Run
1. Install Node.js LTS.
2. Extract this project and open a terminal inside the folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL shown by Vite (usually http://localhost:5173).

## Demo admin login
- Email: `admin@khushibeauty.com`
- Password: `123456`

Change demo credentials in `src/data/seed.js` before sharing.

## Important
- No backend: data lives in this browser's Local Storage.
- Front-end demo login is not secure production authentication.
- Payment is a mock flow only; no money is collected and no Razorpay account is connected.
- Appointment records are local to the browser/device used.
- The poster did not show regular service prices, so prices start as “Price on request”. Add confirmed prices in Admin > Services.
- Confirm the phone number and WhatsApp country code before publishing.
