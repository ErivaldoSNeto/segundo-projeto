// Seleção de elementos do DOM
const minutesE1 = document.querySelector("#minutes");
const secondsE1 = document.querySelector("#seconds");
const millisecondsE1 = document.querySelector("#milliseconds");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const resetBtn = document.querySelector("#resetBtn");

// Declaração de variáveis
let interval;          // Guarda o identificador do intervalo para atualização do cronômetro
let minutes = 0;       // Armazena os minutos do cronômetro
let seconds = 0;       // Armazena os segundos do cronômetro
let milliseconds = 0;  // Armazena os milissegundos do cronômetro
let isPaused = false;  // Indica se o cronômetro está pausado

// Adiciona os listeners aos botões
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
    if (interval === undefined) { // Se o cronômetro ainda não começou
        interval = setInterval(() => {  // Inicia o intervalo que atualiza o cronômetro a cada 10ms
            if (!isPaused) {  // Se não estiver pausado
                milliseconds += 10;  // Adiciona 10ms
                
                // Converte os milissegundos em segundos
                if (milliseconds === 1000) {
                    seconds++;
                    milliseconds = 0;
                }

                // Converte os segundos em minutos
                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                }

                // Atualiza a exibição do tempo
                minutesE1.textContent = formatTimer(minutes);
                secondsE1.textContent = formatTimer(seconds);
                millisecondsE1.textContent = formatMilliseconds(milliseconds);
            }
        }, 10);

        // Oculta o botão "Iniciar" e mostra o botão "Pausar"
        startBtn.style.display = "none";
        pauseBtn.style.display = "block";
        resumeBtn.style.display = "none"; // Garante que o botão "Resume" esteja oculto
    }
}

// Pausa o cronômetro
function pauseTimer() {
    isPaused = true;  // Define a flag de pausa
    pauseBtn.style.display = "none";   // Oculta o botão "Pausar"
    resumeBtn.style.display = "block"; // Mostra o botão "Continuar"
}

// Retoma o cronômetro após ser pausado
function resumeTimer() {
    isPaused = false; // Reseta a flag de pausa
    pauseBtn.style.display = "block";  // Mostra o botão "Pausar"
    resumeBtn.style.display = "none";  // Oculta o botão "Continuar"
}

// Reinicia o cronômetro
function resetTimer() {
    clearInterval(interval);  // Limpa o intervalo atual
    interval = undefined;     // Reseta a variável de intervalo
    isPaused = false;         // Reseta a flag de pausa
    minutes = 0;              // Reseta os minutos
    seconds = 0;              // Reseta os segundos
    milliseconds = 0;         // Reseta os milissegundos
    
    // Reseta a exibição do tempo
    minutesE1.textContent = "00";
    secondsE1.textContent = "00";
    millisecondsE1.textContent = "000";

    // Ajusta a visibilidade dos botões
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "none";
}

// Formata os minutos e segundos para ter sempre dois dígitos
function formatTimer(time) {
    return time < 10 ? `0${time}` : time;
}

// Formata os milissegundos para ter sempre três dígitos
function formatMilliseconds(time) {
    return time < 100 ? `${time}`.padStart(3, "0") : time;
}
