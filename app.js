//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo: numero secreto';

//let paragrefo = document.querySelector('p');
//paragrefo.innerHTML = 'escolha um numero de 1 e 10';
let listaDeNumeroSecreto = [];
let limiteNumero = 10;
let numSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'jogo: número secreto');
exibirTextoNaTela('p', 'escolha um número de 1 a 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagenTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p',mensagenTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{ 
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        if(chute > numSecreto){
            let mensagenErro = `${palavraTentativa} : ${tentativas}`;
            exibirTextoNaTela('h1', mensagenErro)
            exibirTextoNaTela('p',  `O número secreto é menor que ${chute}`)
        }
        else{
            let mensagenErro = `${palavraTentativa} : ${tentativas}`;
            exibirTextoNaTela('h1', mensagenErro)
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`)
        }
        tentativas++
        limparCampo()
    }
}

function gerarNumeroAleatorio() {
    let numEscolhido = parseInt(Math.random()*limiteNumero +1);
    let quantidadeDeEmentosNaLista= listaDeNumeroSecreto.length;
    if(quantidadeDeEmentosNaLista == limiteNumero){
        listaDeNumeroSecreto = [];
    }
    if(listaDeNumeroSecreto.includes(numEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumeroSecreto.push(numEscolhido);
        console.log(listaDeNumeroSecreto);
        return numEscolhido; 
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
   exibirMensagemInicial();
   document.getElementById('reiniciar').setAttribute('disabled', true);
}