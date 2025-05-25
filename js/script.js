let vidaGorila = 100;
const humanos = Array.from({ length: 100 }, (_, i) => ({ id: i, vivo: true }));

function desenharHumanos() {
  const div = document.getElementById('humanos');
  div.innerHTML = humanos
    .filter(h => h.vivo)
    .map(() => '<img class="humano" src="assets/humano.png">')
    .join('');
}

function atualizarStatus() {
  document.getElementById('vidaGorila').textContent = vidaGorila;
  document.getElementById('humanosRestantes').textContent = humanos.filter(h => h.vivo).length;
}

function atacar() {
  const quantos = Math.floor(Math.random() * 5) + 1;
  let mortos = 0;
  for (const h of humanos) {
    if (h.vivo && mortos < quantos) {
      h.vivo = false;
      mortos++;
    }
  }
  registrarLog(`🦍 O gorila atacou e derrotou ${mortos} humanos!`);
  desenharHumanos();
  atualizarStatus();
}

document.getElementById('btnAtacar').addEventListener('click', atacar);

function registrarLog(msg) {
  const log = document.getElementById('log');
  log.innerHTML += `<p>${new Date().toLocaleTimeString()} — ${msg}</p>`;
}

desenharHumanos();
atualizarStatus();

function turnoHumanos() {
  const vivos = humanos.filter(h => h.vivo).length;
  const dano = Math.floor(Math.random() * vivos * 0.1);
  vidaGorila = Math.max(vidaGorila - dano, 0);
  registrarLog(`🧑 Humanos causaram ${dano} de dano!`);
  atualizarStatus();
  verificarFim();
}

setInterval(turnoHumanos, 3000);
