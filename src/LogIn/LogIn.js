import React from 'react';
import './LogIn.css';

class LogIn extends React.Component {
    state={
        login : null,
    }

    setLogin = () => {
        const {setLogin} = this.props;
        const loginInput = document.querySelector('.login-newLogin');
        const login = loginInput.value;
        this.setState({login})
        setLogin(login);
        console.log('login -- ', login);
        
    }

    componentDidUpdate(){
        console.log('login state --- ', this.state);
        
    }

    isLogin = () => {
        const { login } = this.state;
        if (!login) {
            return (
                <>
                    <input className='login-newLogin' type='text' placeholder=' Enter Your login' autoFocus></input> 
                    <button
                        onClick={this.setLogin}
                    >Log In</button>
                </>
            )
        }

        return (
            <>
                <span className='login-login'>{ login }</span>     
                <button>Log Out</button>
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