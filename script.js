// script.js - usado por hick.html e fitts.html

document.addEventListener('DOMContentLoaded', () => {
  // HICK
  const hickForm = document.getElementById('hickForm');
  if (hickForm) {
    const result = document.getElementById('hick_result');
    const clearBtn = document.getElementById('hick_clear');

    hickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = Number(document.getElementById('hick_n').value);
      const k = Number(document.getElementById('hick_k').value);

      if (!Number.isFinite(n) || n < 1) {
        result.innerHTML = `<strong>Erro:</strong> n deve ser um número inteiro ≥ 1.`;
        return;
      }
      if (!Number.isFinite(k) || k < 0) {
        result.innerHTML = `<strong>Erro:</strong> k deve ser um número ≥ 0.`;
        return;
      }

      // cálculo passo a passo
      const inside = n + 1;
      const log2 = Math.log2(inside);
      const T_ms = k * log2;

      result.innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Entrada:</strong> n = ${n}, k = ${k} ms/bit</p>
        <p><strong>Cálculo passo-a-passo:</strong></p>
        <ol>
          <li>Calcular (n + 1) = ${n} + 1 = ${inside}.</li>
          <li>Calcular log₂(${inside}) = ${log2.toFixed(6)} (bits).</li>
          <li>Multiplicar: T = k × log₂(n+1) = ${k} × ${log2.toFixed(6)} = ${T_ms.toFixed(3)} ms.</li>
        </ol>
        <p><strong>Tempo estimado:</strong> ${T_ms.toFixed(3)} ms (~${(T_ms/1000).toFixed(4)} s)</p>
        <p style="font-size:0.9em;color: #555;">Observação: k depende de experimentos; 150 ms/bit é um valor de exemplo.</p>
      `;
    });

    clearBtn.addEventListener('click', () => {
      document.getElementById('hick_n').value = 4;
      document.getElementById('hick_k').value = 150;
      result.innerHTML = '';
    });
  }

  // FITTS
  const fittsForm = document.getElementById('fittsForm');
  if (fittsForm) {
    const result = document.getElementById('fitts_result');
    const clearBtn = document.getElementById('fitts_clear');

    fittsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const D = Number(document.getElementById('fitts_D').value);
      const W = Number(document.getElementById('fitts_W').value);
      const a = Number(document.getElementById('fitts_a').value) || 0;
      const b = Number(document.getElementById('fitts_b').value) || 0;

      if (!Number.isFinite(D) || D < 0) {
        result.innerHTML = `<strong>Erro:</strong> D deve ser um número ≥ 0.`;
        return;
      }
      if (!Number.isFinite(W) || W <= 0) {
        result.innerHTML = `<strong>Erro:</strong> W deve ser um número > 0.`;
        return;
      }
      if (!Number.isFinite(a) || !Number.isFinite(b)) {
        result.innerHTML = `<strong>Erro:</strong> a e b devem ser números.`;
        return;
      }

      const ratio = D / W;
      const inside = ratio + 1;
      const ID = Math.log2(inside);
      const MT = a + b * ID;

      result.innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Entrada:</strong> D = ${D}, W = ${W}, a = ${a} ms, b = ${b} ms/bit</p>
        <p><strong>Cálculo passo-a-passo:</strong></p>
        <ol>
          <li>Calcular D/W = ${D} / ${W} = ${ratio.toFixed(6)}.</li>
          <li>Calcular (D/W + 1) = ${inside.toFixed(6)}.</li>
          <li>Calcular ID = log₂(${inside.toFixed(6)}) = ${ID.toFixed(6)} (bits).</li>
          <li>Calcular MT = a + b × ID = ${a} + ${b} × ${ID.toFixed(6)} = ${MT.toFixed(3)} ms.</li>
        </ol>
        <p><strong>Tempo estimado de movimento:</strong> ${MT.toFixed(3)} ms (~${(MT/1000).toFixed(4)} s)</p>
        <p style="font-size:0.9em;color:#555;">Observação: escolha a e b segundo estudos/medições no seu contexto; os valores padrões são apenas exemplo.</p>
      `;
    });

    clearBtn.addEventListener('click', () => {
      document.getElementById('fitts_D').value = 200;
      document.getElementById('fitts_W').value = 50;
      document.getElementById('fitts_a').value = 0;
      document.getElementById('fitts_b').value = 100;
      result.innerHTML = '';
    });
  }
});
