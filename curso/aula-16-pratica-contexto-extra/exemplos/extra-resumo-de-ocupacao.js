// =====================================================
// EXTRA: RESUMO DE OCUPAÇÃO NA AGENDA
//   "4 de 80 horários ocupados (5%)"
//
// Um laboratório tem 16 horários na semana: 5 dias x 3 turnos
// + a manhã de sábado. Com 5 laboratórios, são 80 horários.
//
// EXTRA OPCIONAL: use DEPOIS da integração (aula 17). Os nomes
// de arquivo são os da pasta app/.
//
// HTML para colocar no index.html, logo depois da </table>:
//
//   <p id="resumo"></p>
// =====================================================


// -----------------------------------------------------
// PARTE 1 - regras.js
// -----------------------------------------------------

// Conta os horários de UM laboratório na semana. Em vez de escrever 16
// (número mágico), o laço usa a própria regra do sábado: se a regra
// mudar, a conta muda junto.
function horariosDaSemana() {
    let total = 0;
    for (let dia = 1; dia <= DIAS.length; dia++) {
        for (let turno = 1; turno <= TURNOS.size; turno++) {
            if (turnoPermitido(dia, turno)) {
                total = total + 1;
            }
        }
    }
    return total;
}

function resumoDeOcupacao() {
    let total = horariosDaSemana() * laboratorios.length;
    if (total === 0) {
        return "Nenhum laboratório cadastrado.";
    }
    let percentual = reservas.length / total * 100;
    return reservas.length + " de " + total + " horários ocupados (" + percentual.toFixed(0) + "%)";
}


// -----------------------------------------------------
// PARTE 2 - calendario.js
// No fim da função atualizarCalendario(), que roda a cada reserva,
// cancelamento ou desfazer (a atualizarTela() do agenda.js chama ela):
// -----------------------------------------------------
//
//   document.querySelector("#resumo").textContent = resumoDeOcupacao();
