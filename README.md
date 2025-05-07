# SciDev WebApp

A web application for managing water treatment projects and weekly reports.

## Tech Stack

- React
- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui
- Firebase (Hosting, Firestore, Authentication)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mattybj69/scidev-webapp.git
cd scidev-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

The application is deployed using Firebase Hosting. To deploy:

```bash
firebase deploy
```

## License

MIT
