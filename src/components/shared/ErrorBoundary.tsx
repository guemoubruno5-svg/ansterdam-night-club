import { Component, type ErrorInfo, type ReactNode } from 'react'
type Props = { children: ReactNode }; type State = { failed: boolean }
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }
  static getDerivedStateFromError(): State { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Erreur de rendu ANSTERDAM', error, info) }
  render() { if (this.state.failed) return <main className="error-page"><h1>Une erreur est survenue lors du chargement.</h1><p>Le site n’a pas pu afficher cette page correctement.</p><a className="btn btn-primary" href="/">REVENIR À L’ACCUEIL</a></main>; return this.props.children }
}
