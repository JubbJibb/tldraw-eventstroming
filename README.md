# Collaborative Event Storming Board

A collaborative Event Storming whiteboard application built with TL Draw, React, TypeScript, and Vite. Perfect for Domain-Driven Design (DDD) workshops and team brainstorming sessions.

## Features

### Event Storming Tools
- 📅 **Events** (Orange) - Things that happened in your domain
- ⚡ **Commands** (Blue) - Actions that trigger events
- 📦 **Aggregates** (Yellow) - Domain boundaries and consistency boundaries
- 👤 **Actors** (Pink) - Users, personas, or external systems
- 📊 **Read Models** (Green) - Views and queries
- 🔥 **Hot Spots** (Red) - Areas of uncertainty or confusion

### Collaboration Features
- 👥 **Real-time multiplayer** - Multiple users can work simultaneously
- 🖱️ **Live cursors** - See where team members are working
- 👀 **User presence** - Know who's on the board
- 🔄 **Instant sync** - Changes appear in real-time across all clients

### Canvas Features
- ✏️ **Editable sticky notes** - Double-click to edit text
- 🎨 **Custom shapes** - Color-coded sticky notes for each type
- 🔍 **Zoom and pan** - Navigate large canvases easily
- 🔄 **Undo/redo** - Full history support
- 📐 **Drawing tools** - Use standard TL Draw tools for arrows, connectors, etc.

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Using Different Rooms

To create separate boards or join specific sessions, add a `room` query parameter:
- Default: `http://localhost:5173`
- Custom room: `http://localhost:5173?room=my-session-id`

Share the same room URL with your team to collaborate on the same board!

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Create Sticky Notes**: Click on any sticky note type in the "Event Storming Tools" panel on the left
2. **Edit Text**: Double-click on any sticky note to edit its text
3. **Move & Resize**: Click and drag to move, use handles to resize
4. **Connect Ideas**: Use the drawing tools (arrows, lines) to connect related events and commands
5. **Collaborate**: Share the room URL with your team - they'll see changes in real-time!

## Event Storming Workflow

1. **Start with Events**: Begin by identifying domain events (orange notes)
2. **Add Commands**: Identify what triggers each event (blue notes)
3. **Define Aggregates**: Group related events and commands (yellow notes)
4. **Identify Actors**: Who or what initiates commands? (pink notes)
5. **Mark Hot Spots**: Flag areas that need discussion (red notes)
6. **Create Read Models**: Define views for queries (green notes)

## Project Structure

```
.
├── src/
│   ├── App.tsx                    # Main application component
│   ├── EventStormingBoard.tsx     # Event Storming board with collaboration
│   ├── shapes/
│   │   └── EventStormingSticky.tsx  # Custom sticky note shape component
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## Customization

### Changing Room ID

The board uses a room ID for collaboration. By default, it uses `'event-storming-default'` or reads from the URL query parameter `?room=your-room-id`.

To change it programmatically, modify `src/App.tsx`:

```tsx
<EventStormingBoard roomId="my-custom-room" />
```

### Adding Custom Sticky Types

Edit `src/shapes/EventStormingSticky.tsx` to add new sticky note types or modify existing ones.

### Production Deployment

⚠️ **Note**: The demo sync server (`useSyncDemo`) is for development only and data persists for 24 hours. For production, you'll need to:

1. Self-host the TL Draw sync server, or
2. Integrate with a real-time backend like Liveblocks, or
3. Use your own WebSocket server

See the [TL Draw collaboration docs](https://tldraw.dev/docs/collaboration) for production setup.

## Learn More

- [TL Draw Documentation](https://tldraw.dev)
- [TL Draw GitHub](https://github.com/tldraw/tldraw)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
