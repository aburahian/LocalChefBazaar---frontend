
# LocalChefBazaar — Marketplace for Local Home-Cooked Meals

LocalChefBazaar is a modern online platform that connects home cooks with people looking for fresh, homemade food. Customers can explore daily menus, check a chef’s availability, place orders, make secure payments, and track their orders in real time.

**Live URL:** [[Insert Live Link Here](https://localbazarmeal-abu-b549e6.netlify.app/)]

## Key Features
- **User Roles**: Admin, Chef, and Customer roles with distinct dashboards and permissions.
- **Authentication**: Secure JWT-based authentication for private routes.
- **Payment Integration**: Stripe integration for secure and seamless payments.
- **Real-time Order Tracking**: Status updates for orders (Pending, Accepted, Delivered).
- **Review System**: Customers can leave ratings and reviews for meals.
- **Favorites**: Users can save their favorite meals.
- **Chef & Admin Requests**: Workflow for users to request to become Chefs or Admins.
- **Platform Statistics**: Visual charts for admins to monitor platform performance.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion/GSAP, TanStack Query, React Hook Form.
- **Backend**: Node.js, Express.js, MongoDB, Firebase Admin.
- **Payment**: Stripe.

## Installation

### Prerequisites
- Node.js
- MongoDB URI
- Firebase Service Account Key
- Stripe Secret Key

### Client Side
1. `cd frontend`
2. `npm install`
3. Create `.env` file with Firebase configuration.
4. `npm run dev`

### Server Side
1. `cd backend`
2. `npm install`
3. Create `.env` file with `MONGODB_URI`, `STRIPE_SECRET_KEY`, `ACCESS_TOKEN_SECRET` and `FB_SERVICE_KEY`.
4. `npm start`
