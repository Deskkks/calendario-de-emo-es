const mesBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const cores = document.querySelectorAll('.checkmark')

let display = {}
var primeiroDia
var agora = new Date()

var globais = {
  mes : agora.getMonth(),
  ano : agora.getFullYear(),
  hoje : agora.getDate(),
  dias : document.querySelector('#dias'),
  contDias : document.querySelector('div#calendario'),
  contCalen : document.querySelector('div#contCalendario'),
  contano : document.querySelector('div#displayAno'),
  contmes : document.querySelector('div#displayMes'),
  divsDia : dias.getElementsByTagName('div'),
  botao_ante : document.querySelector('#btn_prev'),
  botao_prox : document.querySelector('#btn_prox'),
  btn_mes : document.querySelector('span#mes'),
  btn_ano : document.querySelector('span#ano'),
  btn_menu : document.querySelector('div#btn_calen')
}

const disCalendario = {
  colocar(mes, ano) {
    funCor.mudarCorHoje()

    document.querySelector('span#mes').innerHTML = mesBr[mes]
    document.querySelector('span#ano').innerHTML = ano

    let ultimoDia = new Date(ano, mes + 1, 0).getDate()
    primeiroDia = new Date(ano, mes, 1).getDay() -1

    for(i = -primeiroDia, index = 0; i < (42-primeiroDia); i++, index++){
      let dt = new Date(ano, mes, i)
      var diaCalendario = globais.divsDia[index]
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
    globais.mes++
    if(globais.mes > 11){
      globais.mes = 0
      globais.ano++
    }
    display.colocar(globais.mes, globais.ano)
  },
  clickAnte(){
    globais.mes--
    if(globais.mes < 0){
      globais.mes = 11
      globais.ano--
    }
    display.colocar(globais.mes, globais.ano)
  },
  clickMes() {
    globais.contDias.style.display = 'none'
    globais.contmes.style.display = 'grid'
    globais.btn_mes.innerHTML = 'Meses'
    mudarTela(disMes)
    display.colocar()
  },
  clickAno() {
    globais.contDias.style.display = 'none'
    globais.contano.style.display = 'grid'
    globais.btn_ano.innerHTML = 'Anos'
    globais.btn_mes.innerHTML = ''
    mudarTela(disAno)
    display.colocar()
  }
}

const disMes = {
  colocar() {
    for(i = 0; i < 12; i++){
      divsMes[i].innerHTML = mesBr[i]
    }
  },
  clickProx(){
    globais.ano++
    globais.btn_ano.innerHTML = globais.ano
  },
  clickAnte(){
    globais.ano--
    globais.btn_ano.innerHTML = globais.ano
  },
  clickMes(){
    globais.contDias.style.display = 'block'
    globais.contmes.style.display = 'none'
    globais.btn_ano.innerHTML = globais.ano
    globais.btn_mes.innerHTML = mesBr[globais.mes]
    mudarTela(disCalendario)
    display.colocar(globais.mes, globais.ano) 
  },
}

const divsMes = globais.contmes.querySelectorAll('div')
const divsAno = globais.contano.querySelectorAll('div')


const disAno = {
  colocar() {
    anoD = globais.ano
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickProx(){
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAnte(){
    anoD -= 24
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAno(){
    globais.contDias.style.display = 'block'
    globais.contano.style.display = 'none'
    globais.btn_ano.innerHTML = globais.ano
    globais.btn_mes.innerHTML = mesBr[globais.mes]
    mudarTela(disCalendario)
    display.colocar(globais.mes, globais.ano)
  }
}

function mudarTela(novaTela){
  display = novaTela
}

const funCor = {
  mudarCorHoje(cor){
    var mesA = agora.getMonth()
    var anoA = agora.getFullYear()
    primeiroDia = new Date(anoA, mesA, 1).getDay() -1
    var divHoje = globais.divsDia[globais.hoje + primeiroDia]
    console.log(divHoje);
    console.log(cor);
  
    if(globais.mes != mesA || globais.ano != anoA || cor == undefined){
      divHoje.style.backgroundColor = 'white'
      divHoje.style.color = 'black'
      divHoje.style.opacity = '1'
    }else{
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
  },
  async mudarCorBD() {
    const data = await pegarApi()

    console.log(data);
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

divsMes.forEach(Dmes => Dmes.addEventListener('click', () => {
  globais.mes = mesBr.indexOf(Dmes.textContent)
  display.clickMes()
}))

divsAno.forEach(Dano => Dano.addEventListener('click', () => {
  globais.ano = Number(Dano.textContent)
  display.clickAno()
  display.clickMes()
}))

globais.botao_prox.addEventListener('click', () => {
  display.clickProx()
})

globais.botao_ante.addEventListener('click', () => {
  display.clickAnte()
})

globais.btn_mes.addEventListener('click', () => {
  if(display.clickMes){
    display.clickMes()
  }
}) 

globais.btn_ano.addEventListener('click', () => {
  if(display.clickAno){
    display.clickAno()
  }
})

globais.btn_menu.addEventListener('click', mudarDisplayCalendario)

function mudarDisplayCalendario() {
  var display = window.getComputedStyle(globais.contCalen)
  if(display.display == 'block'){
    globais.contCalen.style.display = 'none'
  }else {
    globais.contCalen.style.display = 'block'
  }
}

let anoD

mudarTela(disCalendario)

display.colocar(globais.mes, globais.ano)

async function pegarApi(){
  const response = (await fetch('http://localhost:8081/api/classificacao'))
  const data = await response.json()

  return data
}
funCor.mudarCorBD()
