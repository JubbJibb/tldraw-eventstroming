import {
	BaseBoxShapeUtil,
	HTMLContainer,
	TLBaseShape,
	TLDefaultColorStyle,
	TLDefaultFillStyle,
	TLDefaultSizeStyle,
	useEditor,
} from 'tldraw'
import { useState, useEffect, useRef } from 'react'

export type EventStormingStickyType = 'event' | 'command' | 'aggregate' | 'actor' | 'read-model' | 'hot-spot' | 'system' | 'policy' | 'value' | 'sketch' | 'bounded-context'

export type EventStormingStickyShape = TLBaseShape<
	'event-storming-sticky',
	{
		w: number
		h: number
		type: EventStormingStickyType
		text: string
		color: TLDefaultColorStyle
		fill: TLDefaultFillStyle
		size: TLDefaultSizeStyle
	}
>

const STICKY_CONFIG: Record<
	EventStormingStickyType,
	{ label: string; defaultColor: TLDefaultColorStyle; emoji: string; postItColor: string }
> = {
	event: { label: 'Event', defaultColor: 'orange', emoji: '📅', postItColor: '#FFA500' }, // Orange
	command: { label: 'Command', defaultColor: 'blue', emoji: '⚡', postItColor: '#4169E1' }, // Royal Blue
	aggregate: { label: 'Aggregate', defaultColor: 'yellow', emoji: '📦', postItColor: '#FFD700' }, // Gold/Yellow
	actor: { label: 'Actor', defaultColor: 'pink', emoji: '👤', postItColor: '#FFB6C1' }, // Light Pink (like in diagram)
	'read-model': { label: 'Read Model', defaultColor: 'green', emoji: '📊', postItColor: '#32CD32' }, // Lime Green
	'hot-spot': { label: 'Hot Spot', defaultColor: 'red', emoji: '🔥', postItColor: '#FF00FF' }, // Magenta (like in diagram)
	system: { label: 'System', defaultColor: 'pink', emoji: '⚙️', postItColor: '#FFB6C1' }, // Light Pink
	policy: { label: 'Policy', defaultColor: 'purple', emoji: '📋', postItColor: '#9370DB' }, // Medium Purple
	value: { label: 'Value', defaultColor: 'green', emoji: '💎', postItColor: '#90EE90' }, // Light Green
	sketch: { label: 'Sketch', defaultColor: 'white', emoji: '✏️', postItColor: '#FFFFFF' }, // White
	'bounded-context': { label: 'Bounded Context', defaultColor: 'blue', emoji: '🔷', postItColor: '#E3F2FD' }, // Light Blue
}

export class EventStormingStickyUtil extends BaseBoxShapeUtil<EventStormingStickyShape> {
	static override type = 'event-storming-sticky' as const

	override getDefaultProps(): EventStormingStickyShape['props'] {
		return {
			w: 200,
			h: 120,
			type: 'event',
			text: '',
			color: 'orange',
			fill: 'solid',
			size: 'm',
		}
	}

	override component(shape: EventStormingStickyShape) {
		const config = STICKY_CONFIG[shape.props.type]
		if (!config) {
			console.error('Unknown sticky type:', shape.props.type)
			return <HTMLContainer>Unknown type: {shape.props.type}</HTMLContainer>
		}
		// Use the post-it color directly instead of theme color
		const postItColor = config.postItColor
		const editor = useEditor()
		const [isEditing, setIsEditing] = useState(false)
		const [text, setText] = useState(shape.props.text)
		const textareaRef = useRef<HTMLTextAreaElement>(null)

		useEffect(() => {
			setText(shape.props.text)
		}, [shape.props.text])

		useEffect(() => {
			if (isEditing && textareaRef.current) {
				textareaRef.current.focus()
				textareaRef.current.select()
			}
		}, [isEditing])

		const handleDoubleClick = () => {
			setIsEditing(true)
		}

		const handleBlur = () => {
			setIsEditing(false)
			editor.updateShape<EventStormingStickyShape>({
				id: shape.id,
				type: 'event-storming-sticky',
				props: {
					...shape.props,
					text: text.trim(),
				},
			})
		}

		const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
				handleBlur()
			}
			if (e.key === 'Escape') {
				setText(shape.props.text)
				setIsEditing(false)
			}
		}

		// Add border for white/sketch sticky notes for visibility
		const isWhite = postItColor === '#FFFFFF' || shape.props.type === 'sketch'
		const isBoundedContext = shape.props.type === 'bounded-context'
		
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					backgroundColor: isBoundedContext ? 'rgba(227, 242, 253, 0.3)' : postItColor,
					borderRadius: isBoundedContext ? '12px' : '8px',
					border: isBoundedContext 
						? '3px dashed #2196F3' 
						: isWhite 
							? '2px solid #ccc' 
							: 'none',
					boxShadow: isBoundedContext 
						? '0 4px 12px rgba(33, 150, 243, 0.2)' 
						: '0 2px 8px rgba(0,0,0,0.15)',
					padding: '12px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					overflow: 'hidden',
					cursor: 'pointer',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					position: 'relative',
				}}
				onDoubleClick={handleDoubleClick}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '6px',
						fontSize: isBoundedContext ? '14px' : '12px',
						fontWeight: '600',
						color: isBoundedContext ? '#1976D2' : 'rgba(0,0,0,0.7)',
						textTransform: 'uppercase',
						letterSpacing: '0.5px',
					}}
				>
					<span>{config.emoji}</span>
					<span>{config.label}</span>
				</div>
				{isEditing ? (
					<textarea
						ref={textareaRef}
						value={text}
						onChange={(e) => setText(e.target.value)}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						style={{
							flex: 1,
							fontSize: isBoundedContext ? '16px' : '14px',
							fontWeight: isBoundedContext ? '500' : 'normal',
							color: isBoundedContext ? '#1565C0' : 'rgba(0,0,0,0.9)',
							lineHeight: '1.4',
							backgroundColor: 'transparent',
							border: isBoundedContext ? '2px solid #2196F3' : '2px solid rgba(0,0,0,0.3)',
							borderRadius: '4px',
							padding: '4px',
							resize: 'none',
							fontFamily: 'inherit',
							outline: 'none',
							textAlign: isBoundedContext ? 'center' : 'left',
						}}
					/>
				) : (
					<div
						style={{
							flex: 1,
							fontSize: isBoundedContext ? '16px' : '14px',
							fontWeight: isBoundedContext ? '500' : 'normal',
							color: isBoundedContext ? '#1565C0' : 'rgba(0,0,0,0.9)',
							lineHeight: '1.4',
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
							textAlign: isBoundedContext ? 'center' : 'left',
							display: 'flex',
							alignItems: 'center',
							justifyContent: isBoundedContext ? 'center' : 'flex-start',
						}}
					>
						{text || 'Double click to edit'}
					</div>
				)}
			</HTMLContainer>
		)
	}

	override indicator(shape: EventStormingStickyShape) {
		return (
			<rect
				width={shape.props.w}
				height={shape.props.h}
				rx={8}
				ry={8}
			/>
		)
	}
}
