"use strict";

window.onload = function()
{
    var i;
    var btn_radio = document.getElementById("btn-radio");
    btn_radio.onclick = function()
    {
        var input_radio = document.formulario.input_radio;
        for(i=0; i<input_radio.length; i++)
        {
          if(input_radio[i].checked)
          {
              switch(input_radio[i].value)
              {
                    case "radio-1":
                        var salidaIma = document.getElementById("salidaImagen");
                        salidaIma.innerHTML = '<img src="images/Black2.jpg" alt="Black Goku"width="300" height="200"/>';
                        
                    break;
                    case "radio-2":
                        var salidaIma = document.getElementById("salidaImagen");
                        salidaIma.innerHTML = '<img src="images/Breaking-Bad.jpg" alt="Breaking"width="300" height="200"/>';
                    break;
                    case "radio-3":
                        var salidaIma = document.getElementById("salidaImagen");
                        salidaIma.innerHTML = '<img src="images/barcelona.jpeg" alt="barcelona"width="300" height="200"/>';
                    break; 
                    case "radio-4":
                        var salidaIma = document.getElementById("salidaImagen");
                        salidaIma.innerHTML = '<img src="images/joker.jpg" alt="joker"width="300" height="200"/>';
                    break;
                    default:
                         console.log("Por favor intente de nuevo");
             }
          }
        } 
    }
}



