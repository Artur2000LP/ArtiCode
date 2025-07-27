
// function generarCodigosUnicode() {
//   const cont = document.querySelector(".symbol-grid");
//   const frag = document.createDocumentFragment();
//   for (let i = 1000; i <= 9999; i++) {
//     const s = String.fromCharCode(i);
//     const esc = `&amp;#${i};`;
//     const real = `&#${i};`;
//     const div = document.createElement("div");
//     div.className = "symbol-item";
//     div.innerHTML = `<span class="code">${esc}</span><span class="symbol">${s}</span>`;
//     div.onclick = () => abrirModal(real, s);
//     frag.appendChild(div);
//   }
//   cont.appendChild(frag);
// }

// function abrirModal(codigo, simbolo) {
//   const m = document.getElementById("modal");
//   document.getElementById("modalSymbol").textContent = simbolo;
//   document.getElementById("modalCode").value = codigo;
//   m.style.display = "block";
// }

// function copiarCodigo() {
//   const inp = document.getElementById("modalCode");
//   inp.select();
//   document.execCommand("copy");
//   alert("Código copiado: " + inp.value);
// }






// function abrirModal(codigo, simbolo) {
//   const modal = document.getElementById("modal");
//   const wrapped = `<span>${codigo}</span>`;
//   document.getElementById("modalSymbol").textContent = simbolo;
//   document.getElementById("modalCode").value       = wrapped;
//   document.getElementById("modalUsage").textContent = 'Úsalo en HTML dentro de tu código.';
//   modal.style.display = "block";
// }


// function copiarCodigo() {
//   const input = document.getElementById("modalCode");
//   input.select();
//   document.execCommand("copy");
//   alert("¡Copiado!: " + input.value);
// }


// function generarFormatos(num) {
//   const hex4 = num.toString(16).toUpperCase().padStart(4, "0");
//   return [
//     { label: "HTML Entity", value: `&#${num};` },
//     { label: "JS Unicode", value: `\\u${hex4}` },
//     { label: "Unicode Codepoint", value: `U+${hex4}` },
//     { label: "$prefijo", value: `$${num}` },
//     { label: "#prefijo", value: `#${num}` },
//     { label: "$&prefijo", value: `$&${num}` },
//     { label: "*prefijo", value: `*${num}` },
//     { label: "@prefijo", value: `@${num}` }
//   ];
// }


// function generarDesdeInput() {
//   const raw = document.getElementById("busquedaInput").value.trim();
//   let num = null;

//   if (raw.startsWith("&#") && raw.endsWith(";")) {
//     const m = raw.match(/&#(\d+);/);
//     if (m) num = parseInt(m[1], 10);
//   }
//   else if (/^\d+$/.test(raw)) {
//     num = parseInt(raw, 10);
//   }

//   if (num !== null && !isNaN(num)) {
//     const simbolo = String.fromCharCode(num);
//     const opciones = generarFormatos(num);

//     const ul = document.getElementById("searchResults");
//     ul.innerHTML = "";
//     opciones.forEach(opt => {
//       const li = document.createElement("li");
//       li.innerHTML = `
//         <span class="symbol">${simbolo}</span>
//         <span class="code">${opt.value.replace(/</g, "&lt;")}</span>
//         <small>(${opt.label})</small>
//       `;
//       li.onclick = () => {
//         document.getElementById("searchModal").style.display = "none";
//         abrirModal(opt.value, simbolo);
//       };
//       ul.appendChild(li);
//     });

//     document.getElementById("searchModal").style.display = "block";
//   } else {
//     alert("Por favor ingresa un código numérico válido (ej.: &#9789; o 9789).");
//   }
// }

// function configurarModales() {
//   document.getElementById("closeModal").onclick = () => {
//     document.getElementById("modal").style.display = "none";
//   };
//   document.getElementById("closeSearchModal").onclick = () => {
//     document.getElementById("searchModal").style.display = "none";
//   };
//   window.onclick = e => {
//     if (e.target.classList.contains("modal")) {
//       e.target.style.display = "none";
//     }
//   };
// }

// document.addEventListener("DOMContentLoaded", () => {
//   generarCodigosUnicode();
//   configurarModales();
//   document.getElementById("botonBuscar")
//     .addEventListener("click", generarDesdeInput);
// });


function generarCodigosUnicode() {
  const cont = document.querySelector(".symbol-grid");
  const frag = document.createDocumentFragment();
  for (let i = 7000; i <= 10099; i++) {
    const s = String.fromCharCode(i);
    const esc = `&amp;#${i};`;
    const real = `&#${i};`;
    const div = document.createElement("div");
    div.className = "symbol-item";
    div.innerHTML = `<span class="code">${esc}</span><span class="symbol">${s}</span>`;
    div.onclick = () => abrirModal(real, s, "HTML Entity");
    frag.appendChild(div);
  }
  cont.appendChild(frag);
}

function abrirModal(codigo, simbolo, etiqueta) {
  const modal    = document.getElementById("modal");
  const inp      = document.getElementById("modalCode");
  const usagePar = document.getElementById("modalUsage");
  let valorParaCopiar, notaUso;

  switch (etiqueta) {
    case "HTML Entity":
      valorParaCopiar = `<span>${codigo}</span>`;
      notaUso = "Úsalo en HTML";
      break;
    case "JS Unicode":
      valorParaCopiar = codigo.replace(/&amp;#/, "\\u").slice(0, -1);
      notaUso = 'Úsalo en JavaScript (ej.: element.textContent = "' + valorParaCopiar + '")';
      break;
    case "Unicode Codepoint":
      valorParaCopiar = "U+" + parseInt(codigo.match(/\d+/)[0],10)
                                    .toString(16).toUpperCase().padStart(4, "0");
      notaUso = "Punto de código Unicode";
      break;
    default:
      valorParaCopiar = codigo;
      notaUso = `Formato personalizado (${etiqueta})`;
  }

  document.getElementById("modalSymbol").textContent = simbolo;
  inp.value = valorParaCopiar;
  usagePar.textContent = notaUso;
  modal.style.display = "block";
}

function copiarCodigo() {
  const inp = document.getElementById("modalCode");
  inp.select();
  document.execCommand("copy");
  alert("¡Copiado!: " + inp.value);
}

function generarFormatos(num) {
  const hex4 = num.toString(16).toUpperCase().padStart(4, "0");
  return [
    { label: "HTML Entity",       value: `&#${num};`    },
    { label: "JS Unicode",        value: `\\u${hex4}`   },
    { label: "Unicode Codepoint", value: `U+${hex4}`     },
    { label: "$prefijo",          value: `$${num}`       },
    { label: "#prefijo",          value: `#${num}`       },
    { label: "$&prefijo",         value: `$&${num}`      },
    { label: "*prefijo",          value: `*${num}`       },
    { label: "@prefijo",          value: `@${num}`       }
  ];
}

function generarDesdeInput() {
  const raw = document.getElementById("busquedaInput").value.trim();
  let num = null;
  if (raw.startsWith("&#") && raw.endsWith(";")) {
    const m = raw.match(/&#(\d+);/);
    if (m) num = parseInt(m[1], 10);
  } else if (/^\d+$/.test(raw)) {
    num = parseInt(raw, 10);
  }
  if (num === null || isNaN(num)) {
    return alert("Ingresa un código numérico válido (ej.: 9789 o &#9789;).");
  }

  const simbolo = String.fromCharCode(num);
  const opciones = generarFormatos(num);

  const ul = document.getElementById("searchResults");
  ul.innerHTML = "";
  opciones.forEach(opt => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="symbol">${simbolo}</span>
      <span class="code">${opt.value.replace(/</g, "&lt;")}</span>
      <small>(${opt.label})</small>
    `;
    li.onclick = () => {
      document.getElementById("searchModal").style.display = "none";
      abrirModal(opt.value, simbolo, opt.label);
    };
    ul.appendChild(li);
  });
  document.getElementById("searchModal").style.display = "block";
}

function configurarModales() {
  document.getElementById("closeModal").onclick = () => {
    document.getElementById("modal").style.display = "none";
  };
  document.getElementById("closeSearchModal").onclick = () => {
    document.getElementById("searchModal").style.display = "none";
  };
  window.onclick = e => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  generarCodigosUnicode();
  configurarModales();
  document.getElementById("botonBuscar")
          .addEventListener("click", generarDesdeInput);
});
