import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  pluginId: string;
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PluginErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Plugin "${this.props.pluginId}" crashed:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            Plugin &quot;{this.props.pluginId}&quot; encountered an error.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
