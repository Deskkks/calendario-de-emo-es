const mesBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const dias = document.querySelector('#dias')
const divsDia = dias.getElementsByTagName('div')


function colocarDias(mes, ano) {
  document.querySelector('span#mes').innerHTML = mesBr[mes]
  document.querySelector('span#ano').innerHTML = ano

  primeiroDia = new Date(ano, mes, 1).getDay() -1
  let ultimoDia = new Date(ano, mes + 1, 0).getDate()

  console.log(primeiroDia);

  for(i = -primeiroDia, index = 0; i < (42-primeiroDia); i++, index++){
    let dt = new Date(ano, mes, i)
    var diaCalendario = divsDia[index]
    diaCalendario.classList.remove('outroMes')
    diaCalendario.innerHTML = dt.getDate()

    if(i < 1){
      diaCalendario.classList.add('outroMes')
    }
    if(i > ultimoDia){
      diaCalendario.classList.add('outroMes')
    }
  }
}

let agora = new Date()
let mes = agora.getMonth()
let ano = agora.getFullYear()
let hoje = agora.getDate()

colocarDias(mes, ano)

var primeiroDia = new Date(ano, mes, 1).getDay() -1

const botao_ante = document.querySelector('#btn_prev')
const botao_prox = document.querySelector('#btn_prox')

botao_prox.onclick = function(){
  mes++
  if(mes > 11){
    mes = 0
    ano++
  }
  colocarDias(mes,ano)
}

botao_ante.onclick = function(){
  mes--
  if(mes < 0){
    mes = 11
    ano--
  }
  colocarDias(mes, ano)
}


//=========================================


const cores = document.querySelectorAll('.checkmark')
var divHoje = divsDia[hoje + primeiroDia] 

cores.forEach(cor => cor.addEventListener ('click', () => { 

  mudarOpcaidadeSpan(cor)
  mudarCorHoje(cor)
}))

cores.forEach(cor => cor.addEventListener('mouseenter', () => {

  if(cor.style.opacity == '0.5'){
    cor.style.opacity = '0.7'
  }

}))

cores.forEach(cor => cor.addEventListener('mouseout', () => {

  if(cor.style.opacity == '0.7'){
    cor.style.opacity = '0.5'
  }

}))

function mudarOpcaidadeSpan(cor){

  if(cor.style.opacity == '1'){
    cor.style.opacity = '0.5'
  }else {
    cores.forEach(cor => cor.style.opacity = '0.5')
    cor.style.opacity = '1'
  }
  
}

function mudarCorHoje(cor){
  var color = window.getComputedStyle(cor)

  if(cor.style.opacity == '0.5') {
    divHoje.style.backgroundColor = 'white'
    divHoje.style.color = 'black'
  } else {
    
    divHoje.style.backgroundColor = color.backgroundColor
    divHoje.style.opacity = '0.7'

    if (
      divHoje.style.backgroundColor == 'rgb(85, 255, 0)' ||
      divHoje.style.backgroundColor == 'rgb(225, 255, 0)' ||
      divHoje.style.backgroundColor == 'rgb(255, 136, 0)'
    ) {
      divHoje.style.color = 'black'
    }else {
      divHoje.style.color = 'white'
    }
  }
}