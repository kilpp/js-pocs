import { useStore } from '@tanstack/react-store'
import { store, incrementCount, decrementCount } from './store'

function App() {
  const count = useStore(store, (state) => state.count)

  return (
    <div style={{ 
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <h1>Hello World!</h1>
      <p style={{ fontSize: '1.5rem', margin: '2rem 0' }}>
        Counter: <strong>{count}</strong>
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={decrementCount}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: '#f0f0f0'
          }}
        >
          Decrement
        </button>
        <button 
          onClick={incrementCount}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: '#f0f0f0'
          }}
        >
          Increment
        </button>
      </div>
    </div>
  )
}

export default App
