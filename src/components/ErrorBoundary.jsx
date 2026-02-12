import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex flex-col justify-center items-center h-full">
          <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
          <p className="mb-4">We're sorry for the inconvenience. Please try refreshing or removing this widget.</p>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-2 bg-red-50 text-sm rounded">
              <summary>Error Details</summary>
              <pre className="whitespace-pre-wrap">{this.state.error && this.state.error.toString()}</pre>
              <pre className="whitespace-pre-wrap">{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
