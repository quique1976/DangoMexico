
"use strict";

function Evento() {
  this.oyentes = new Array(); 
}
Evento.prototype.observa = function(oyente) {  
  this.oyentes.push(oyente); 
};
Evento.prototype.dispara = function() { 
  var oyentes = this.oyentes;
  for (var i = 0, longitud = oyentes.length; i < longitud; i++) {
    var oyente = oyentes[i];
   
    oyente.apply(null, arguments); 
  }
};