const mesBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const dias = document.querySelector('#dias')

function colocarDias(mes, ano) {
  document.querySelector('span#mes').innerHTML = mesBr[mes]
  document.querySelector('span#ano').innerHTML = ano

  let primeiroDia = new Date(ano, mes, 1).getDay() -1
  let ultimoDia = new Date(ano, mes + 1, 0).getDate()

  console.log(primeiroDia);

  for(i = -primeiroDia, index = 0; i < (42-primeiroDia); i++, index++){
    let dt = new Date(ano, mes, i)
    let diaCalendario = dias.getElementsByTagName('div')[index]
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

colocarDias(mes, ano)

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