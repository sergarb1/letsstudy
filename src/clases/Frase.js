// Almacena listado de frases motivadoras y saludos para poder usar de forma estática desde diferentes sitios.

class Frase {

  // lista con frases motivadoras 
  frasesMotivadoras = [
    "Siempre parece imposible hasta que se hace (Nelson Mandela)",
    "La motivación es lo que te pone en marcha, el hábito es lo que hace que sigas (Jim Ryun)",
    "Si no te gusta cómo son las cosas, cámbialas (Jim Rohn)",
    "No hay un sustituto para el trabajo duro (Thomas Edison)",
    "Sin estudiar enferma el alma (Séneca)",
    "Si hiciésemos todas las cosas de las que somos capaces, nos asombraríamos (Thomas Edison)",
    "Cambia tus pensamientos y cambiarás tu mundo (Norman Vincent Peale)",
    "Tus talentos y habilidades irán mejorando con el tiempo, pero para eso has de empezar (Martin Luther King)",
    "Nuestra paciencia conseguirá más cosas que nuestra fuerza (Edmund Burke)",
    'Los libros son peligrosos. Los mejores deberían ser etiquetados con un "Esto podría cambiar tu vida" (Helen Exley)',
    "Si no vas hasta el final ¿por qué empezar? (Joe Namath)",
    "Aprender sin pensar es inútil. Pensar sin aprender, peligroso (Confucio)",
    "Lo maravilloso de aprender algo es que nadie puede arrebatárnoslo (B. B. King)",
    "El hombre bien preparado para la lucha ha conseguido medio triunfo (Miguel de Cervantes)",
    "Es posible recuperarse de una derrota, pero cuesta más perdonarse a uno mismo por no haberlo intentado (George Edward Woodberry)",
    "Eres más que capaz de encontrar el éxito, pero solo ocurrirá si te pones a ello (Vince Lombardi)",
    "La perseverancia puede transformar el fracaso en un logro extraordinario (Matt Biondi)",
    "Sin autodisciplina, el éxito es imposible (Lou Holz)",
    "La energía y la persistencia conquistan todas las cosas (Benjamin Franklin)"
  ];

  saludos =[
"¿Se te ocurre algún saludo?"
  ];

 
  static saludoAleatorio() {
    return saludos[
      Math.floor(Math.random() * saludos.length)
    ];

  }
  
  static fraseMotivadoraAleatoria() {
    return frasesMotivadoras[
      Math.floor(Math.random() * frasesMotivadoras.length)
    ];
  }

  let frase=fraseMotivadoraAleatoria() ;
  let saludo=saludoAleatorio();
  console.log(frase);
  console.log(saludo);

}

//export default Frase