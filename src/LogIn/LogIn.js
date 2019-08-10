import React from 'react';
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
        this.setState({login})
        setLogin(login);
    }

    removeLogin = () => {
        localStorage.removeItem("login")
        this.setState({login : null})
        const {setLogin} = this.props;
        setLogin('');
    }

    componentDidMount(){
        const localLogin = localStorage.getItem('login');
        if (!this.state.login && localLogin) {
            this.setLogin(localLogin);
        }
    }

    componentDidUpdate(){
        console.log('login did upDate , state --- ', this.state);   
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
                <button
                    onClick={this.removeLogin}
                >Log Out</button>
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