import { Tldraw, useEditor, createTLStore } from 'tldraw'
import 'tldraw/tldraw.css'
import { EventStormingStickyUtil } from './shapes/EventStormingSticky'
import { useEffect, useState, useCallback } from 'react'

const STICKY_COLORS: Record<string, string> = {
	event: '#FFA500', // Orange
	command: '#4169E1', // Royal Blue
	aggregate: '#FFD700', // Gold/Yellow
	actor: '#FFB6C1', // Light Pink
	'read-model': '#32CD32', // Lime Green
	'hot-spot': '#FF00FF', // Magenta
	system: '#FFB6C1', // Light Pink
	policy: '#9370DB', // Medium Purple
	value: '#90EE90', // Light Green
	sketch: '#FFFFFF', // White
	'bounded-context': '#E3F2FD', // Light Blue
}

const STICKY_TEMPLATES: Record<string, string[]> = {
	event: [
		'Order Placed',
		'Invoice Paid',
		'Payment Received',
		'Product Shipped',
		'User Registered',
		'Account Created',
		'Email Sent',
		'Document Approved',
	],
	command: [
		'Place Order',
		'Process Payment',
		'Create Account',
		'Send Email',
		'Approve Document',
		'Update Profile',
		'Cancel Order',
		'Refund Payment',
	],
	aggregate: [
		'Order',
		'Customer',
		'Product',
		'Invoice',
		'Payment',
		'Account',
		'Document',
		'Transaction',
	],
	actor: [
		'Customer',
		'Admin',
		'System',
		'Payment Gateway',
		'Email Service',
		'User',
		'Manager',
		'External API',
	],
	'read-model': [
		'Order History',
		'Customer Dashboard',
		'Payment Report',
		'User List',
		'Inventory Status',
		'Analytics View',
		'Search Results',
		'Notification Center',
	],
	'hot-spot': [
		'Payment Processing',
		'Data Synchronization',
		'User Authentication',
		'Performance Issue',
		'Data Consistency',
		'Scalability Concern',
		'Security Risk',
		'Integration Problem',
	],
	system: [
		'Order System',
		'Payment System',
		'Notification System',
		'Authentication Service',
		'Email Service',
		'Inventory System',
		'Reporting System',
		'Analytics Engine',
	],
	policy: [
		'When order is placed, send confirmation email',
		'When payment fails, notify customer',
		'When inventory is low, alert manager',
		'When user registers, create account',
		'When invoice is paid, update order status',
		'When order ships, send tracking info',
	],
	value: [
		'Customer Satisfaction',
		'Revenue Increase',
		'Time Saved',
		'Error Reduction',
		'User Engagement',
		'Process Efficiency',
	],
	sketch: [
		'',
	],
	'bounded-context': [
		'Order Management',
		'Payment Processing',
		'Customer Service',
		'Inventory Management',
		'Shipping & Logistics',
		'User Management',
		'Product Catalog',
		'Notification Service',
		'Analytics & Reporting',
		'Authentication & Authorization',
	],
}

const STICKY_TYPES = [
	{ 
		type: 'event' as const, 
		label: '📅 Event', 
		color: 'orange',
		tooltip: 'Represents something that has happened in the domain (e.g., "Order Placed," "Invoice Paid").'
	},
	{ 
		type: 'command' as const, 
		label: '⚡ Command', 
		color: 'blue',
		tooltip: 'Represents a decision, action, or intent that triggers a domain event.'
	},
	{ 
		type: 'aggregate' as const, 
		label: '📦 Aggregate', 
		color: 'yellow',
		tooltip: 'Used for grouping related domain events, commands, and policies around a specific domain object.'
	},
	{ 
		type: 'actor' as const, 
		label: '👤 Actor', 
		color: 'pink',
		tooltip: 'Represents a person or system that initiates a command.'
	},
	{ 
		type: 'read-model' as const, 
		label: '📊 Read Model', 
		color: 'green',
		tooltip: 'Represents the information needed to make a decision (e.g., a screen or report).'
	},
	{ 
		type: 'hot-spot' as const, 
		label: '🔥 Hot Spot', 
		color: 'red',
		tooltip: 'Represents a bottleneck, uncertainty, or critical issue.'
	},
	{ 
		type: 'system' as const, 
		label: '⚙️ System', 
		color: 'pink',
		tooltip: 'Represents a system component that processes commands and produces events.'
	},
	{ 
		type: 'policy' as const, 
		label: '📋 Policy', 
		color: 'purple',
		tooltip: 'Represents a business rule or automated process that reacts to a domain event ("Whenever X happens, do Y").'
	},
	{ 
		type: 'value' as const, 
		label: '💎 Value', 
		color: 'green',
		tooltip: 'Represents positive or negative values, outcomes, or business value associated with events.'
	},
	{ 
		type: 'sketch' as const, 
		label: '✏️ Sketch', 
		color: 'white',
		tooltip: 'For freeform drawings, diagrams, or visual notes.'
	},
	{ 
		type: 'bounded-context' as const, 
		label: '🔷 Bounded Context', 
		color: 'blue',
		tooltip: 'Represents a boundary within which a domain model is valid. Groups related events, commands, and aggregates.'
	},
] as const

function ColorLegend({ showLegend, onToggle }: { showLegend: boolean; onToggle: () => void }) {
	return (
		<div
			style={{
				position: 'absolute',
				top: '60px',
				right: '12px',
				zIndex: 1000,
				backgroundColor: 'white',
				borderRadius: '8px',
				boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
				pointerEvents: 'auto',
				minWidth: '280px',
				maxWidth: '320px',
			}}
			onClick={(e) => e.stopPropagation()}
			onMouseDown={(e) => e.stopPropagation()}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '12px',
					borderBottom: showLegend ? '1px solid #eee' : 'none',
					cursor: 'pointer',
				}}
				onClick={onToggle}
			>
				<div
					style={{
						fontSize: '12px',
						fontWeight: '600',
						color: '#333',
					}}
				>
					🎨 Color Legend
				</div>
				<div
					style={{
						fontSize: '18px',
						color: '#666',
						transform: showLegend ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.2s',
					}}
				>
					▼
				</div>
			</div>
			{showLegend && (
				<div
					style={{
						padding: '12px',
						maxHeight: '70vh',
						overflowY: 'auto',
					}}
				>
					{STICKY_TYPES.map(({ type, label, tooltip }) => (
						<div
							key={type}
							style={{
								display: 'flex',
								alignItems: 'flex-start',
								gap: '10px',
								padding: '8px 0',
								borderBottom: '1px solid #f5f5f5',
							}}
						>
							<div
								style={{
									width: '24px',
									height: '24px',
									borderRadius: '4px',
									backgroundColor: STICKY_COLORS[type],
									border: type === 'sketch' 
										? '2px solid #ccc' 
										: type === 'bounded-context'
											? '3px dashed #2196F3'
											: 'none',
									flexShrink: 0,
									boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
									opacity: type === 'bounded-context' ? 0.3 : 1,
								}}
							/>
							<div
								style={{
									flex: 1,
									fontSize: '12px',
									lineHeight: '1.4',
								}}
							>
								<div
									style={{
										fontWeight: '600',
										color: '#333',
										marginBottom: '2px',
									}}
								>
									{label.replace(/^[^\s]+\s/, '')}
								</div>
								<div
									style={{
										color: '#666',
										fontSize: '11px',
									}}
								>
									{tooltip}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

function EventStormingTools() {
	const editor = useEditor()
	const [isAligning, setIsAligning] = useState(false)

	const handleAutoAlign = useCallback(() => {
		if (!editor || isAligning) return

		setIsAligning(true)
		try {
			// Get all sticky notes on the canvas
			const allShapes = editor.getCurrentPageShapes()
			const stickyNotes = allShapes.filter(
				(shape) => shape.type === 'event-storming-sticky'
			) as any[]

			if (stickyNotes.length === 0) {
				alert('No sticky notes to align. Create some sticky notes first!')
				setIsAligning(false)
				return
			}

			// Group sticky notes by type
			const groupedByType: Record<string, any[]> = {}
			stickyNotes.forEach((note) => {
				const type = note.props.type
				if (!groupedByType[type]) {
					groupedByType[type] = []
				}
				groupedByType[type].push(note)
			})

			// Define order of types (left to right)
			// Bounded contexts are handled separately (placed first, larger)
			const typeOrder = ['bounded-context', 'actor', 'command', 'system', 'event', 'policy', 'aggregate', 'read-model', 'value', 'hot-spot', 'sketch']
			
			// Layout configuration
			const COLUMN_WIDTH = 250
			const ROW_HEIGHT = 140
			const BC_COLUMN_WIDTH = 650 // Bounded contexts are wider
			const BC_ROW_HEIGHT = 450 // Bounded contexts are taller
			const START_X = 100
			const START_Y = 100
			const PADDING = 20

			// Calculate positions
			const updates: Array<{ id: string; x: number; y: number }> = []
			let currentX = START_X

			// Handle bounded contexts first (they're larger)
			const boundedContexts = groupedByType['bounded-context'] || []
			if (boundedContexts.length > 0) {
				let currentY = START_Y
				boundedContexts.forEach((note) => {
					updates.push({
						id: note.id,
						x: currentX,
						y: currentY,
					})
					currentY += BC_ROW_HEIGHT + PADDING
				})
				currentX += BC_COLUMN_WIDTH + PADDING * 2
			}

			// Handle other types
			typeOrder.forEach((type) => {
				if (type === 'bounded-context') return // Already handled
				
				const notes = groupedByType[type] || []
				if (notes.length === 0) return

				let currentY = START_Y
				notes.forEach((note, index) => {
					updates.push({
						id: note.id,
						x: currentX,
						y: currentY,
					})
					currentY += ROW_HEIGHT + PADDING
				})

				// Move to next column
				currentX += COLUMN_WIDTH + PADDING
			})

			// Apply updates in a batch
			editor.batch(() => {
				updates.forEach(({ id, x, y }) => {
					editor.updateShape({
						id,
						type: 'event-storming-sticky',
						x,
						y,
					})
				})
			})

			// Zoom to fit all shapes
			if (updates.length > 0) {
				const bounds = editor.getViewportPageBounds()
				const allX = updates.map((u) => {
					const note = stickyNotes.find((n) => n.id === u.id)
					const width = note?.props.type === 'bounded-context' ? 600 : 200
					return u.x + width
				})
				const allY = updates.map((u) => {
					const note = stickyNotes.find((n) => n.id === u.id)
					const height = note?.props.type === 'bounded-context' ? 400 : 120
					return u.y + height
				})
				const minX = Math.min(...updates.map((u) => u.x))
				const maxX = Math.max(...allX)
				const minY = Math.min(...updates.map((u) => u.y))
				const maxY = Math.max(...allY)

				editor.setCamera({
					x: (minX + maxX) / 2 - bounds.w / 2,
					y: (minY + maxY) / 2 - bounds.h / 2,
					z: Math.min(
						bounds.w / (maxX - minX + 100),
						bounds.h / (maxY - minY + 100),
						1
					),
				})
			}

			console.log(`Auto-aligned ${updates.length} sticky notes`)
		} catch (error) {
			console.error('Error auto-aligning:', error)
			alert(`Error auto-aligning: ${error instanceof Error ? error.message : String(error)}`)
		} finally {
			setIsAligning(false)
		}
	}, [editor, isAligning])

	const handleCreateSticky = useCallback((type: string, label: string, color: string) => {
		if (!editor) {
			console.error('Editor not available')
			return
		}

		try {
			// Get a random template for this type
			const templates = STICKY_TEMPLATES[type] || ['']
			const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
			
			// Create a unique shape ID
			const id = `shape:${Math.random().toString(36).substring(2, 15)}`
			
			// Get viewport center for better placement
			let x = 200
			let y = 200
			
			try {
				const viewport = editor.getViewportPageBounds()
				if (viewport && viewport.w > 0 && viewport.h > 0) {
					x = viewport.x + viewport.w / 2 - 100
					y = viewport.y + viewport.h / 2 - 60
					// Add some randomness but keep it centered
					const offsetX = (Math.random() - 0.5) * 300
					const offsetY = (Math.random() - 0.5) * 300
					x += offsetX
					y += offsetY
				}
			} catch (err) {
				console.warn('Could not get viewport, using default position', err)
			}
			
			console.log('Creating sticky note:', { type, x, y, id, shapeType: 'event-storming-sticky', template: randomTemplate })
			
			// Special handling for bounded context (larger size)
			const isBoundedContext = type === 'bounded-context'
			const width = isBoundedContext ? 600 : 200
			const height = isBoundedContext ? 400 : 120
			
			// Adjust position for bounded context (center it better)
			if (isBoundedContext) {
				x = x - 200
				y = y - 200
			}
			
			// Create the shape with all required properties and pre-filled template
			editor.createShapes([
				{
					id,
					type: 'event-storming-sticky',
					x,
					y,
					rotation: 0,
					isLocked: false,
					opacity: 1,
					props: {
						w: width,
						h: height,
						type: type as any,
						text: randomTemplate,
						color: color as any,
						fill: 'solid',
						size: 'm',
					},
				},
			])
			
			console.log('Shape created successfully')
			
			// Select the new shape
			editor.setSelectedShapes([id])
		} catch (error) {
			console.error('Error creating sticky note:', error)
			console.error('Error details:', {
				message: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : undefined,
			})
			alert(`Error creating sticky note: ${error instanceof Error ? error.message : String(error)}\n\nCheck the browser console for more details.`)
		}
	}, [editor])

	return (
		<div
			style={{
				position: 'absolute',
				top: '60px',
				left: '12px',
				zIndex: 1000,
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				backgroundColor: 'white',
				padding: '12px',
				borderRadius: '8px',
				boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
				pointerEvents: 'auto',
			}}
			onClick={(e) => e.stopPropagation()}
			onMouseDown={(e) => e.stopPropagation()}
		>
			<div
				style={{
					fontSize: '12px',
					fontWeight: '600',
					marginBottom: '4px',
					color: '#333',
				}}
			>
				Event Storming Tools
			</div>
			<button
				onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
					handleAutoAlign()
				}}
				disabled={isAligning}
				title="Auto-align all sticky notes by type in organized columns"
				style={{
					padding: '8px 12px',
					border: '1px solid #4CAF50',
					borderRadius: '4px',
					backgroundColor: isAligning ? '#e8f5e9' : '#4CAF50',
					color: 'white',
					cursor: isAligning ? 'wait' : 'pointer',
					fontSize: '13px',
					fontWeight: '600',
					textAlign: 'center',
					transition: 'all 0.2s',
					pointerEvents: 'auto',
					marginBottom: '8px',
					opacity: isAligning ? 0.7 : 1,
				}}
				onMouseEnter={(e) => {
					if (!isAligning) {
						e.currentTarget.style.backgroundColor = '#45a049'
					}
				}}
				onMouseLeave={(e) => {
					if (!isAligning) {
						e.currentTarget.style.backgroundColor = '#4CAF50'
					}
				}}
			>
				{isAligning ? '⏳ Aligning...' : '📐 Auto Align'}
			</button>
			{STICKY_TYPES.map(({ type, label, color, tooltip }) => (
				<button
					key={type}
					title={tooltip}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						handleCreateSticky(type, label, color)
					}}
					style={{
						padding: '8px 12px',
						border: '1px solid #ddd',
						borderRadius: '4px',
						backgroundColor: 'white',
						cursor: 'pointer',
						fontSize: '13px',
						textAlign: 'left',
						transition: 'all 0.2s',
						pointerEvents: 'auto',
						position: 'relative',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = '#f5f5f5'
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'white'
					}}
				>
					{label}
				</button>
			))}
		</div>
	)
}

interface EventStormingBoardProps {
	roomId?: string
}

export function EventStormingBoard({ roomId = 'event-storming-default' }: EventStormingBoardProps) {
	const [store] = useState(() => 
		createTLStore({
			shapeUtils: [EventStormingStickyUtil],
		})
	)

	// Load from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem(`tldraw-${roomId}`)
		if (saved) {
			try {
				const snapshot = JSON.parse(saved)
				store.loadSnapshot(snapshot)
			} catch (e) {
				console.error('Failed to load saved data:', e)
			}
		}
	}, [store, roomId])

	// Save to localStorage on changes
	useEffect(() => {
		const unsubscribe = store.listen(() => {
			const snapshot = store.getSnapshot()
			localStorage.setItem(`tldraw-${roomId}`, JSON.stringify(snapshot))
		}, { source: 'user', scope: 'document' })

		return () => unsubscribe()
	}, [store, roomId])

	const [showLegend, setShowLegend] = useState(true)

	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw
				store={store}
				shapeUtils={[EventStormingStickyUtil]}
				persistenceKey={`event-storming-${roomId}`}
			>
				<EventStormingTools />
				<ColorLegend showLegend={showLegend} onToggle={() => setShowLegend(!showLegend)} />
			</Tldraw>
		</div>
	)
}
