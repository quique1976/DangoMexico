"use strict";
function codificaHtml(texto) {
  return texto ? texto.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;') 
      .replace(/>/g, '&gt;') 
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      : "";
}