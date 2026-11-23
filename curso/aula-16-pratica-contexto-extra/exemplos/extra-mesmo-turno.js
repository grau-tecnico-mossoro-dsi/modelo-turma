// =====================================================
// EXTRA: A MESMA TURMA (ou o MESMO PROFESSOR) NÃO PODE ESTAR
// EM DOIS LABORATÓRIOS NO MESMO TURNO
//
// O conflito do sistema olha só o LABORATÓRIO ("o Lab 2 já está
// ocupado na quarta à noite?"). Este extra olha também a TURMA
// e o PROFESSOR: ninguém está em dois lugares ao mesmo tempo.
//
// Escolha UMA das duas regras (turma OU professor) e faça as
// partes dela. Quem terminar cedo faz a outra.
//
// EXTRA OPCIONAL: use DEPOIS da integração (aula 17). Os nomes
// de arquivo são os da pasta app/.
// =====================================================


// -----------------------------------------------------
// PARTE 1 - regras.js (seção REGRAS DA RESERVA)
// -----------------------------------------------------

// A turma já tem reserva neste dia e turno (em qualquer laboratório)?
function turmaOcupadaNoHorario(idTurma, dia, turno) {
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        if (reserva.turma === idTurma && reserva.dia === dia && reserva.turno === turno) {
            return true;
        }
    }
    return false;
}

// O professor já tem reserva neste dia e turno (em qualquer laboratório)?
function professorOcupadoNoHorario(idProfessor, dia, turno) {
    for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        if (reserva.professor === idProfessor && reserva.dia === dia && reserva.turno === turno) {
            return true;
        }
    }
    return false;
}


// -----------------------------------------------------
// PARTE 2A - regras.js: regra da TURMA dentro do motivoDaRecusa
// O motivoDaRecusa já recebe a turma: basta um if a mais no fim,
// antes do return "".
// -----------------------------------------------------
//
//   if (turmaOcupadaNoHorario(turma.id, dia, turno)) {
//       return "A turma " + turma.nome + " já tem reserva em outro laboratório nesse horário.";
//   }


// -----------------------------------------------------
// PARTE 2B - nova-reserva.js: regra do PROFESSOR dentro do reservar()
// O motivoDaRecusa NÃO recebe o professor. Por isso a conferência
// fica no reservar(), logo depois do if (motivo !== "") { ... }
// e ANTES do if (horarioLivre(...)).
// -----------------------------------------------------
//
//   if (professorOcupadoNoHorario(professor.id, dia, turno)) {
//       mostrarMensagem("#msg-reserva", "Prof. " + professor.nome + " já tem reserva em outro laboratório nesse horário.");
//       return;
//   }


// -----------------------------------------------------
// PARTE 3 - regras.js: a lista de espera também precisa respeitar a regra
// Sem isto, ao cancelar uma reserva, o primeiro da fila pode assumir
// um horário em que a turma (ou o professor) já está em outro laboratório.
// Troque o if de dentro do laço do atenderListaDeEspera por:
// -----------------------------------------------------
//
//   if (horarioLivre(pedido.laboratorio, pedido.dia, pedido.turno) &&
//           turmaOcupadaNoHorario(pedido.turma, pedido.dia, pedido.turno) === false) {
//
// (para o professor, a mesma ideia com professorOcupadoNoHorario(pedido.professor, ...))
