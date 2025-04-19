# Minniemissions - Fan Engagement dApp

![Minniemissions Logo](https://i.imgur.com/6UOr4Kl.png)

Minniemissions is a full-stack decentralized application (dApp) built on Polkadot/Substrate that enables artists and brands to engage with their fans through missions, rewards, and referrals.

## 🎯 Overview

Minniemissions allows fans to:

- Connect their wallet (Polkadot.js)
- View and complete missions (e.g., social shares, event attendance, content creation)
- Earn Vibe Points (VP) tracked on-chain
- Get paid in DOT (or USDC via Moonbeam) for completing missions
- Track referrals via custom QR codes linked to their fan ID

While artists and brands can:

- Create missions with customized rewards
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

## 🌐 Pages

- `/` - Home page with CTA and branding
- `/missions` - Fan mission dashboard
- `/admin` - Admin mission creator and analytics
- `/leaderboard` - Top VP earners
- `/profile` - User profile with VP, missions, and referrals
- `/qr/:id` - Dynamic QR redirect for tracking fan referrals

## 🔮 Future Development

- **Ink! Smart Contract Integration:** Complete implementation of the smart contract layer
- **Backend API Development:** Build out the Node.js backend with database integration
- **IPFS Storage:** Add IPFS storage for mission proof submissions
- **Streak Tracking:** Implement bonus rewards for consistent mission completion
- **Advanced Analytics:** Provide deeper insights for artists and brands
- **Mobile App:** Develop a companion mobile application

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Polkadot ecosystem for enabling Web3 innovation
- The Substrate community for documentation and support
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful React components
- [TailwindCSS](https://tailwindcss.com/) for the styling framework
