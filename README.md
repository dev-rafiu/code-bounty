# Bit Bounty

A decentralized platform that connects companies with developers through code challenges and bounties. Companies post coding challenges, and developers submit solutions via GitHub repositories to earn cryptocurrency bounties.

## 🚀 Features

### For Companies

- **Post Bounties**: Create coding challenges with specific requirements and bounty amounts
- **Review Submissions**: Evaluate developer submissions and select winners
- **Manage Bounties**: Track active bounties and their status
- **Secure Payments**: Pay winners directly through cryptocurrency wallets

### For Developers

- **Browse Bounties**: Discover coding challenges from various companies
- **Submit Solutions**: Upload GitHub repositories with your solutions
- **Track Submissions**: Monitor the status of your submissions
- **Get Paid**: Receive cryptocurrency payments for winning solutions

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Deployment**: Firebase Hosting

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (LoadingIndicator, etc.)
│   └── ui/             # UI components (avatar, dropdown, select)
├── context/            # React context providers
├── definitions/         # TypeScript type definitions
├── hooks/              # Custom React hooks
├── layout/             # Layout components
├── routes/             # Page components
│   ├── auth/           # Authentication pages
│   ├── company-bounties/ # Company bounty management
│   ├── dev-bounties/   # Developer bounty browsing
│   └── submissions/    # Submission management
├── services/           # API services and utilities
└── lib/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd bit-bounty
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Add your Firebase configuration
```

4. Start the development server

```bash
npm run dev
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Firebase Setup

1. Create a Firebase project
2. Enable Authentication and Firestore
3. Add your Firebase configuration to `.env`
4. Deploy to Firebase Hosting

## 📱 User Flows

### Company Registration

1. Sign up as a company
2. Create coding challenges with requirements
3. Set bounty amounts and deadlines
4. Review and select winning submissions
5. Pay winners through cryptocurrency

### Developer Registration

1. Sign up as a developer
2. Browse available bounties
3. Submit solutions via GitHub repositories
4. Provide wallet address for payments
5. Receive payments for winning submissions

## 🔐 Security

- Firebase Authentication for secure user management
- Firestore security rules for data protection
- Cryptocurrency wallet integration for secure payments
- GitHub repository verification for submissions

## 🚀 Deployment

The application is deployed using Firebase Hosting:

```bash
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
