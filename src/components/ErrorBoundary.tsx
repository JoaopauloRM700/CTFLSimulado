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
    console.error('Error Boundary capturou um erro:', error, errorInfo);
    // Adicione aqui qualquer lógica de relatório de erros (ex: Sentry, LogRocket)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ⚠️ Ops! Algo deu errado
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-red-700 mb-4">
                Desculpe, encontramos um problema inesperado.
              </p>
              {this.state.error && (
                <details className="mb-4">
                  <summary className="text-sm text-red-600 cursor-pointer">
                    Detalhes técnicos
                  </summary>
                  <code className="text-xs text-red-500 mt-2 block break-all">
                    {this.state.error.toString()}
                  </code>
                </details>
              )}
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                onClick={() => window.location.reload()}
              >
                Recarregar Aplicação
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;