import React, { Component } from 'react';
import './Assistente.css';
import answers from './answers.json';
import jotinha from './jotinha.jpeg';

class Assistente extends Component {

  constructor(props) {
    super(props);
    this.inputVal = React.createRef();
    this.msgHistory = React.createRef();
    this.state = {
      msgs: []
    };

    this.append = this.append.bind(this);
  }

  append() {

    var keywords = {
      "emprestimos": "loan",
      "emprestimo": "loan",
      "empréstimos": "loan",
      "empréstimo": "loan",
      "cdc empréstimo automático": "loan",
      "cdc emprestimo automatico": "loan",
      "previdência": "pension",
      "previdencia": "pension",
      "seguro": "insurance",
      "seguro familiar": "insurance",
      "crédito": "mortgage",
      "credito": "mortgage",
      "crédito imobiliário": "mortgage",
      "credito imobiliario": "mortgage",
    };

    var msg = this.inputVal.current.value.toLowerCase();

    this.setState( (state) => {
      state.msgs = state.msgs.concat([["msg-client", msg]])
    });

    if(msg !== "" && keywords.hasOwnProperty(msg)){
      setTimeout( () => { this.setState( (state) => {
        state.msgs = state.msgs.concat([["msg", answers[keywords[msg]]]])
      });
      this.forceUpdate()
    }, 1000);
    } else if(!keywords.hasOwnProperty(msg)){
      this.setState( (state) => {
        state.msgs = state.msgs.concat([["msg", "Opção não reconhecida. Por favor, tente novamente."]])
      });
    }

    this.forceUpdate()
  }

  render() {
    return(
      <div className="mark">
        <div className="first-map">
          <div className="content">
            <div className="questions">
              <div className="title">Jotinha Resolve - Assistente Virtual</div>
              <img src={jotinha} style={{ width: "120px" }}/>
              <div className="chat" ref={this.msgHistory}>
                <div className="msg">Olá! Seja bem-vindo ao Assistente Virtual do JMC Bank.</div>
                <div className="msg">Aqui você poderá obter informações sobre os serviços disponibilizados por nossa instituição financeira.</div>
                <div className="msg">
                  Serviços disponíveis:<br/>

                    <br/>- CDC Empréstimo Automático
                    <br/>- Previdência
                    <br/>- Seguro Familiar
                    <br/>- Crédito Imobiliário

                </div>
                { this.state.msgs.map((row, i) => {
                  return (<div className={row[0]}  key={i}>{row[1]}</div>)
                }) }
              </div>
            </div>
            <div className="ask-questions">
              <input type="text" ref={this.inputVal} className="ask" placeholder="Dúvidas sobre nossos serviços?" />
              <button className="submit-ask" onClick={this.append}>Perguntar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Assistente;
