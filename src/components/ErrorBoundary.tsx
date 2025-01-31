import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container error-container">
          <h1 className="error-title">⚠️ Ops! Algo deu errado</h1>
          <div className="error-box">
            <p className="error-message">Desculpe, encontramos um problema inesperado.</p>
            {this.state.error && (
              <details>
                <summary>Detalhes técnicos</summary>
                <code>{this.state.error.toString()}</code>
              </details>
            )}
            <button className="error-button" onClick={() => window.location.reload()}>
              Recarregar Aplicação
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
