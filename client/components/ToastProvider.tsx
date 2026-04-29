import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#0f172a',
          borderRadius: '16px',
          padding: '14px 16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
        },
        success: {
          iconTheme: {
            primary: '#14b8a6',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  )
}
