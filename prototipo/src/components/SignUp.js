import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api' 

import Logo from '../assets/kbase_logo.svg'

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: ''
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/users", { username, email, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta." });
      }
    }
  };


  render() {
    return (

        <div onSubmit={this.handleSignUp}>
            <img src={Logo} alt="kbase_logo"/>
            {this.state.error && <p>{this.state.error}</p>}
            <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ username: e.target.value })}
            />
            <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
            />
            <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
            />
            <button type="submit">Cadastrar grátis</button>
            <hr />
            <Link to="/">Fazer login</Link>
        </div>
    );
  }
}

export default SignUp;