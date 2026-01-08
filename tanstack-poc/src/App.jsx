import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StoreExample from './examples/StoreExample'
import QueryExample from './examples/QueryExample'
import TableExample from './examples/TableExample'
import RouterExample from './examples/RouterExample'
import FormExample from './examples/FormExample'
import VirtualExample from './examples/VirtualExample'

const queryClient = new QueryClient()

const tabs = [
  { id: 'store', label: 'Store', component: StoreExample },
  { id: 'query', label: 'Query', component: QueryExample },
  { id: 'table', label: 'Table', component: TableExample },
  { id: 'form', label: 'Form', component: FormExample },
  { id: 'virtual', label: 'Virtual', component: VirtualExample },
  { id: 'router', label: 'Router', component: RouterExample },
]

function App() {
  const [activeTab, setActiveTab] = useState('store')
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ 
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        background: '#fafafa',
      }}>
        <h1 style={{ marginBottom: '0.5rem' }}>TanStack Libraries Demo</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Explore all the powerful TanStack libraries
        </p>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: activeTab === tab.id ? '#007bff' : '#ccc',
                background: activeTab === tab.id ? '#007bff' : 'white',
                color: activeTab === tab.id ? 'white' : '#333',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {ActiveComponent && <ActiveComponent />}
        </div>

        <footer style={{
          marginTop: '3rem',
          padding: '1rem',
          color: '#666',
          fontSize: '0.875rem',
        }}>
          <p>
            Learn more at{' '}
            <a 
              href="https://tanstack.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#007bff' }}
            >
              tanstack.com
            </a>
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  )
}

export default App
