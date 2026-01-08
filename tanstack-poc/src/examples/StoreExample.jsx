import { useStore } from '@tanstack/react-store'
import { store, incrementCount, decrementCount } from '../store'

function StoreExample() {
  const count = useStore(store, (state) => state.count)

  return (
    <div>
      <h2>TanStack Store</h2>
      <p>Simple, reactive state management</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Hello World!</h3>
        <p style={{ fontSize: '1.5rem', margin: '2rem 0' }}>
          Counter: <strong>{count}</strong>
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={decrementCount}
            style={buttonStyle}
          >
            Decrement
          </button>
          <button 
            onClick={incrementCount}
            style={buttonStyle}
          >
            Increment
          </button>
        </div>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '2rem auto',
        textAlign: 'left',
      }}>
        <h4>TanStack Store Features:</h4>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Framework-agnostic reactive state management</li>
          <li>Simple API - just create a store and use it</li>
          <li>Lightweight and performant</li>
          <li>Type-safe with TypeScript</li>
          <li>No boilerplate required</li>
        </ul>
      </div>
    </div>
  )
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ccc',
  background: '#f0f0f0',
}

export default StoreExample
