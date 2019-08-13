import React from 'react';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

import './LogIn.css';

class LogIn extends React.Component {
    state={
        login : null,
    }

    setLogin = (localLogin) => {
        
        const {setLogin} = this.props;
        const loginInput = document.querySelector('.login-newLogin');
        let login = loginInput.value;
        
        if (login) {
            localStorage.setItem('login', login)
        }else
        if (!this.state.login && localLogin) {
            login = localLogin;
        }
        
        if ( !loginInput.value){
            return
        }
        
        this.setState({login})
        setLogin(login);
    }

    add = (e) => {
        e.persist();
        if(e.charCode === 13){
            this.setLogin()
        }
    }

    removeLogin = () => {
        localStorage.removeItem("login")
        this.setState({login : null})
        const {setLogin} = this.props;
        setLogin('');
    }

    componentDidMount(){
        const localLogin = localStorage.getItem('login');
        const {setLogin} = this.props;
        if (!this.state.login && localLogin) {
            this.setState({login: localLogin})
            setLogin(localLogin);
        }
    }

    isLogin = () => {
        const { login } = this.state;
        if (!login) {
            return (
                <InputGroup className="mb-3">
                    <FormControl
                        className='login-newLogin' 
                        placeholder=" Enter Your login"
                        autoFocus
                        onKeyPress={this.add}
                    />
                  
                <Button
                    variant="warning"
                    onClick={this.setLogin}
                >Log In</Button>
                </InputGroup>
            )
        }

        return (
            <>
                <span className='login-login'>{ login }</span>  
                <Button
                    variant="info"
                    onClick={this.removeLogin}
                >Log Out</Button>
            </>
        );
    }

    render(){
        const login = this.isLogin();

        return(
            <div className='login-wrapper'>
                {login}
            </div>
        )
    }
}

export default LogIn;