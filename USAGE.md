# How to Use the Event Storming Board

## Getting Started

1. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to the URL shown (typically `http://localhost:5173`)

## Creating Sticky Notes

### Method 1: Using the Tool Panel
1. Look for the **"Event Storming Tools"** panel on the left side of the screen
2. Click any button to create a sticky note:
   - 📅 **Event** (Orange) - Domain events
   - ⚡ **Command** (Blue) - Actions that trigger events
   - 📦 **Aggregate** (Yellow) - Domain boundaries
   - 👤 **Actor** (Light Pink) - Users/personas
   - 📊 **Read Model** (Green) - Views/queries
   - 🔥 **Hot Spot** (Magenta) - Areas of uncertainty
   - ⚙️ **System** (Light Pink) - System components
   - 📋 **Policy** (Purple) - Business rules
   - 💎 **Value** (Light Green) - Values/outcomes
   - ✏️ **Sketch** (White) - Freeform drawings

3. The sticky note will appear near the center of your viewport

### Method 2: Using TL Draw Tools
- Use the toolbar at the top to access standard drawing tools
- You can draw, add shapes, text boxes, arrows, etc.

## Editing Sticky Notes

1. **Double-click** any sticky note to edit its text
2. Type your content
3. Press **Ctrl+Enter** (or **Cmd+Enter** on Mac) to save, or click outside to save
4. Press **Escape** to cancel editing

## Moving and Resizing

- **Move**: Click and drag a sticky note to reposition it
- **Resize**: Click a sticky note to select it, then drag the corner handles
- **Select Multiple**: Hold **Shift** and click multiple sticky notes, or drag to select an area
- **Delete**: Select a sticky note and press **Delete** or use the trash icon in the toolbar

## Connecting Elements

To show relationships between sticky notes (like in Event Storming diagrams):

1. Use the **Arrow** tool from the top toolbar
2. Click and drag from one sticky note to another
3. You can also use the **Line** or **Draw** tools to create connections
4. Add labels to arrows by creating text boxes near them

## Canvas Navigation

- **Pan**: Click and drag on empty canvas, or use middle mouse button
- **Zoom**: 
  - Use mouse wheel to zoom in/out
  - Use the zoom controls in the toolbar
  - Press **Ctrl/Cmd + 0** to fit to screen
- **Fit to Screen**: Click the fit icon in the toolbar

## Working with Rooms

### Creating Separate Boards
Add a `room` parameter to the URL to create separate boards:
- Default: `http://localhost:5173`
- Custom room: `http://localhost:5173?room=my-session`

### Sharing Boards
- Each room has its own storage
- Share the same room URL with your team
- Each person's work is saved locally in their browser
- Note: For real-time collaboration, you'll need to set up a sync server

## Keyboard Shortcuts

- **Undo**: `Ctrl+Z` (or `Cmd+Z` on Mac)
- **Redo**: `Ctrl+Shift+Z` (or `Cmd+Shift+Z` on Mac)
- **Copy**: `Ctrl+C` (or `Cmd+C` on Mac)
- **Paste**: `Ctrl+V` (or `Cmd+V` on Mac)
- **Delete**: `Delete` or `Backspace`
- **Select All**: `Ctrl+A` (or `Cmd+A` on Mac)
- **Zoom to Fit**: `Ctrl+0` (or `Cmd+0` on Mac)

## Event Storming Workflow

1. **Start with Events**: Identify what happens in your domain (orange sticky notes)
2. **Add Commands**: What triggers each event? (blue sticky notes)
3. **Define Aggregates**: Group related events and commands (yellow sticky notes)
4. **Identify Actors**: Who or what initiates commands? (light pink sticky notes)
5. **Mark Hot Spots**: Flag areas that need discussion (magenta sticky notes)
6. **Create Read Models**: Define views for queries (green sticky notes)
7. **Add Policies**: Document business rules (purple sticky notes)
8. **Connect Everything**: Use arrows to show relationships and flow

## Tips

- **Organize by Color**: Use the color coding to quickly identify different types of elements
- **Use Sketch Notes**: Use white sketch sticky notes for freeform diagrams or drawings
- **Group Related Items**: Move related sticky notes close together
- **Save Your Work**: Your work is automatically saved to browser storage
- **Clear Board**: Use browser's "Clear Site Data" to reset if needed

## Troubleshooting

- **Sticky notes not appearing?**: Check the browser console (F12) for errors
- **Can't edit text?**: Make sure you double-click the sticky note, not single-click
- **Lost your work?**: Check browser localStorage - data persists across sessions
- **Want to start fresh?**: Clear browser localStorage or use a new room ID

## Advanced Features

- **Export**: Use browser's print function or screenshot tools
- **Multiple Pages**: Use the page selector in the top toolbar
- **Layers**: Use the layer panel to organize complex diagrams
- **Grid**: Enable grid from view options for alignment

Enjoy creating your Event Storming diagrams! 🎨
