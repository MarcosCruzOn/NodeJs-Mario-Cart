const player1 = {
    NAME: 'Mario',
    VELOCIDADE: 3,
    MANOBRALIDADE: 3,
    PODER:4,
    PONTOS:0
}

const player2 = {
    NAME: 'Luigi',
    VELOCIDADE: 3,
    MANOBRALIDADE: 3,
    PODER:4,
    PONTOS:0
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result 

    switch (true) {
        case random > 0.33:
            result = "RETA"
            break;
        case random > 0.66:
            result = "CURVA";
            break;  
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function logRollResult(personaName, block, diceResult, attribute) {
    console.log(`o jogador ${personaName} 🎲 jogou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

function declareWinner(persona1, persona2) {
    console.log(`\nResultado Final:`);
    console.log(`${persona1.NAME} - Pontos: ${persona1.PONTOS}`);
    console.log(`${persona2.NAME} - Pontos: ${persona2.PONTOS}`);

    if (persona1.PONTOS > persona2.PONTOS) {
        console.log(`${persona1.NAME} é o grande vencedor! 🏆`);
    } else if (persona2.PONTOS > persona1.PONTOS) {
        console.log(`${persona2.NAME} é o grande vencedor! 🏆`);
    }
}

async function PlayeRacEngine(persona1, persona2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`\nRodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        
        //rolar dados
        let diceResult1 =  rollDice();
        let diceResult2 =  rollDice();

        //teste de habilidade
        let totalTesteSkill1 = 0
        let totalTesteSkill2 = 0

        if (block === "RETA") {
            totalTesteSkill1 = persona1.VELOCIDADE + diceResult1;
            totalTesteSkill2 = persona2.VELOCIDADE + diceResult2;

            await logRollResult(
                persona1.NAME, 
                'VELOCIDADE', 
                diceResult1, 
                persona1.VELOCIDADE
            );

            await logRollResult(
                persona2.NAME, 
                'VELOCIDADE', 
                diceResult2, 
                persona2.VELOCIDADE
            );
            
        }

        if (block === "CURVA") {
            totalTesteSkill1 = persona1.MANOBRALIDADE + diceResult1;
            totalTesteSkill2 = persona2.MANOBRALIDADE + diceResult2;

             await logRollResult(
                persona1.NAME, 
                'MANOBRALIDADE', 
                diceResult1, 
                persona1.MANOBRALIDADE
            );

            await logRollResult(
                persona2.NAME, 
                'MANOBRALIDADE', 
                diceResult2, 
                persona2.MANOBRALIDADE
            );
            
        }

        if (block === "CONFRONTO") {
            let powerResult1 = persona1.PODER + diceResult1;
            let powerResult2 = persona2.PODER + diceResult2;

            console.log(`${persona1.NAME} confrontou com ${persona2.NAME} 🥊`);

             await logRollResult(
                persona1.NAME, 
                'PODER', 
                diceResult1, 
                persona1.PODER
            );

            await logRollResult(
                persona2.NAME, 
                'PODER', 
                diceResult2, 
                persona2.PODER
            );

            if(powerResult1 > powerResult2 && persona2.PONTOS > 0) {
                persona2.PONTOS--
                console.log(`${persona1.NAME} venceu o confronto e reduziu os pontos de ${persona2.NAME} 🐢`);
            }
            if(powerResult2 > powerResult1 && persona1.PONTOS > 0) {
                persona1.PONTOS--
                console.log(`${persona2.NAME} venceu o confronto e reduziu os pontos de ${persona1.NAME} 🐢`);
            }

            if(powerResult1 === powerResult2) {
                console.log("Empate no confronto! Nenhum ponto foi alterado.");
            }

            
        }
            
        //verificar vencedor
        if (totalTesteSkill1 > totalTesteSkill2) {
            console.log(`${persona1.NAME} venceu a rodada!`);
            persona1.PONTOS += 1;
        }   else if (totalTesteSkill2 > totalTesteSkill1) {
            console.log(`${persona2.NAME} venceu a rodada!`);
            persona2.PONTOS += 1;
        } else {
            console.log("Empate na rodada!");
        }
            

            
            
    }

       
}

    
    


(async function main() {
    console.log(`Bem-vindo ao jogo, ${player1.NAME}! e ${player2.NAME}!`);

    await PlayeRacEngine(player1, player2);
    await declareWinner(player1, player2);
})();