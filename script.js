/**
 * ============================================
 * AGRO FORTE, FUTURO SUSTENTÁVEL
 * Concurso Agrinho 2026
 * script.js - Lógica JavaScript Principal
 * ============================================
 */

// ============================================
// DADOS DO QUIZ
// ============================================
const quizDados = [
  {
    pergunta: "Qual tecnologia permite aplicar defensivos agrícolas apenas onde há pragas, reduzindo o uso de produtos químicos?",
    opcoes: [
      "GPS agrícola",
      "Drones com sensores",
      "Trator comum",
      "Irrigação por aspersão"
    ],
    correta: 1,
    explicacao: "Drones equipados com sensores identificam áreas com pragas e permitem aplicação localizada, reduzindo o uso de defensivos em até 90%."
  },
  {
    pergunta: "Qual prática agrícola elimina o revolvimento do solo, preservando sua estrutura e umidade?",
    opcoes: [
      "Aração profunda",
      "Queima de palha",
      "Plantio direto",
      "Monocultura"
    ],
    correta: 2,
    explicacao: "O plantio direto preserva a cobertura do solo, reduzindo a erosão em até 90% e mantendo os nutrientes naturais."
  },
  {
    pergunta: "Quanto da água doce do planeta é utilizada na agricultura?",
    opcoes: [
      "Cerca de 30%",
      "Cerca de 50%",
      "Cerca de 70%",
      "Cerca de 90%"
    ],
    correta: 2,
    explicacao: "A agricultura consome cerca de 70% da água doce disponível no planeta, tornando a economia hídrica fundamental."
  },
  {
    pergunta: "O que é agricultura de precisão?",
    opcoes: [
      "Plantar apenas um tipo de cultura",
      "Usar tecnologia para aplicar insumos somente onde são necessários",
      "Aumentar a área plantada",
      "Usar mais fertilizantes químicos"
    ],
    correta: 1,
    explicacao: "Agricultura de precisão utiliza dados e tecnologia para otimizar o uso de insumos, reduzindo custos e impactos ambientais."
  },
  {
    pergunta: "Qual fonte de energia renovável pode ser produzida a partir de resíduos agrícolas?",
    opcoes: [
      "Energia nuclear",
      "Carvão mineral",
      "Biogás",
      "Petróleo"
    ],
    correta: 2,
    explicacao: "O biogás é produzido pela decomposição de resíduos orgânicos em biodigestores, gerando energia limpa para a propriedade rural."
  },
  {
    pergunta: "Qual é o principal objetivo da rotação de culturas?",
    opcoes: [
      "Aumentar o uso de pesticidas",
      "Preservar a saúde do solo e reduzir pragas",
      "Diminuir a produtividade",
      "Facilitar a mecanização"
    ],
    correta: 1,
    explicacao: "A rotação de culturas melhora a fertilidade do solo, reduz pragas e doenças, e aumenta a produtividade a longo prazo."
  },
  {
    pergunta: "O que são APPs (Áreas de Preservação Permanente)?",
    opcoes: [
      "Áreas para construção de estradas",
      "Áreas protegidas por lei para preservar recursos naturais",
      "Áreas de plantio intensivo",
      "Áreas para criação de gado"
    ],
    correta: 1,
    explicacao: "APPs são áreas protegidas por lei, como margens de rios e topos de morros, essenciais para a preservação da biodiversidade e dos recursos hídricos."
  },
  {
    pergunta: "Qual tecnologia permite monitorar a umidade do solo em tempo real?",
    opcoes: [
      "Trator GPS",
      "Sensores inteligentes",
      "Enxada manual",
      "Semente transgênica"
    ],
    correta: 1,
    explicacao: "Sensores inteligentes medem umidade, nutrientes e temperatura do solo, permitindo decisões precisas sobre irrigação e adubação."
  },
  {
    pergunta: "Qual porcentagem dos alimentos produzidos no mundo é desperdiçada?",
    opcoes: [
      "Cerca de 10%",
      "Cerca de 20%",
      "Cerca de 30%",
      "Cerca de 50%"
    ],
    correta: 2,
    explicacao: "Cerca de 30% de todos os alimentos produzidos são desperdiçados. Tecnologias de pós-colheita e logística inteligente ajudam a reduzir essa perda."
  },
  {
    pergunta: "O que é agricultura regenerativa?",
    opcoes: [
      "Agricultura que usa mais químicos",
      "Agricultura que recupera ecossistemas degradados",
      "Agricultura que planta apenas uma cultura",
      "Agricultura sem uso de máquinas"
    ],
    correta: 1,
    explicacao: "A agricultura regenerativa vai além da sustentabilidade: ela recupera solos degradados, aumenta a biodiversidade e captura carbono da atmosfera."
  }
];

// ============================================
// ESTADO DO QUIZ
// ============================================
let quizEstado = {
  perguntaAtual: 0,
  pontuacao: 0,
  respondido: false
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Inicializa todos os módulos
  initMenuMobile();
  initScrollReveal();
  initContadores();
  initSimulador();
  initQuiz();
  initDashboard();
  initAcessibilidade();
  initNavbarScroll();
});

// ============================================
// MENU MOBILE
// ============================================
function initMenuMobile() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('menu-principal');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    const estaAberto = nav.classList.toggle('ativo');
    toggle.setAttribute('aria-expanded', estaAberto);

    // Atualiza ícone
    const icon = toggle.querySelector('i, svg');
    if (icon) {
      icon.setAttribute('data-lucide', estaAberto ? 'x' : 'menu');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  });

  // Fecha menu ao clicar em link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('ativo');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('ativo');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ============================================
// SCROLL REVEAL (Animação ao rolar)
// ============================================
function initScrollReveal() {
  const elementos = document.querySelectorAll(
    '.card-desafio, .card-tech, .sust-item, .timeline-item, .dashboard-card, .estatistica'
  );

  elementos.forEach(el => el.classList.add('revelar'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  elementos.forEach(el => observer.observe(el));
}

// ============================================
// CONTADORES ANIMADOS
// ============================================
function initContadores() {
  const contadores = document.querySelectorAll('[data-contador]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animarContador(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  contadores.forEach(c => observer.observe(c));
}

function animarContador(elemento) {
  const alvo = parseInt(elemento.getAttribute('data-contador'));
  const duracao = 2000;
  const inicio = performance.now();

  function atualizar(tempoAtual) {
    const decorrido = tempoAtual - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const easeOut = 1 - Math.pow(1 - progresso, 3);
    const atual = Math.floor(easeOut * alvo);

    elemento.textContent = atual.toLocaleString('pt-BR');

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    } else {
      elemento.textContent = alvo.toLocaleString('pt-BR');
    }
  }

  requestAnimationFrame(atualizar);
}

// ============================================
// SIMULADOR INTELIGENTE
// ============================================
function initSimulador() {
  const btnCalcular = document.getElementById('btn-calcular');
  if (!btnCalcular) return;

  btnCalcular.addEventListener('click', calcularSimulacao);

  // Permite calcular com Enter
  ['area', 'agua', 'producao', 'cultura'].forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcularSimulacao();
      });
    }
  });
}

function calcularSimulacao() {
  const area = parseFloat(document.getElementById('area').value);
  const agua = parseFloat(document.getElementById('agua').value);
  const producao = parseFloat(document.getElementById('producao').value);
  const cultura = document.getElementById('cultura').value;
  const resultadoDiv = document.getElementById('simulador-resultado');

  // Limpa erros anteriores
  limparErros();

  // Validações
  let valido = true;

  if (isNaN(area) || area <= 0) {
    mostrarErro('area', 'Informe uma área válida maior que zero.');
    valido = false;
  }

  if (isNaN(agua) || agua <= 0) {
    mostrarErro('agua', 'Informe um consumo de água válido maior que zero.');
    valido = false;
  }

  if (isNaN(producao) || producao <= 0) {
    mostrarErro('producao', 'Informe uma produção válida maior que zero.');
    valido = false;
  }

  if (!cultura) {
    mostrarErro('cultura', 'Selecione o tipo de cultura.');
    valido = false;
  }

  if (!valido) return;

  // Cálculos
  const economiaAgua = agua * 0.40; // 40% economia com irrigação de precisão
  const economiaInsumos = area * 150; // R$ 150/ha economia com agricultura de precisão
  const reducaoDesperdicio = producao * 0.15; // 15% menos desperdício
  const aumentoProducao = producao * 0.20; // 20% aumento com tecnologia
  const capturaCarbono = area * 2.5; // 2.5 toneladas CO2/ha

  const economiaTotal = economiaAgua * 0.003 + economiaInsumos; // Água em R$ + insumos

  // Renderiza resultado
  resultadoDiv.innerHTML = `
    <h3 class="simulador-subtitulo">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
      Resultado da Simulação
    </h3>

    <div class="resultado-item">
      <div class="resultado-icone" style="color: #1565a8;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.74 5.88-5.74 5.88-5.74-5.88z"></path><path d="M12 22a7 7 0 0 0 7-7c0-3.87-7-13-7-13S5 11.13 5 15a7 7 0 0 0 7 7z"></path></svg>
      </div>
      <div class="resultado-info">
        <h4>Economia de Água</h4>
        <p>Com irrigação de precisão</p>
      </div>
      <div class="resultado-valor" style="color: #1565a8;">${formatarNumero(economiaAgua)} L/dia</div>
    </div>

    <div class="resultado-item">
      <div class="resultado-icone" style="color: #8b5e34;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      </div>
      <div class="resultado-info">
        <h4>Economia de Insumos</h4>
        <p>Com agricultura de precisão</p>
      </div>
      <div class="resultado-valor" style="color: #8b5e34;">R$ ${formatarNumero(economiaInsumos)}</div>
    </div>

    <div class="resultado-item alerta">
      <div class="resultado-icone" style="color: #f57c00;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
      </div>
      <div class="resultado-info">
        <h4>Redução de Desperdício</h4>
        <p>Com tecnologia pós-colheita</p>
      </div>
      <div class="resultado-valor" style="color: #f57c00;">${formatarNumero(reducaoDesperdicio)} t</div>
    </div>

    <div class="resultado-item sucesso">
      <div class="resultado-icone" style="color: #2e7d32;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
      </div>
      <div class="resultado-info">
        <h4>Aumento de Produção</h4>
        <p>Com tecnologia e boas práticas</p>
      </div>
      <div class="resultado-valor" style="color: #2e7d32;">+${formatarNumero(aumentoProducao)} t</div>
    </div>

    <div class="resultado-item">
      <div class="resultado-icone" style="color: #00695c;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"></path><path d="M12 2v20"></path><path d="M12 2L2 12"></path><path d="M12 2l10 10"></path></svg>
      </div>
      <div class="resultado-info">
        <h4>Captura de Carbono</h4>
        <p>CO₂ retido no solo/ano</p>
      </div>
      <div class="resultado-valor" style="color: #00695c;">${formatarNumero(capturaCarbono)} t</div>
    </div>

    <div class="resultado-total">
      <h4>Economia Total Estimada</h4>
      <p>R$ ${formatarNumero(economiaTotal)} / ano</p>
    </div>
  `;

  // Re-inicializa ícones
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Scroll suave para o resultado
  resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function mostrarErro(campoId, mensagem) {
  const erroEl = document.getElementById(campoId + '-erro');
  if (erroEl) {
    erroEl.textContent = mensagem;
    erroEl.style.display = 'block';
  }
  const campo = document.getElementById(campoId);
  if (campo) {
    campo.style.borderColor = 'var(--erro)';
    campo.setAttribute('aria-invalid', 'true');
  }
}

function limparErros() {
  document.querySelectorAll('.form-erro').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
  document.querySelectorAll('input, select').forEach(el => {
    el.style.borderColor = '';
    el.removeAttribute('aria-invalid');
  });
}

function formatarNumero(num) {
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

// ============================================
// QUIZ EDUCATIVO
// ============================================
function initQuiz() {
  const btnIniciar = document.getElementById('btn-iniciar-quiz');
  if (!btnIniciar) return;

  btnIniciar.addEventListener('click', iniciarQuiz);
}

function iniciarQuiz() {
  quizEstado = {
    perguntaAtual: 0,
    pontuacao: 0,
    respondido: false
  };
  renderizarPergunta();
}

function renderizarPergunta() {
  const container = document.getElementById('quiz-container');
  const pergunta = quizDados[quizEstado.perguntaAtual];
  const progresso = ((quizEstado.perguntaAtual) / quizDados.length) * 100;

  const letras = ['A', 'B', 'C', 'D'];

  let opcoesHTML = '';
  pergunta.opcoes.forEach((opcao, index) => {
    opcoesHTML += `
      <button class="quiz-opcao" data-index="${index}" onclick="selecionarOpcao(${index})">
        <span class="letra">${letras[index]}</span>
        <span class="quiz-opcao-texto">${opcao}</span>
      </button>
    `;
  });

  container.innerHTML = `
    <div class="quiz-pergunta">
      <div class="quiz-cabecalho">
        <span class="quiz-numero">Pergunta ${quizEstado.perguntaAtual + 1} de ${quizDados.length}</span>
        <div class="quiz-progresso" role="progressbar" aria-valuenow="${quizEstado.perguntaAtual + 1}" aria-valuemin="1" aria-valuemax="${quizDados.length}">
          <div class="quiz-progresso-barra" style="width: ${progresso}%"></div>
        </div>
      </div>
      <h3 class="quiz-enunciado">${pergunta.pergunta}</h3>
      <div class="quiz-opcoes" role="radiogroup" aria-label="Opções de resposta">
        ${opcoesHTML}
      </div>
      <div id="quiz-feedback" class="quiz-feedback" style="display: none;" role="status" aria-live="polite"></div>
    </div>
  `;

  // Re-inicializa ícones
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function selecionarOpcao(index) {
  if (quizEstado.respondido) return;
  quizEstado.respondido = true;

  const pergunta = quizDados[quizEstado.perguntaAtual];
  const opcoes = document.querySelectorAll('.quiz-opcao');
  const feedback = document.getElementById('quiz-feedback');

  opcoes.forEach((opcao, i) => {
    opcao.disabled = true;
    if (i === pergunta.correta) {
      opcao.classList.add('correta');
    } else if (i === index && i !== pergunta.correta) {
      opcao.classList.add('errada');
    }
  });

  if (index === pergunta.correta) {
    quizEstado.pontuacao++;
    feedback.className = 'quiz-feedback acerto';
    feedback.innerHTML = `<strong>Correto!</strong> ${pergunta.explicacao}`;
  } else {
    feedback.className = 'quiz-feedback erro';
    feedback.innerHTML = `<strong>Incorreto.</strong> ${pergunta.explicacao}`;
  }
  feedback.style.display = 'block';

  // Botão próxima pergunta
  setTimeout(() => {
    const btnProxima = document.createElement('button');
    btnProxima.className = 'btn btn-primario';
    btnProxima.style.marginTop = '1rem';
    btnProxima.innerHTML = quizEstado.perguntaAtual < quizDados.length - 1
      ? 'Próxima Pergunta <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
      : 'Ver Resultado <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
    btnProxima.onclick = proximaPergunta;
    feedback.appendChild(btnProxima);
    btnProxima.focus();
  }, 100);
}

function proximaPergunta() {
  quizEstado.perguntaAtual++;
  quizEstado.respondido = false;

  if (quizEstado.perguntaAtual < quizDados.length) {
    renderizarPergunta();
  } else {
    mostrarResultadoQuiz();
  }
}

function mostrarResultadoQuiz() {
  const container = document.getElementById('quiz-container');
  const porcentagem = Math.round((quizEstado.pontuacao / quizDados.length) * 100);

  let classeIcone = 'bronze';
  let mensagem = 'Continue estudando! A sustentabilidade é um aprendizado constante.';

  if (porcentagem >= 80) {
    classeIcone = 'ouro';
    mensagem = 'Excelente! Você é um verdadeiro defensor da agricultura sustentável!';
  } else if (porcentagem >= 50) {
    classeIcone = 'prata';
    mensagem = 'Muito bom! Você já conhece bastante sobre sustentabilidade no campo.';
  }

  container.innerHTML = `
    <div class="quiz-resultado">
      <div class="quiz-resultado-icone ${classeIcone}">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
      </div>
      <div class="quiz-resultado-pontuacao">${quizEstado.pontuacao}/${quizDados.length}</div>
      <p class="quiz-resultado-texto">${mensagem}</p>
      <p style="color: var(--cinza-400); font-size: 0.875rem; margin-bottom: 1.5rem;">
        Você acertou ${porcentagem}% das perguntas.
      </p>
      <button class="btn btn-primario" onclick="iniciarQuiz()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        Refazer Quiz
      </button>
    </div>
  `;
}

// ============================================
// DASHBOARD COM CHART.JS
// ============================================
function initDashboard() {
  // Gráfico de Economia de Água
  const ctxAgua = document.getElementById('grafico-agua');
  if (ctxAgua) {
    new Chart(ctxAgua, {
      type: 'bar',
      data: {
        labels: ['2015', '2017', '2019', '2021', '2023', '2025'],
        datasets: [{
          label: 'Consumo tradicional (m³/ha)',
          data: [8500, 8200, 7800, 7200, 6500, 5800],
          backgroundColor: 'rgba(200, 200, 200, 0.6)',
          borderColor: 'rgba(150, 150, 150, 1)',
          borderWidth: 1,
          borderRadius: 6
        }, {
          label: 'Com irrigação de precisão (m³/ha)',
          data: [8500, 7000, 5800, 4800, 4000, 3500],
          backgroundColor: 'rgba(26, 92, 58, 0.8)',
          borderColor: 'rgba(26, 92, 58, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: "'Open Sans', sans-serif", size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y.toLocaleString('pt-BR') + ' m³/ha';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: "'Open Sans', sans-serif", size: 11 },
              callback: function(value) { return value.toLocaleString('pt-BR'); }
            }
          },
          x: {
            ticks: { font: { family: "'Open Sans', sans-serif", size: 11 } }
          }
        }
      }
    });
  }

  // Gráfico de Redução de Emissões
  const ctxEmissoes = document.getElementById('grafico-emissoes');
  if (ctxEmissoes) {
    new Chart(ctxEmissoes, {
      type: 'line',
      data: {
        labels: ['2015', '2017', '2019', '2021', '2023', '2025'],
        datasets: [{
          label: 'Emissões CO₂ (t/ha)',
          data: [3.2, 2.9, 2.5, 2.1, 1.7, 1.3],
          backgroundColor: 'rgba(21, 101, 168, 0.15)',
          borderColor: 'rgba(21, 101, 168, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(21, 101, 168, 1)',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: "'Open Sans', sans-serif", size: 11 } }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: "'Open Sans', sans-serif", size: 11 },
              callback: function(value) { return value + ' t'; }
            }
          },
          x: {
            ticks: { font: { family: "'Open Sans', sans-serif", size: 11 } }
          }
        }
      }
    });
  }

  // Gráfico de Crescimento da Produção Sustentável
  const ctxProducao = document.getElementById('grafico-producao');
  if (ctxProducao) {
    new Chart(ctxProducao, {
      type: 'bar',
      data: {
        labels: ['2015', '2017', '2019', '2021', '2023', '2025'],
        datasets: [{
          label: 'Área com práticas sustentáveis (milhões de ha)',
          data: [12, 18, 28, 42, 58, 75],
          backgroundColor: [
            'rgba(26, 92, 58, 0.4)',
            'rgba(26, 92, 58, 0.5)',
            'rgba(26, 92, 58, 0.6)',
            'rgba(26, 92, 58, 0.7)',
            'rgba(26, 92, 58, 0.8)',
            'rgba(26, 92, 58, 0.9)'
          ],
          borderColor: 'rgba(26, 92, 58, 1)',
          borderWidth: 1,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: "'Open Sans', sans-serif", size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.parsed.y + ' milhões de hectares';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: "'Open Sans', sans-serif", size: 11 },
              callback: function(value) { return value + 'M ha'; }
            }
          },
          x: {
            ticks: { font: { family: "'Open Sans', sans-serif", size: 11 } }
          }
        }
      }
    });
  }
}

// ============================================
// ACESSIBILIDADE
// ============================================
function initAcessibilidade() {
  // Aumentar fonte
  const btnAumentar = document.getElementById('btn-aumentar-fonte');
  const btnDiminuir = document.getElementById('btn-diminuir-fonte');
  const btnContraste = document.getElementById('btn-alto-contraste');
  const btnEscuro = document.getElementById('btn-modo-escuro');
  const btnVoz = document.getElementById('btn-leitura-voz');
  const btnPararVoz = document.getElementById('btn-parar-voz');

  let tamanhoFonte = 100; // percentual base

  if (btnAumentar) {
    btnAumentar.addEventListener('click', () => {
      if (tamanhoFonte < 150) {
        tamanhoFonte += 10;
        document.documentElement.style.fontSize = tamanhoFonte + '%';
      }
    });
  }

  if (btnDiminuir) {
    btnDiminuir.addEventListener('click', () => {
      if (tamanhoFonte > 80) {
        tamanhoFonte -= 10;
        document.documentElement.style.fontSize = tamanhoFonte + '%';
      }
    });
  }

  if (btnContraste) {
    btnContraste.addEventListener('click', () => {
      document.body.classList.toggle('alto-contraste');
      document.body.classList.remove('modo-escuro');
    });
  }

  if (btnEscuro) {
    btnEscuro.addEventListener('click', () => {
      document.body.classList.toggle('modo-escuro');
      document.body.classList.remove('alto-contraste');
    });
  }

  if (btnVoz) {
    btnVoz.addEventListener('click', () => {
      lerPaginaEmVozAlta();
    });
  }

  if (btnPararVoz) {
    btnPararVoz.addEventListener('click', () => {
      pararLeituraVoz();
    });
  }
}

function lerPaginaEmVozAlta() {
  if ('speechSynthesis' in window) {
    // Pega todo o texto relevante da página
    const secoes = document.querySelectorAll('h1, h2, h3, h4, p');
    let texto = '';
    secoes.forEach(el => {
      if (el.offsetParent !== null) { // apenas elementos visíveis
        texto += el.textContent + '. ';
      }
    });

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Seu navegador não suporta leitura em voz alta.');
  }
}

function pararLeituraVoz() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// ============================================
// NAVBAR SCROLL
// ============================================
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ultimoScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollAtual = window.pageYOffset;

    if (scrollAtual > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '';
    }

    ultimoScroll = scrollAtual;
  });
}

// ============================================
// UTILITÁRIOS
// ============================================

// Debounce para eventos
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle para eventos
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Exporta funções globais necessárias para os eventos inline
window.selecionarOpcao = selecionarOpcao;
window.proximaPergunta = proximaPergunta;
window.iniciarQuiz = iniciarQuiz;
