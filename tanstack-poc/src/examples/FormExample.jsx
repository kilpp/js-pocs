import { useForm } from '@tanstack/react-form'
import { useState } from 'react'

function FormExample() {
  const [submittedData, setSubmittedData] = useState(null)

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
    },
    onSubmit: async ({ value }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmittedData(value)
      console.log('Form submitted:', value)
    },
  })

  return (
    <div>
      <h2>TanStack Form</h2>
      <p>Headless, type-safe form state management with validation</p>

      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          style={{
            maxWidth: '500px',
            margin: '2rem auto',
            textAlign: 'left',
          }}
        >
          <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'First name is required' : value.length < 2 ? 'Must be at least 2 characters' : undefined,
          }}
          children={(field) => (
            <div style={fieldStyle}>
              <label htmlFor={field.name} style={labelStyle}>
                First Name:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                style={inputStyle}
              />
              {field.state.meta.errors && (
                <span style={errorStyle}>{field.state.meta.errors.join(', ')}</span>
              )}
            </div>
          )}
        />

        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Last name is required' : undefined,
          }}
          children={(field) => (
            <div style={fieldStyle}>
              <label htmlFor={field.name} style={labelStyle}>
                Last Name:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                style={inputStyle}
              />
              {field.state.meta.errors && (
                <span style={errorStyle}>{field.state.meta.errors.join(', ')}</span>
              )}
            </div>
          )}
        />

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Email is required'
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Invalid email address'
              }
              return undefined
            },
          }}
          children={(field) => (
            <div style={fieldStyle}>
              <label htmlFor={field.name} style={labelStyle}>
                Email:
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                style={inputStyle}
              />
              {field.state.meta.errors && (
                <span style={errorStyle}>{field.state.meta.errors.join(', ')}</span>
              )}
            </div>
          )}
        />

        <form.Field
          name="age"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Age is required'
              const age = parseInt(value)
              if (isNaN(age)) return 'Must be a number'
              if (age < 18) return 'Must be at least 18'
              if (age > 120) return 'Must be less than 120'
              return undefined
            },
          }}
          children={(field) => (
            <div style={fieldStyle}>
              <label htmlFor={field.name} style={labelStyle}>
                Age:
              </label>
              <input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                style={inputStyle}
              />
              {field.state.meta.errors && (
                <span style={errorStyle}>{field.state.meta.errors.join(', ')}</span>
              )}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                ...buttonStyle,
                marginTop: '1rem',
                width: '100%',
                opacity: !canSubmit ? 0.5 : 1,
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        />
      </form>
      </form.Provider>

      {submittedData && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          maxWidth: '500px',
          margin: '2rem auto',
        }}>
          <h3 style={{ marginTop: 0, color: '#155724' }}>Form Submitted Successfully!</h3>
          <pre style={{ textAlign: 'left', overflow: 'auto' }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

const fieldStyle = {
  marginBottom: '1.5rem',
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
}

const errorStyle = {
  color: '#dc3545',
  fontSize: '0.875rem',
  marginTop: '0.25rem',
  display: 'block',
}

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ccc',
  background: '#007bff',
  color: 'white',
}

export default FormExample
