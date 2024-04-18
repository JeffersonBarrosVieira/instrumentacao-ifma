const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let fator = document.getElementById('fator');
let result = document.getElementById('result');

canvas.width = window.innerWidth * 0.8; // Definir a largura do canvas como 80% da largura da janela
canvas.height = 200; //

// Massas dos blocos (em kg)
let massM = 1; // Massa do bloco M
let massm = 1; // Massa do bloco m

// Velocidades iniciais dos blocos (em m/s)
let velocityM = 0; // Velocidade inicial do bloco M
let velocitym = 0; // Velocidade inicial do bloco m

// Tamanho dos blocos
let widthM = 150; // Largura do bloco M
let heightM = 150; // Altura dos blocos

let widthm = 50; // Largura do bloco m
let heightm = 50; // Altura dos blocos

let positionM = { x: canvas.width - 260, y: canvas.height - heightM }; // Posição inicial do bloco M
let positionm = { x: canvas.width - 100, y: canvas.height - heightm };

// Coordenadas da parede
const wallX = canvas.width - 30; // Posição x da parede
const wallHeight = 100; // Altura da parede
const wallY = canvas.height - wallHeight; // Posição y da parede

let count = 0

// Função para desenhar os blocos
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar bloco M
    ctx.fillStyle = 'blue';
    ctx.fillRect(positionM.x, positionM.y, widthM, heightM);
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText('M', positionM.x + widthM / 2 - 6, positionM.y + heightM / 2 + 5);

    // Desenhar bloco m
    ctx.fillStyle = 'red';
    ctx.fillRect(positionm.x, positionm.y, widthm, heightm);
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText('m', positionm.x + widthm / 2 - 6, positionm.y + heightm / 2 + 5);


    // Desenhar a parede
    ctx.fillStyle = 'gray';
    ctx.fillRect(wallX, wallY, 10, wallHeight);
}

let bloco = false
let parede = false
let dt = 0
// Função para atualizar as posições dos blocos após a colisão
function updatePositions() {
    // Calcular as novas velocidades dos blocos após a colisão elástica
    const vFinalM = ((massM - massm) * velocityM + 2 * massm * velocitym) / (massM + massm);
    const vFinalm = ((massm - massM) * velocitym + 2 * massM * velocityM) / (massM + massm);

    // Atualizar as posições dos blocos com as novas velocidades
    positionM.x += velocityM*dt;
    positionm.x += velocitym*dt;

    // Verificar se ocorreu a colisão entre os blocos
    if (positionM.x + widthM >= positionm.x) {
        // Trocar as velocidades após a colisão
        if(bloco == true){
            velocityM = vFinalM;
            velocitym = vFinalm;
            count += 1
            result.value = count
            bloco = false
        }
    }

    if (positionM.x + widthM < positionm.x) {
        bloco = true
    }

    // Verificar se os blocos colidiram com a parede
    if (positionM.x + widthM >= wallX) {
        velocityM *= -1; // Inverter a direção do bloco M
        count += 1
        result.value = count
    }
    if (positionm.x + widthm >= wallX) {
        velocitym *= -1; // Inverter a direção do bloco m
        result.value = count
        if(parede == true){
            count += 1
            result.value = count
            parede = false
        }
    }

    if (positionm.x + widthm < wallX) {
        parede = true
    }
}

// Função de animação


function animate() {
    drawBlocks();
    updatePositions();
    requestAnimationFrame(animate);
}

drawBlocks();

function play() {
    // massM = 1*fatorvalue;
    result.value = 0
    count = 0

    dt = 1/(300*Math.log(fator.value))
    // reset
    positionM.x = canvas.width - 260; // Posição inicial do bloco M
    positionm.x = canvas.width - 100;

    velocityM = 100
    velocitym = 0

    massM = massm * fator.value

    positionM.y = canvas.height - heightM

}
animate();