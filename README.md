# Minniemissions - Web3 Street Team Platform built on Polkadot

![minniemissions logo easya](https://github.com/user-attachments/assets/77246a5f-68d5-4bc7-afb8-bf285263882a)

Minniemissions is a Web3 Street Team Platform (dApp) built on Polkadot/Substrate that enables artists and brands to engage with their superfans through missions, rewards, and referrals.

## 🎯 Overview

Minniemissions allows fans to:

- Connect their wallet (Polkadot.js)
- View and complete missions (e.g., social shares, event attendance, content creation)
- Earn Vibe Points (VP) tracked on-chain
- Get paid in DOT (or USDC via Moonbeam) for completing missions
- Track referrals via custom QR codes linked to their fan ID

While artists and brands can:

- Create missions with customised rewards
- Set expiration dates and categories for missions
- View detailed analytics and leaderboards
- Track engagement and referral metrics

## 🧱 Technology Stack

### Frontend (React)
- React with TypeScript
- TailwindCSS for styling
- shadcn/ui component library
- QR code generation for referrals
- Wallet connection (Polkadot.js)
- Recharts for data visualization

### Smart Contract Layer (Substrate/Moonbeam)
**Note:** The current implementation includes frontend UI mockups. The smart contract would be written in Ink! and deployed to a Substrate node or Moonbeam in a full implementation.

Key contract functions:
- `split_payment(fan)` - Distribute funds among artist, treasury, and fan
- `get_vp(fan)` - Retrieve on-chain Vibe Points
- `update_artist()` and `update_treasury()` - Admin-only functions

### Backend
**Note:** The current implementation uses mock data. A full implementation would include:
- Node.js (Express/NestJS) backend
- QR code generation and tracking
- Referral system with VP boosts
- PostgreSQL database for missions, users, referrals, and scan tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/minniemissions.git
cd minniemissions
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📱 Features

### For Fans
- **Wallet Connection:** Connect to Polkadot ecosystem via wallet
- **Mission Dashboard:** Browse and complete available missions
- **Profile Page:** Track VP, completed missions, and referral stats
- **QR Code Generation:** Share custom QR codes to earn referral bonuses
- **Leaderboard:** Compete with other fans for top VP spots

### For Artists/Admins
- **Mission Creation:** Easily create and manage missions
- **Analytics Dashboard:** Track engagement metrics and VP distribution
- **User Management:** View detailed user stats and activity
- **Reward Configuration:** Set VP rewards for different mission types

## 📸 Application Screenshots

### Home Page
<img width="1512" alt="Screenshot 2025-04-20 at 11 05 31" src="https://github.com/user-attachments/assets/501ca0f9-5709-44a6-b3dc-8362ae2f6146" />


### Vibe Points Conversion
<img width="1470" alt="Screenshot 2025-04-20 at 11 06 26" src="https://github.com/user-attachments/assets/cc84dbb9-8d85-41d5-bf4c-582d54916c1e" />


### Missions
<img width="1512" alt="Screenshot 2025-04-20 at 10 20 47" src="https://github.com/user-attachments/assets/4315e1ff-f91c-494a-89f8-41411bcbdb13" />


### Leaderboard for gamification
<img width="1512" alt="Screenshot 2025-04-20 at 12 41 48" src="https://github.com/user-attachments/assets/dc5915d4-5374-4b2a-9e5e-61371b6b6156" />


These screenshots demonstrate the key features of Minniemissions, including the home page interface, Vibe Points conversion process, and successful token conversion.

## 🌐 Pages

- `/` - Home page with CTA and branding
- `/missions` - Fan mission dashboard
- `/admin` - Admin mission creator and analytics
- `/leaderboard` - Top VP earners
- `/profile` - User profile with VP, missions, and referrals
- `/qr/:id` - Dynamic QR redirect for tracking fan referrals

## 🔮 Future Development

- **Ink! Smart contract integration:** Complete implementation of the smart contract layer
- **Backend API development:** Build out the Node.js backend with database integration
- **IPFS storage:** Add IPFS storage for mission proof submissions
- **Streak tracking:** Implement bonus rewards for consistent mission completion
- **Advanced analytics:** Provide deeper insights for artists and brands
- **Mobile app:** Develop a companion mobile application
- **NFC membership card integrations:** Enable users access to NFC cards which they can use at IRL events for extra perks and discounts

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Polkadot ecosystem for enabling Web3 innovation
- EasyA for the hackathon - learnt a lot and excited to continue building! #360DaysOfPolkadot
- The Substrate community for documentation and support
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful React components
- [TailwindCSS](https://tailwindcss.com/) for the styling framework
