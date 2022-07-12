(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `tempo total ${min}min : ${sec}s, total a pagar R$ ${(min * 0.2).toFixed(2)}`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        ;
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        ;
        function adicionar(veiculo, guardar) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML =
                ` 
                <td>${veiculo.nome} </td>
                <td>${veiculo.placa} </td>
                <td>${veiculo.entrada} </td>   
                <td> <button class = 'delete' data-placa = "${veiculo.placa}">X </button> </td>       
            `;
            (_a = row.querySelector("[data-placa]")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_b = $("[ data-patio]")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (guardar)
                salvar([...ler(), veiculo]);
        }
        ;
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`o veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        ;
        function render() {
            $("[data-patio]").innerHTML = ' ';
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        ;
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $('[data-cadastrarVeiculo]')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('[data-nomeVeiculo]')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('[data-placaVeiculo]')) === null || _b === void 0 ? void 0 : _b.value;
        console.log(`${nome} ${placa}`);
        if (!nome || !placa) {
            alert('os campos nome e placa são obrigatorios');
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
