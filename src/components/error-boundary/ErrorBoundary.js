import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError");
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing to back to the home page or wait
          five seconds
        </h1>
      );
    }
  }
}
export default ErrorBoundary;
