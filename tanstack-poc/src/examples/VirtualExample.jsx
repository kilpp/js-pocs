import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

function VirtualExample() {
  const parentRef = useRef(null)

  // Generate 10000 items
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
  }))

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  })

  return (
    <div>
      <h2>TanStack Virtual</h2>
      <p>Efficiently render large lists with virtualization</p>
      
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <p>
          <strong>Total items: {items.length.toLocaleString()}</strong>
          <br />
          <small>Only visible items are rendered to the DOM</small>
        </p>
      </div>

      <div
        ref={parentRef}
        style={{
          height: '500px',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          overflow: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = items[virtualRow.index]
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  background: virtualRow.index % 2 === 0 ? '#f9f9f9' : 'white',
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#666' }}>
                  {item.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#e7f3ff',
        borderLeft: '4px solid #2196f3',
        borderRadius: '4px',
        maxWidth: '600px',
        margin: '1.5rem auto',
        textAlign: 'left',
      }}>
        <strong>Why Virtual Scrolling?</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Renders only visible items</li>
          <li>Maintains smooth 60fps scrolling</li>
          <li>Handles millions of rows efficiently</li>
          <li>Reduces memory consumption</li>
          <li>Works with dynamic row heights</li>
        </ul>
      </div>
    </div>
  )
}

export default VirtualExample
