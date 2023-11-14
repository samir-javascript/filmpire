
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI
      return (
          <div className='error-container'>
               <p>Something went wrong.</p>
                <button>
                    <Link style={{ textDecoration:'none'}} to='/'>Go Back</Link>
                </button>
          </div>
      )
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;

// Example function to log errors to a service
function logErrorToMyService(error, errorInfo) {
  // Implement your error logging logic here
  console.error('Error:', error);
  console.error('Error Info:', errorInfo);
}
