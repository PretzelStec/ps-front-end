import React, {Component} from 'react';
import Axios from 'axios';
import { AsyncStorage } from 'react-native';

export const AuthContext = React.createContext();

class AuthContextProvider extends Component {
    
    state = {
        isLoading: true,
        token: null,
        email : null,
        password : null,
        loginError: null,
        registerError: null
    }
    setIsLoading = (val) => {
        this.setState({isLoading: val});
    }
    setToken = (val) => {
        this.setState({token: val});
    }
    signIn = async (signInEmail, signInPassword) => {
      //console.log(password, email)
      this.setState({isLoading: true})
      return await Axios.post('https://password-safe-backend.herokuapp.com/api/user/login', {email:signInEmail, password:signInPassword})
      .then((res) => {
        this.setState({ isLoading: false, token: res.data.token, email: signInEmail, password: signInPassword, loginError: null});
      })
      .catch(err => {
        this.setState({ loginError: err, isLoading: false })
      })
    }
    signOut = () => {
        this.setState({ isLoading: false, token: null, password: null, email: null});
      }
    signUp = async (email, password) => {
        return await Axios.post('https://password-safe-backend.herokuapp.com/api/user/register', {email:email, password:password})
        .then((res) => {
          this.setState({registerError:null})
          return true
        })
        .catch((err) => {
          this.setState({registerError:err})
          return false
        })
      }
    render() {
        return ( 
            <AuthContext.Provider 
            value={{...this.state, signIn: this.signIn, signOut: this.signOut, signUp: this.signUp, setIsLoading: this.setIsLoading, setToken: this.setToken}}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider;