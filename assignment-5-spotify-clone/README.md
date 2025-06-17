# 🎵 Spotify Clone - Full-Stack Music Streaming App

A modern, fully responsive Spotify clone built with React.js, Redux Toolkit, and Tailwind CSS. Features a beautiful mobile-first design with complete music streaming functionality.

## ✨ Features

### 🎧 Core Music Features

- **Music Streaming**: Play, pause, skip tracks with audio controls
- **Search Functionality**: Search for songs, artists, and genres
- **Top Charts**: Browse trending music and popular tracks
- **Artist Details**: View artist information and top tracks
- **Song Details**: View lyrics and related songs
- **Around You**: Discover popular music in your region
- **Music Library**: Personal music collection and recommendations

### 📱 Mobile Responsive Design

- **Mobile-First Approach**: Optimized for all screen sizes
- **Collapsible Sidebar**: Hidden sidebar with hamburger menu on mobile
- **Mobile Music Player**: Compact player design for mobile devices
- **Touch-Friendly Controls**: Optimized buttons and interactions
- **Bottom Navigation**: Mobile tab bar with Home, Search, Library
- **Responsive Grids**: Adaptive layouts for different screen sizes

### 🎨 UI/UX Features

- **Modern Design**: Beautiful gradients and animations
- **Dark Theme**: Spotify-inspired dark interface
- **Smooth Transitions**: Fluid animations and hover effects
- **Loading States**: Elegant loading spinners and error handling
- **Progress Bars**: Visual audio progress indicators

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd assignment-5-spotify-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠️ Technology Stack

### Frontend

- **React.js** - Component-based UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

### APIs

- **Shazam Core API** - Music data and search
- **Deezer API** - Artist information and tracks

### Build Tools

- **Create React App** - React application setup
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📱 Mobile Responsiveness

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

### Mobile Features

- **Sidebar**: Slide-in navigation with overlay
- **Music Player**: Compact controls positioned above bottom navigation
- **Bottom Navigation**: Fixed tab bar with Home, Search, Library
- **Responsive Typography**: Scalable text sizes across devices
- **Touch Optimization**: Proper button sizes and spacing

## 🎵 Pages & Components

### Pages

- **Discover** (`/`) - Homepage with featured music
- **Top Charts** (`/top-charts`) - Trending songs
- **Top Artists** (`/top-artists`) - Popular artists
- **Around You** (`/around-you`) - Regional popular music
- **Search** (`/search/:searchTerm`) - Search results
- **Artist Details** (`/artists/:id`) - Artist profile and tracks
- **Song Details** (`/songs/:songid`) - Song lyrics and related tracks
- **Library** (`/library`) - Personal music library

### Key Components

- **MusicPlayer** - Audio player with mobile/desktop layouts
- **Sidebar** - Navigation with mobile responsive design
- **SongCard** - Reusable music card component
- **ArtistCard** - Artist profile card
- **TopPlay** - Trending songs sidebar (desktop only)
- **SearchBar** - Music search functionality

## 🎨 Design Features

### Visual Elements

- **Gradient Backgrounds** - Beautiful color transitions
- **Glass Morphism** - Backdrop blur effects
- **Hover Effects** - Interactive button states
- **Loading Animations** - Smooth loading indicators
- **Progress Bars** - Audio and loading progress

### Color Scheme

- **Primary**: Green/Emerald gradients (Spotify-inspired)
- **Secondary**: Purple/Pink accents
- **Background**: Dark grays and blacks
- **Text**: White and gray variations

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MusicPlayer.jsx # Audio player component
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── SongCard.jsx    # Music card component
│   └── ...
├── pages/              # Page components
│   ├── Discover.jsx    # Homepage
│   ├── Search.jsx      # Search page
│   ├── TopCharts.jsx   # Charts page
│   └── ...
├── redux/              # State management
│   ├── features/       # Redux slices
│   ├── services/       # API services
│   └── store.js        # Redux store
└── assets/             # Static assets
```

## 🔧 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder with optimized bundles

### `npm run eject`

⚠️ **Note: This is a one-way operation. Once you `eject`, you can't go back!**

## 🌟 Key Highlights

### Mobile-First Design

- Fully responsive across all devices
- Touch-optimized interface
- Mobile-specific layouts and components

### Music Streaming

- Real-time audio playback
- Shuffle and repeat functionality
- Volume control and progress tracking

### Modern UI/UX

- Spotify-inspired design language
- Smooth animations and transitions
- Intuitive navigation patterns

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

- **Netlify**: Connect your GitHub repository
- **Vercel**: Import project from Git
- **GitHub Pages**: Use `gh-pages` package
- **Traditional Hosting**: Upload `build` folder contents

## 🔮 Future Enhancements

- User authentication and playlists
- Offline music caching
- Social features (sharing, following)
- Advanced audio controls (equalizer)
- Podcast support
- Desktop app with Electron

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Music data is provided by Shazam and Deezer APIs.

## 🙏 Acknowledgments

- **Spotify** - Design inspiration
- **Shazam API** - Music data provider
- **Deezer API** - Artist information
- **Tailwind CSS** - Styling framework
- **React Icons** - Icon library
