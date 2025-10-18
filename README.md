# 🚀 JSON Formatter & Converter Tool

**Live Site:** [jsonformater.com](https://jsonformater.com/)

A powerful, free online tool for formatting, validating, and converting JSON data with additional utilities for Excel, CSV, XML, C#, and TypeScript conversions.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg?logo=vite)

---

## ✨ Features

### 🔧 Core Tools
- **JSON Formatter & Validator** - Format, beautify, and validate JSON with syntax highlighting
- **JSON Blob Viewer** - Load and inspect JSON blob data from URLs
- **JSON to Excel** - Convert JSON data to Excel (.xlsx) spreadsheets
- **Excel to JSON** - Upload Excel/CSV files and convert to JSON format
- **Excel to XML** - Transform Excel spreadsheets into XML documents
- **Excel to CSV** - Convert Excel files to CSV with customizable formatting options
- **JSON to C#** - Generate C# classes from JSON structure
- **JSON to TypeScript** - Create TypeScript interfaces from JSON data

### 🎨 User Experience
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance** - PageSpeed score 90+ on mobile
- 🔒 **Privacy-Focused** - All processing happens client-side
- 📋 **Copy to Clipboard** - One-click copy functionality
- 💾 **Download Options** - Export results in various formats
- 🎯 **Real-time Validation** - Instant feedback on JSON syntax errors

### 🛠️ Developer Features
- Code splitting and lazy loading
- SEO optimized with meta tags and structured data
- Google Analytics integration
- Sitemap and robots.txt for search engines
- Mobile-first responsive design
- Accessibility features (ARIA labels)

---

## 🏗️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Libraries & Tools
- **xlsx** - Excel file parsing and generation
- **papaparse** - CSV parsing
- **@supabase/supabase-js** - Backend integration
- **@emailjs/browser** - Contact form email service

### Backend & Infrastructure
- **Supabase** - Backend as a Service (authentication, database, storage)
- **n8n** - Workflow automation for contact forms and notifications
- **Docker** - Containerization
- **Nginx Proxy Manager** - Reverse proxy and SSL management
- **Vercel** - Hosting and deployment (optional)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Docker and Docker Compose (for production deployment)
- Supabase account (for backend features)
- n8n instance (for workflow automation)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/jsonformatter.git
cd jsonformatter
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build locally
npm run preview
```

---

## 🐳 Docker Deployment

### Using Docker Compose with Nginx Proxy Manager

1. **Create `docker-compose.yml`**
```yaml
version: '3.8'

services:
  jsonformatter:
    build: .
    container_name: jsonformatter
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    networks:
      - proxy-network
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.jsonformatter.rule=Host(`jsonformater.com`)"

networks:
  proxy-network:
    external: true
```

2. **Create `Dockerfile`**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

3. **Create `nginx.conf`**
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

4. **Deploy with Docker**
```bash
docker-compose up -d
```

### Nginx Proxy Manager Configuration

1. Add a new Proxy Host in Nginx Proxy Manager
2. **Domain Names:** `jsonformater.com`, `www.jsonformater.com`
3. **Scheme:** `http`
4. **Forward Hostname / IP:** `jsonformatter` (container name)
5. **Forward Port:** `80`
6. **SSL:** Request Let's Encrypt SSL certificate
7. Enable:
   - ✅ Cache Assets
   - ✅ Websockets Support
   - ✅ Force SSL
   - ✅ HTTP/2 Support

---

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Set up tables for analytics or user data (optional)
3. Get your project URL and anon key
4. Add to environment variables

### n8n Workflow Automation

1. Set up n8n instance (self-hosted or cloud)
2. Create workflow for contact form submissions
3. Configure email notifications
4. Add webhook URL to your contact form component

Example n8n workflow:
- Trigger: Webhook (from contact form)
- Action 1: Send email notification
- Action 2: Store in Supabase (optional)
- Action 3: Send confirmation email to user

### Google Analytics

Add your Google Analytics tracking ID in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 📁 Project Structure

```
jsonformatter/
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── json-formatter-favicon.svg
├── src/
│   ├── components/
│   │   ├── CSharpGenerator.tsx
│   │   ├── ExcelToCsvConverter.tsx
│   │   ├── ExcelToJsonConverter.tsx
│   │   ├── ExcelToXmlConverter.tsx
│   │   ├── JsonFormatter.tsx
│   │   ├── Navigation.tsx
│   │   ├── SEO.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ExcelToJson.tsx
│   │   ├── ExcelToXml.tsx
│   │   ├── ExcelToCsv.tsx
│   │   ├── JsonToExcel.tsx
│   │   ├── JsonToCSharp.tsx
│   │   ├── JsonToTypeScript.tsx
│   │   ├── Contact.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── Sitemap.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── examples.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🚀 Performance Optimization

### Implemented Optimizations
- ✅ Code splitting with React lazy loading
- ✅ Bundle optimization with Vite
- ✅ CSS code splitting
- ✅ Image lazy loading
- ✅ Terser minification with console removal
- ✅ Gzip/Brotli compression
- ✅ Browser caching headers
- ✅ Preload critical resources
- ✅ Font display swap

### Performance Metrics
- **Desktop PageSpeed:** 95-100
- **Mobile PageSpeed:** 90+
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

---

## 🔒 Security

- All data processing happens client-side (privacy-focused)
- No data stored on servers (except optional analytics)
- HTTPS enforced via Nginx Proxy Manager
- Content Security Policy headers
- XSS protection
- CORS configured properly

---

## 📊 SEO Features

- ✅ Dynamic meta tags per page
- ✅ Open Graph tags for social sharing
- ✅ Structured data (JSON-LD)
- ✅ XML sitemap (`/sitemap.xml`)
- ✅ robots.txt configuration
- ✅ Canonical URLs
- ✅ Mobile-friendly design
- ✅ Page speed optimization
- ✅ Semantic HTML
- ✅ Alt text for images

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server on localhost:5173
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
npm run typecheck       # TypeScript type checking
npm run generate:favicon # Generate favicon assets
```

---

## 🌐 Deployment

### Option 1: Vercel (Easiest)
1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy automatically

### Option 2: Docker + Nginx Proxy Manager (Recommended for self-hosting)
1. Set up Docker and Nginx Proxy Manager
2. Configure domain and SSL
3. Run `docker-compose up -d`
4. Access via your domain

### Option 3: Traditional VPS
1. Build the project: `npm run build`
2. Copy `dist/` folder to server
3. Configure Nginx to serve static files
4. Set up SSL with Let's Encrypt

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Supabase](https://supabase.com/) - Backend platform
- [n8n](https://n8n.io/) - Workflow automation
- [SheetJS](https://sheetjs.com/) - Excel file handling
- [PapaParse](https://www.papaparse.com/) - CSV parsing
- [Lucide Icons](https://lucide.dev/) - Icon library

---

## 📧 Contact

- **Website:** [jsonformater.com](https://jsonformater.com/)
- **Email:** contact@jsonformater.com
- **Issues:** [GitHub Issues](https://github.com/yourusername/jsonformatter/issues)

---

## 🗺️ Roadmap

- [ ] Add JSON schema validator
- [ ] Support for YAML conversion
- [ ] API endpoint for programmatic access
- [ ] Browser extension
- [ ] VS Code extension
- [ ] Batch file processing
- [ ] Custom themes
- [ ] Collaboration features
- [ ] JSON diff tool
- [ ] More language converters (Java, Python, Go)

---

Made with ❤️ by the JSON Formatter team
