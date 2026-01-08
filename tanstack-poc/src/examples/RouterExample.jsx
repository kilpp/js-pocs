function RouterExample() {
  return (
    <div>
      <h2>TanStack Router</h2>
      <p>Type-safe, modern routing for React applications</p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        background: '#f9f9f9', 
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '2rem auto'
      }}>
        <h3>Key Features:</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>Type-safe routing:</strong> Full TypeScript support with autocomplete</li>
          <li><strong>File-based routing:</strong> Optional file-based route generation</li>
          <li><strong>Search params validation:</strong> Type-safe URL search parameters</li>
          <li><strong>Data loading:</strong> Built-in loaders and lazy loading</li>
          <li><strong>Nested routes:</strong> Support for complex layouts</li>
          <li><strong>Code splitting:</strong> Automatic route-based code splitting</li>
        </ul>
        
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: '#fff3cd', 
          borderLeft: '4px solid #ffc107',
          borderRadius: '4px'
        }}>
          <strong>Note:</strong> TanStack Router requires a more complex setup with route definitions 
          and typically works best in a full application structure. For this demo, we're showing 
          the concept within a tabbed interface instead of full routing.
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h4>Example Route Structure:</h4>
          <pre style={{ 
            background: '#282c34', 
            color: '#abb2bf', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto',
            textAlign: 'left',
            fontSize: '0.85rem'
          }}>
{`// routes/index.tsx
export const Route = createFileRoute('/')({
  component: Home
})

// routes/about.tsx  
export const Route = createFileRoute('/about')({
  component: About,
  loader: async () => {
    return { data: await fetchData() }
  }
})

// routes/users/$userId.tsx
export const Route = createFileRoute('/users/$userId')({
  component: UserDetail,
  validateSearch: (search) => {
    return { tab: search.tab || 'profile' }
  }
})`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default RouterExample
