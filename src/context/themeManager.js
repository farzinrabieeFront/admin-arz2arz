import { createContext, useContext, Component } from "react";
import { withRouter } from "react-router-dom";

export const ThemeContext = createContext({
    theme: "light",
});

export const useTheme = () => useContext(ThemeContext);

class ThemeManager extends Component {
    state = {
        theme: "light",
    };

    constructor(props) {
        super(props);
    }

    toggleTheme = () => {
        if (this.state.theme === "light") {
            this.setState({ theme: "dark" });
            window.localStorage.setItem("theme", "dark")
        } else {
            this.setState({ theme: "light" })
            window.localStorage.setItem('theme', "light")
        }
    }
    componentDidMount() {
        const localTheme = window.localStorage.getItem("theme")
        if (localTheme) {
            this.setState({ theme: localTheme });
        }
    }
    render() {
        return (
            <ThemeContext.Provider
                value={{
                    theme: this.state.theme,
                    toggleTheme: this.toggleTheme
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default withRouter(ThemeManager);
