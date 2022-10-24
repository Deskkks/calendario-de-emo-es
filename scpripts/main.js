const mesBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const dias = document.querySelector('#dias')
const contDias = document.querySelector('div#calendario')
const contano = document.querySelector('div#displayAno')
const contmes = document.querySelector('div#displayMes')

const divsDia = dias.getElementsByTagName('div')
const divsMes = contmes.getElementsByTagName('div')
const divsAno = contano.getElementsByTagName('div') 

const botao_ante = document.querySelector('#btn_prev')
const botao_prox = document.querySelector('#btn_prox')

const btn_mes = document.querySelector('span#mes')
const btn_ano = document.querySelector('span#ano')

const cores = document.querySelectorAll('.checkmark')

let agora = new Date()
let mes = agora.getMonth()
let ano = agora.getFullYear()
let hoje = agora.getDate()
var primeiroDia = new Date(ano, mes, 1).getDay() -1
var divHoje = divsDia[hoje + primeiroDia]
const mesA = agora.getMonth()

window.addEventListener('DOMContentLoaded', () => {
  colocarDias(mes, ano)
})

function colocarDias(mes, ano) {
  document.querySelector('span#mes').innerHTML = mesBr[mes]
  document.querySelector('span#ano').innerHTML = ano

  primeiroDia = new Date(ano, mes, 1).getDay() -1
  let ultimoDia = new Date(ano, mes + 1, 0).getDate()

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

function colocarMes() {
  for(i = 0; i < 12; i++){
    divsMes[i].innerHTML = mesBr[i]
  }
}

function colocarAno() {
  for(i = 0; i < 12; i++){
    let anoD = ano
    divsAno[i].innerHTML = anoD
    anoD++
  }
}

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

btn_mes.onclick = function() {

  if(contDias.style.display == 'none'){
    contDias.style.display = 'block'
    contmes.style.display = 'none'
    btn_ano.innerHTML = ano
    btn_mes.innerHTML = mesBr[mes]
  } else {
    contDias.style.display = 'none'
    contmes.style.display = 'grid'
    btn_ano.innerHTML = ''
    btn_mes.innerHTML = 'Meses'
    colocarMes()
  }

}

btn_ano.onclick = function() {

  if(contDias.style.display == 'none'){
    contDias.style.display = 'block'
    contano.style.display = 'none'
    btn_ano.innerHTML = ano
    btn_mes.innerHTML = mesBr[mes]
  } else {
    contDias.style.display = 'none'
    contano.style.display = 'grid'
    btn_ano.innerHTML = 'Anos'
    btn_mes.innerHTML = ''
    colocarAno()
  }
  
}

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

  if(mes != mesA){
    divHoje.style.backgroundColor = 'white'
      divHoje.style.color = 'black'
      divHoje.style.opacity = '1'
    }else{
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
}