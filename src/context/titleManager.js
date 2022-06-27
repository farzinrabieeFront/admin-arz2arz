import { createContext, useContext, Component } from "react";
import { withRouter } from "react-router-dom";

export const TitleContext = createContext({
    title: "داشبورد",
});

export const useTitle = () => useContext(TitleContext);

class TitleManager extends Component {
    state = {
        title: "داشبورد",
    };

    constructor(props) {
        super(props);
    }

    setTitle = (val) => {
        this.setState({ title: val })
    }

    render() {
        return (
            <TitleContext.Provider
                value={{
                    title: this.state.title,
                    setTitle: this.setTitle
                }}
            >
                {this.props.children}
            </TitleContext.Provider>
        );
    }
}

export default withRouter(TitleManager);
