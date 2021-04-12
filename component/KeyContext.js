import React, {Component} from 'react';

export const KeyContext = React.createContext();

class KeyContextProvider extends Component {

    state = {
        key: null,
        isValid: false
    }
    setIsValid = (val) => {
        this.setState({isValid: val})
    }
    setKey = (key) => {
        this.setState({key: key})
    }
    render() {
        return ( 
            <KeyContext.Provider value={{...this.state, setKey: this.setKey}}>
                {this.props.children}
            </KeyContext.Provider>
        )
    }
}

export default KeyContextProvider;