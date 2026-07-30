import React from "react";

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true
        }
    }

    componenetDidCatch(error: any, info: any) {
        console.log(error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong</h1>
                    <p>Please refresh this page</p>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary