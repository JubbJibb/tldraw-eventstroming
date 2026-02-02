import {
	BaseBoxShapeUtil,
	HTMLContainer,
	TLBaseShape,
	TLDefaultColorStyle,
	TLDefaultFillStyle,
	TLDefaultSizeStyle,
	getDefaultColorTheme,
	useEditor,
} from 'tldraw'
import { useState, useEffect, useRef } from 'react'

export type EventStormingStickyType = 'event' | 'command' | 'aggregate' | 'actor' | 'read-model' | 'hot-spot'

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
	{ label: string; defaultColor: TLDefaultColorStyle; emoji: string }
> = {
	event: { label: 'Event', defaultColor: 'orange', emoji: '📅' },
	command: { label: 'Command', defaultColor: 'blue', emoji: '⚡' },
	aggregate: { label: 'Aggregate', defaultColor: 'yellow', emoji: '📦' },
	actor: { label: 'Actor', defaultColor: 'pink', emoji: '👤' },
	'read-model': { label: 'Read Model', defaultColor: 'green', emoji: '📊' },
	'hot-spot': { label: 'Hot Spot', defaultColor: 'red', emoji: '🔥' },
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
		const theme = getDefaultColorTheme({ isDarkMode: false })
		const config = STICKY_CONFIG[shape.props.type]
		const color = theme[shape.props.color]
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

		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					backgroundColor: color,
					borderRadius: '8px',
					boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
					padding: '12px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					overflow: 'hidden',
					cursor: 'pointer',
					fontFamily: 'system-ui, -apple-system, sans-serif',
				}}
				onDoubleClick={handleDoubleClick}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '6px',
						fontSize: '12px',
						fontWeight: '600',
						color: 'rgba(0,0,0,0.7)',
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
							fontSize: '14px',
							color: 'rgba(0,0,0,0.9)',
							lineHeight: '1.4',
							backgroundColor: 'transparent',
							border: '2px solid rgba(0,0,0,0.3)',
							borderRadius: '4px',
							padding: '4px',
							resize: 'none',
							fontFamily: 'inherit',
							outline: 'none',
						}}
					/>
				) : (
					<div
						style={{
							flex: 1,
							fontSize: '14px',
							color: 'rgba(0,0,0,0.9)',
							lineHeight: '1.4',
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
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
