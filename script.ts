interface Veiculo{
    nome: string;
    placa:string;
    entrada: Date | string;
}





(function (){
    const $ =(query: string): HTMLInputElement | null => document.querySelector(query);

    function calcTempo(mil: number){
        const min = Math.floor(mil/60000);
        const sec = Math.floor((mil%60000)/1000)
         
        return `tempo total ${min}min : ${sec}s, total a pagar R$ ${(min * 0.2).toFixed(2)}`; 
    }


    function patio(){
        
        function ler(): Veiculo[]{
            return localStorage.patio ? JSON.parse(localStorage.patio): [];

        };

        function salvar(veiculos:Veiculo[]){
            localStorage.setItem('patio', JSON.stringify(veiculos));

        };
        
        function adicionar(veiculo:Veiculo, guardar?:boolean){
            const row = document.createElement('tr');

            row.innerHTML=
             ` 
                <td>${veiculo.nome} </td>
                <td>${veiculo.placa} </td>
                <td>${veiculo.entrada} </td>   
                <td> <button class = 'delete' data-placa = "${veiculo.placa}">X </button> </td>       
            `;

            row.querySelector("[data-placa]")?.addEventListener('click', function(){
                remover(this.dataset.placa)
            })

            $("[ data-patio]")?.appendChild(row)

            if(guardar) salvar([...ler(), veiculo]);
            
        };

        function remover(placa:string){
            const {entrada, nome}= ler().find(veiculo => veiculo.placa === placa)

            const tempo = calcTempo( new Date().getTime() - new Date( entrada).getTime());

            if(
                !confirm(`o veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)
            )return;
            salvar(ler().filter((veiculo)=> veiculo.placa !== placa));
            render()

        };

        

        function render(){
            $("[data-patio]")!.innerHTML = ' ';
            const patio = ler();
            if(patio.length){
                patio.forEach((veiculo)=> adicionar(veiculo));

            }

        };

        return{ ler, adicionar, remover, salvar, render};
    }
    patio().render();


    $('[data-cadastrarVeiculo]')?.addEventListener('click', () =>{
        const nome = $('[data-nomeVeiculo]')?.value;
        const placa = $('[data-placaVeiculo]')?.value;
        console.log(`${nome} ${placa}`)
        if(!nome || !placa){
            alert('os campos nome e placa são obrigatorios')
            return;
        }

        patio().adicionar({nome, placa, entrada: new Date().toISOString()}, true)
    });
})()