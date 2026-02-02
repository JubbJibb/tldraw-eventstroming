import { EventStormingBoard } from './EventStormingBoard'

function App() {
  // You can change the roomId to create separate boards
  // Share the same roomId with your team for collaboration
  const roomId = new URLSearchParams(window.location.search).get('room') || 'event-storming-default'

  return <EventStormingBoard roomId={roomId} />
}

export default App
