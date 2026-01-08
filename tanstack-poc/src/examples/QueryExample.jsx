import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Simulate API calls
const fetchUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
  ]
}

const addUser = async (newUser) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { id: Date.now(), ...newUser }
}

function QueryExample() {
  const queryClient = useQueryClient()
  
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleAddUser = () => {
    mutation.mutate({
      name: `User ${Math.floor(Math.random() * 1000)}`,
      email: `user${Math.floor(Math.random() * 1000)}@example.com`
    })
  }

  return (
    <div>
      <h2>TanStack Query</h2>
      <p>Data fetching, caching, and server state management</p>
      
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => refetch()} style={buttonStyle}>
          Refetch Users
        </button>
        <button 
          onClick={handleAddUser} 
          style={{ ...buttonStyle, marginLeft: '0.5rem' }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Random User'}
        </button>
      </div>

      {isLoading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      
      {users && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Users:</h3>
          <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
            {users.map(user => (
              <li key={user.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mutation.isSuccess && (
        <p style={{ color: 'green', marginTop: '1rem' }}>User added successfully!</p>
      )}
    </div>
  )
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ccc',
  background: '#f0f0f0'
}

export default QueryExample
