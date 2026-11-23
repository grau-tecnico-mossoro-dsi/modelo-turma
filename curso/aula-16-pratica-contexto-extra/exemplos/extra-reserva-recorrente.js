// =====================================================
// EXTRA: RESERVA RECORRENTE (a mesma reserva em vários dias)
// Usa os campos do formulário "Nova reserva" que já existe
// (professor, curso -> turma, laboratório, turno)
// e caixas de marcar para os dias.
//
// EXTRA OPCIONAL: use DEPOIS da integração (aula 17). Os nomes
// de arquivo são os da pasta app/.
//
// HTML para colocar no index.html, depois do <p id="msg-reserva">:
//
//   <h3>Reserva recorrente</h3>
//   <p>Preencha o formulário acima (o campo Data é ignorado) e marque os dias:</p>
//   <p>
//       <input type="checkbox" id="rec-dia-1"> <label for="rec-dia-1">Segunda</label>
//       <input type="checkbox" id="rec-dia-2"> <label for="rec-dia-2">Terça</label>
//       <input type="checkbox" id="rec-dia-3"> <label for="rec-dia-3">Quarta</label>
//       <input type="checkbox" id="rec-dia-4"> <label for="rec-dia-4">Quinta</label>
//       <input type="checkbox" id="rec-dia-5"> <label for="rec-dia-5">Sexta</label>
//       <input type="checkbox" id="rec-dia-6"> <label for="rec-dia-6">Sábado</label>
//   </p>
//   <button type="button" id="btn-recorrente">Reservar nos dias marcados</button>
//   <pre id="resultado-recorrente"></pre>
//
// Tudo abaixo vai no nova-reserva.js (mostrarMensagem está no tela.js e
// atualizarTela, no agenda.js).
// =====================================================

// Lê o formulário e confere se tudo foi escolhido. Devolve o pedido
// (sem o dia), ou null se algo estiver errado (a mensagem já aparece na tela).
function pedidoDoFormulario() {
    let professor = buscarPorId(professores, Number(document.querySelector("#res-professor").value));
    let turma = buscarPorId(turmas, Number(document.querySelector("#res-turma").value));
    let laboratorio = buscarLaboratorio(Number(document.querySelector("#res-laboratorio").value));

    if (professor === null) {
        mostrarMensagem("#msg-reserva", "Escolha o professor.");
        return null;
    }
    if (turma === null) {
        mostrarMensagem("#msg-reserva", "Escolha uma turma. Se a lista está vazia, cadastre uma turma para este curso.");
        return null;
    }
    if (laboratorio === null) {
        mostrarMensagem("#msg-reserva", "Escolha o laboratório.");
        return null;
    }
    return {
        id: 0,
        professor: professor.id,
        turma: turma.id,
        laboratorio: laboratorio.id,
        dia: 0,
        turno: Number(document.querySelector("#res-turno").value)
    };
}

// Tenta reservar UM dia. Devolve a linha do resultado ("Segunda: reservado (nº 5)").
function reservarNoDia(base, dia) {
    // Um objeto NOVO para cada dia. Se usássemos o mesmo objeto,
    // todas as reservas mudariam juntas (seriam a mesma reserva).
    let pedido = {
        id: 0,
        professor: base.professor,
        turma: base.turma,
        laboratorio: base.laboratorio,
        dia: dia,
        turno: base.turno
    };
    let turma = buscarPorId(turmas, pedido.turma);
    let laboratorio = buscarLaboratorio(pedido.laboratorio);

    let motivo = motivoDaRecusa(turma, laboratorio, pedido.dia, pedido.turno);   // sábado e capacidade
    if (motivo !== "") {
        return DIAS[dia - 1] + ": não reservado. " + motivo;
    }
    if (horarioLivre(pedido.laboratorio, pedido.dia, pedido.turno) === false) {
        return DIAS[dia - 1] + ": ocupado, não reservado";
    }
    adicionarReserva(pedido);
    return DIAS[dia - 1] + ": reservado (nº " + pedido.id + ")";
}

function reservarRecorrente() {
    let base = pedidoDoFormulario();
    if (base === null) {
        return;
    }
    let resultado = "";
    for (let dia = 1; dia <= DIAS.length; dia++) {
        if (document.querySelector("#rec-dia-" + dia).checked) {
            resultado = resultado + reservarNoDia(base, dia) + "\n";
        }
    }
    if (resultado === "") {
        mostrarMensagem("#msg-reserva", "Marque pelo menos um dia.");
        return;
    }
    salvarDados();
    mostrarMensagem("#msg-reserva", "Reserva recorrente concluída. Confira o resultado de cada dia.");
    document.querySelector("#resultado-recorrente").textContent = resultado;
    atualizarTela();
}

// No fim do nova-reserva.js, junto com as outras ligações:
//   document.querySelector("#btn-recorrente").addEventListener("click", reservarRecorrente);
