const mesBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const dias = document.querySelector('#dias')
const contDias = document.querySelector('div#calendario')
const contano = document.querySelector('div#displayAno')
const contmes = document.querySelector('div#displayMes')
var divsDia = dias.getElementsByTagName('div')
var agora = new Date

const botao_ante = document.querySelector('#btn_prev')
const botao_prox = document.querySelector('#btn_prox')

const btn_mes = document.querySelector('span#mes')
const btn_ano = document.querySelector('span#ano')

const cores = document.querySelectorAll('.checkmark')
var primeiroDia

let display = {}

const disCalendario = {
  mes : agora.getMonth(),
  ano : agora.getFullYear(),
  hoje : agora.getDate(),

  colocar(mes, ano) {
    document.querySelector('span#mes').innerHTML = mesBr[mes]
    document.querySelector('span#ano').innerHTML = ano

    let ultimoDia = new Date(ano, mes + 1, 0).getDate()
    primeiroDia = new Date(ano, mes, 1).getDay() -1
    console.log(ano, mes);

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
  },
  clickProx(){
    disCalendario.mes++
    if(disCalendario.mes > 11){
      disCalendario.mes = 0
      disCalendario.ano++
    }
    display.colocar(disCalendario.mes, disCalendario.ano)
  },
  clickAnte(){
    disCalendario.mes--
    if(disCalendario.mes < 0){
      disCalendario.mes = 11
      disCalendario.ano--
    }
    display.colocar(disCalendario.mes, disCalendario.ano)
  },
  clickMes() {
    contDias.style.display = 'none'
    contmes.style.display = 'grid'
    btn_mes.innerHTML = 'Meses'
    mudarTela(disMes)
    display.colocar()
  },
  clickAno() {
    contDias.style.display = 'none'
    contano.style.display = 'grid'
    btn_ano.innerHTML = 'Anos'
    btn_mes.innerHTML = ''
    mudarTela(disAno)
    display.colocar()
  }
}

const disMes = {
  colocar() {
    var divsMes = contmes.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsMes[i].innerHTML = mesBr[i]
    }
  },
  clickProx(){
    disCalendario.ano++
    btn_ano.innerHTML = disCalendario.ano
  },
  clickAnte(){
    disCalendario.ano--
    btn_ano.innerHTML = disCalendario.ano
  },
  clickMes(){
    contDias.style.display = 'block'
    contmes.style.display = 'none'
    btn_ano.innerHTML = disCalendario.ano
    btn_mes.innerHTML = mesBr[disCalendario.mes]
    mudarTela(disCalendario)
    display.colocar(disCalendario.mes, disCalendario.ano) 
  }
}

const disAno = {
  colocar() {
    console.log(display);
  var divsAno = contano.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickProx(){
    var divsAno = contano.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAnte(){
    anoD -= 24
    var divsAno = contano.getElementsByTagName('div')
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAno(){
    contDias.style.display = 'block'
    contano.style.display = 'none'
    btn_ano.innerHTML = disCalendario.ano
    btn_mes.innerHTML = mesBr[disCalendario.mes]
    mudarTela(disCalendario)
    display.colocar(disCalendario.mes, disCalendario.ano)
  }
}

mudarTela(disCalendario)

display.colocar(disCalendario.mes, disCalendario.ano)
let anoD = disCalendario.ano


function mudarTela(novaTela){
  display = novaTela
}

botao_prox.addEventListener('click', () => {
  display.clickProx()
})

botao_ante.addEventListener('click', () => {
  display.clickAnte()
})

btn_mes.addEventListener('click', () => {
  display.clickMes()
}) 

btn_ano.addEventListener('click', () => {
  display.clickAno()
}) 

const funCor = {
  mudarCorHoje(cor){
    var color = window.getComputedStyle(cor)
    var mesA = agora.getMonth() 
    var divHoje = divsDia[disCalendario.hoje + primeiroDia]
    
  
    if(disCalendario.mes != mesA){
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
  },
  spanClick(cor) {
    if(cor.style.opacity == '1'){
      cor.style.opacity = '0.5'
    } else{
      cores.forEach(cor => cor.style.opacity = '0.5')
      cor.style.opacity = '1'
    }
  },
  spanEnter(cor) {

    if(cor.style.opacity == '0.5'){
      cor.style.opacity = '0.7'
    }
  },
  spanOut(cor) {
    if(cor.style.opacity === '0.7'){
      cor.style.opacity = '0.5'
    }
  }
}

cores.forEach(cor => cor.style.opacity = '0.5')

cores.forEach(cor => cor.addEventListener ('click', () => { 

  funCor.spanClick(cor)
  funCor.mudarCorHoje(cor)
}))

cores.forEach(cor => cor.addEventListener('mouseenter', () => {

  funCor.spanEnter(cor)
}))

cores.forEach(cor => cor.addEventListener('mouseout', () => {

  funCor.spanOut(cor)
}))