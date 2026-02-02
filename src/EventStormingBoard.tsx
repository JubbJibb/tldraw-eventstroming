import { Tldraw, TldrawUiMenuItem, useEditor, useRelevantStyles } from 'tldraw'
import 'tldraw/tldraw.css'
import { EventStormingStickyUtil } from './shapes/EventStormingSticky'
import { useSyncDemo } from '@tldraw/sync'

const STICKY_TYPES = [
	{ type: 'event' as const, label: '📅 Event', color: 'orange' },
	{ type: 'command' as const, label: '⚡ Command', color: 'blue' },
	{ type: 'aggregate' as const, label: '📦 Aggregate', color: 'yellow' },
	{ type: 'actor' as const, label: '👤 Actor', color: 'pink' },
	{ type: 'read-model' as const, label: '📊 Read Model', color: 'green' },
	{ type: 'hot-spot' as const, label: '🔥 Hot Spot', color: 'red' },
] as const

function EventStormingTools() {
	const editor = useEditor()

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
			}}
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
			{STICKY_TYPES.map(({ type, label, color }) => (
				<button
					key={type}
					onClick={() => {
						const id = editor.createShapeId()
						editor.createShape({
							id,
							type: 'event-storming-sticky',
							x: Math.random() * 400 + 100,
							y: Math.random() * 400 + 100,
							props: {
								type,
								text: '',
								color: color as any,
							},
						})
						editor.setSelectedShapes([id])
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
	const store = useSyncDemo({ roomId })

	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw
				store={store}
				shapeUtils={[EventStormingStickyUtil]}
				overrides={{
					tools(editor, tools) {
						return tools
					},
				}}
			>
				<EventStormingTools />
			</Tldraw>
		</div>
	)
}
