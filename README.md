# Emilio Funes – Backend Developer Portfolio 🚀

A professional portfolio showcasing the work and expertise of **Emilio Funes**, a backend developer specialized in building secure, scalable, and business-oriented systems using **Java (Spring Boot)**, **PHP (Laravel)**, and modern frontend technologies like **Next.js** and **Tailwind CSS**.

👉 [View live demo](https://emiliofunes-portfolio.vercel.app/)

---

## 🧑‍💻 About Me

I'm **Emilio Funes**, a backend developer with a comprehensive vision of software development. I have extensive experience in developing:

- Secure and documented RESTful APIs
- Business logic with Java Spring Boot and Laravel
- Authentication and authorization systems (JWT, OAuth2)
- Robust database connections with PostgreSQL, MySQL, and MongoDB
- Management, billing, inventory, and enterprise applications

My approach is based on code quality, system scalability, and deep understanding of client processes.

---

## 🛠️ Technology Stack

| Technology        | Purpose                                      |
|-------------------|----------------------------------------------|
| **Next.js 14**    | React framework for SSR/SSG and optimization |
| **TypeScript**    | Static typing and enhanced maintainability   |
| **Tailwind CSS**  | Modern, fast, and responsive styling         |
| **Vercel**        | Serverless hosting with integrated CI/CD     |
| **Git & GitHub**  | Version control and collaboration            |
| **Jest & RTL**    | Unit and component testing                   |
| **ESLint**        | Code quality and consistency                 |
| **Prettier**      | Code formatting                              |

---

## 📁 Project Structure

```
emilio-portfolio-final/
├── app/                     # Next.js app router pages and layouts
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page component
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── styles/             # Global styles
├── components/             # Reusable React components
│   ├── ui/                 # UI components (ActionButton, etc.)
│   ├── navigation/         # Navigation components
│   └── ...                 # Feature components
├── __tests__/             # Test suites and test utilities
│   ├── components/         # Component tests
│   ├── hooks/             # Custom hooks tests
│   ├── context/           # Context tests
│   └── lib/               # Utility tests
├── context/               # React contexts (PreferencesContext)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── public/                # Static assets
│   ├── images/            # Image assets
│   ├── projects/          # Project images
│   └── icons/             # Icon assets
├── scripts/               # Build and optimization scripts
├── coverage/              # Test coverage reports
├── docs/                  # Project documentation
├── jest.config.js         # Jest configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EmiFunes91/emilio-portfolio.git
   cd emilio-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

---

## 🧪 Testing

The project includes a comprehensive test suite with high coverage:

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test files
npm test -- --testPathPattern="ActionButton"
```

### Test Coverage

Current coverage metrics:
- **Statements**: 77.94%
- **Branches**: 66.15%
- **Functions**: 75.58%
- **Lines**: 78.52%

### Test Structure

- ✅ **Component Tests**: All UI components tested
- ✅ **Hook Tests**: Custom hooks with full coverage
- ✅ **Context Tests**: React context providers
- ✅ **Integration Tests**: User flows and interactions
- ✅ **Utility Tests**: Helper functions and utilities

For detailed testing information, see [`__tests__/README.md`](__tests__/README.md).

---

## 📦 Build & Deployment

### Development Build

```bash
# Build for development
npm run build

# Start production server locally
npm start
```

### Production Deployment

The application is automatically deployed to **Vercel** on every push to the main branch.

🌍 **Live Site**: [https://emiliofunes-portfolio.vercel.app](https://emiliofunes-portfolio.vercel.app/)

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🎨 Key Features

### User Experience
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Optimized for all devices
- **Dark/Light Mode**: Theme switching capability
- **Multi-language**: English/Spanish support
- **Smooth Animations**: Enhanced user interactions

### Performance
- **SEO Optimized**: Advanced metadata and structured data
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundle optimization
- **Caching**: Efficient resource caching

### Developer Experience
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for quality assurance
- **Comprehensive Testing**: High test coverage

---

## 🔍 SEO & Performance

### SEO Implementation

- ✅ **Dynamic Metadata**: Language-based meta tags
- ✅ **Structured Data**: JSON-LD for better indexing
- ✅ **Open Graph**: Social media optimization
- ✅ **Twitter Cards**: Twitter sharing optimization
- ✅ **Sitemap**: Automatic XML sitemap generation
- ✅ **Robots.txt**: Search engine directives
- ✅ **Hreflang**: Multi-language SEO support

### Performance Metrics

- 🚀 **Lighthouse Score**: 95+ across all categories
- 📱 **Mobile First**: Responsive design optimization
- ⚡ **Core Web Vitals**: Optimized for performance
- 🎯 **Accessibility**: WCAG 2.1 AA compliance

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Optimization
npm run analyze      # Analyze bundle size
npm run optimize     # Optimize images and assets
```

### Code Quality

The project follows strict code quality standards:

- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance

---

## 📚 Documentation

- [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) - Performance optimization guide
- [`docs/TEST_COVERAGE.md`](docs/TEST_COVERAGE.md) - Testing strategy and coverage
- [`__tests__/README.md`](__tests__/README.md) - Testing documentation

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Maintain test coverage above 70%
- Follow the existing code style
- Update documentation as needed

---

## 📫 Contact

Interested in collaboration or looking for a committed and professional backend developer?

- 🔗 [LinkedIn](https://www.linkedin.com/in/emilio-funes-8b140b21a/)
- 📧 emilio.ifunes@hotmail.es
- 🌐 [Portfolio Website](https://emiliofunes-portfolio.vercel.app/)

---

## 📝 License

This project is licensed under the **MIT License**.  
© 2025 Emilio Funes. All rights reserved.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first CSS framework
- **Testing Library** for excellent testing utilities

---

> If you like this portfolio, feel free to ⭐ the repository or reach out. Thank you for visiting!
