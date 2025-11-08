# INVENTURE - Inventory Management System

## Project Overview

INVENTURE is a modern, AI-powered inventory management system with voice assistant capabilities, real-time analytics, and multi-channel distribution support. Built with cutting-edge web technologies and featuring a beautiful glassmorphism UI design.

## Features

- 🤖 **AI-Powered Voice Assistant** - Powered by Agora AI for natural language inventory management
- 📊 **Real-time Analytics** - Comprehensive dashboards with interactive charts and insights
- 🎨 **Modern UI Design** - Glassmorphism effects with customizable backgrounds
- 🌈 **Rainbow Text Effects** - Beautiful animated gradient text similar to Google Gemini
- 🌐 **Multi-language Support** - Support for multiple languages (English, Hindi, Japanese, Spanish, French, German)
- 🔐 **Authentication System** - Secure login and signup with guest mode
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Technologies Used

This project is built with:

- **Vite** - Next-generation frontend build tool
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript
- **shadcn/ui** - Beautiful and accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **React Router** - Declarative routing for React

## Getting Started

### Prerequisites

- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd image-intent-builder-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:8080`
   - You'll be redirected to the login/registration page

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
image-intent-builder-main/
├── public/          # Static assets (favicon, images)
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # shadcn/ui components
│   │   └── ...        # Custom components
│   ├── contexts/      # React contexts (Auth, Background)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components
│   └── main.tsx      # Application entry point
├── index.html        # HTML template
└── package.json      # Dependencies and scripts
```

## Key Features

### Voice Assistant (Agora AI)
- Click the "XyroAi" button in the header to start a voice conversation
- Real-time speech recognition
- Context-aware AI responses
- Message history and chat interface

### Background Customization
- Multiple background options (Fantasy Landscape, Abstract Purple, Gradients)
- Glassmorphism effects throughout
- Smooth transitions between backgrounds

### Language Support
- Dropdown selector in header
- 6 supported languages
- Language preference saved in localStorage

### Authentication
- Secure login/signup system
- Guest mode support
- Protected routes
- User profile management

## Deployment

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Deploy Options

You can deploy this application to any static hosting service:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Use GitHub Actions
- **AWS S3 + CloudFront** - For enterprise deployments
- **Any Node.js hosting** - Deploy the built files

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_URL=your_api_url
VITE_AGORA_APP_ID=your_agora_app_id
VITE_AGORA_API_KEY=your_agora_api_key
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support, please contact the development team or open an issue in the repository.

---

**Powered By Agora AI** | Built with ❤️ for modern inventory management
