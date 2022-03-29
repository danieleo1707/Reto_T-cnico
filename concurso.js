"use strict";

const IDBRequest= indexedDB.open("BasePreguntas",1);
const IDBRequest2= indexedDB.open("BaseRespuestas",1);
const IDBRequest3= indexedDB.open("BaseRespuestasCorrectas",1);


// IDBRequest.addEventListener("upgradeneeded",()=>{
// 	const db = IDBRequest.result;
// 	db.createObjectStore("preguntas",{
// 		autoIncrement: true
// 	});
// })

const crearTabla = (Tabla, IDB)=>{

IDB.addEventListener("upgradeneeded",()=>{
	const db = IDB.result;
	db.createObjectStore(Tabla,{
		autoIncrement: true
	});
})
};

crearTabla("Ciencia",IDBRequest);
crearTabla("Literatura",IDBRequest);
crearTabla("Matematicas",IDBRequest);
crearTabla("Entretenimiento",IDBRequest);
crearTabla("Geografia",IDBRequest);

crearTabla("Ciencia",IDBRequest2);
crearTabla("Literatura",IDBRequest2);
crearTabla("Matematicas",IDBRequest2);
crearTabla("Entretenimiento",IDBRequest2);
crearTabla("Geografia",IDBRequest2);

crearTabla("Ciencia",IDBRequest3);
crearTabla("Literatura",IDBRequest3);
crearTabla("Matematicas",IDBRequest3);
crearTabla("Entretenimiento",IDBRequest3);
crearTabla("Geografia",IDBRequest3);


IDBRequest.addEventListener("success",()=>{
	console.log("Todo Funciona correctame");
})

IDBRequest.addEventListener("error",()=>{
	console.log("Error Creando la base")
})

const getIDBData =(mode,tipoTabla,IDB)=>{
    
    const db = IDB.result;

	const IDBtransaction=db.transaction(tipoTabla,mode);
	const objectStore=IDBtransaction.objectStore(tipoTabla);
	return [objectStore,IDBtransaction];
}

const addObjetos= (objeto,tipoTabla,IDB)=>{

	const conexion=getIDBData("readwrite",tipoTabla,IDB);

	conexion[0].add(objeto);
	conexion[1].addEventListener("complete",()=>{
		console.log("Objeto agregado correctamente");
	})
}




const leerObjetos =(tipoTabla,IDB1,key,posicionesRespuestas,IDB2,IDB3, contador)=>{

	let dibujaPregunta="";

	const nameTabla=["Ciencia", "Entretenimiento", "Geografia", "Literatura", "Matematicas"]
	key= Math.round(Math.random()*5);
	const key2=Math.round(Math.random()*5);
	let dibujaRespuestaA="";
	let dibujaRespuestaB="";
	let dibujaRespuestaC="";
	let dibujaRespuestaD="";
	let n=0,m=0,p=0,a=0;
	const conexion1= getIDBData("readonly",nameTabla[key],IDB1);
	const conexion2= getIDBData("readonly",nameTabla[key],IDB2);
	const conexion3= getIDBData("readonly",nameTabla[key],IDB3);
	var request1= conexion1[0].get(key2);
	// const cursor = conexion[0].openCursor();
	request1.onsuccess=function(e){
		dibujaPregunta=e.target.result.pregunta;
		const preguntaTabla=document.querySelector(".contenedor");
		setTimeout(()=>{
			preguntaTabla.innerHTML=`${dibujaPregunta}<br><br>`;
		},2000);

	}

	const preguntaTabla=document.querySelector(".contenedor");
	if(key2==1){
		p=0;
		m=4;
	}
	if(key2==2){
		p=4;
		m=8;
	}if(key2==3){
		p=8;
		m=12;
	}if(key2==4){
		p=12;
		m=16;
	}
	if(key2==5){
		p=16;
		m=20;
	}
	for(let n=p;n<m;n++){
		if(n==p) var requestA= conexion2[0].get(posicionesRespuestas[n]);
		if(n==p+1) var requestB= conexion2[0].get(posicionesRespuestas[n]);
		if(n==p+2) var requestC= conexion2[0].get(posicionesRespuestas[n]);
		if(n==p+3) var requestD= conexion2[0].get(posicionesRespuestas[n]);
	}
		requestA.onsuccess=function(e){
		dibujaRespuestaA=e.target.result.respuesta;
		setTimeout(()=>{
			preguntaTabla.innerHTML+=`<button class="botonA">${dibujaRespuestaA}</button><br><br>`;


		},2000);

		}
		requestB.onsuccess=function(e){
		dibujaRespuestaB=e.target.result.respuesta;
		setTimeout(()=>{
			preguntaTabla.innerHTML+=`<button class="botonB">${dibujaRespuestaB}</button><br><br>`;
		},2000);

		}

		requestC.onsuccess=function(e){
		dibujaRespuestaC=e.target.result.respuesta;
		setTimeout(()=>{
			preguntaTabla.innerHTML+=`<button class="botonC">${dibujaRespuestaC}</button><br><br>`;
		},2000);
		}

		requestD.onsuccess=function(e){
		dibujaRespuestaD=e.target.result.respuesta;
		setTimeout(()=>{
			preguntaTabla.innerHTML+=`<button class="botonD">${dibujaRespuestaD}</button><br><br>`;
		},2000);
		}
		
		var requestResA = conexion3[0].get(key2);
		
		
		// const botonResC=document.querySelector(".botonC");
		// const botonResD=document.querySelector(".botonD");
		console.log(contador);
		contador=contador+1;
		if(contador<=5){
		requestResA.onsuccess=function(e){
		const dibujaRespuestaCorrecta=e.target.result.respuesta;
		//console.log(key,key2);
		setTimeout(()=>{
		const botonResA=document.querySelector(".botonA");
		botonResA.addEventListener("click",()=>{

					let dibujarRespuestaA=botonResA.textContent;
					console.log(dibujaRespuestaC,dibujaRespuestaCorrecta)

					if(dibujaRespuestaCorrecta==dibujaRespuestaA) {
						botonResA.style.background="green";
							const puntosContainer=document.querySelector(".contenedor");
							puntosContainer.innerHTML+=`<div class="contador"></div>`;
							const puntos=document.querySelector(".contador");
							puntos.innerHTML+=`Puntaje: ${contador*10} pts`;


						botonResA.style.background="green";
						setTimeout(()=>{
							leerObjetos(nameTabla[key2],IDBRequest,key,posicionesRespuestas,IDBRequest2,IDBRequest3, contador);

						},1500);

						

					}
					else {
						botonResA.style.background="red";
						setTimeout(()=>{
						
						const final=document.querySelector(".contenedor");
						final.innerHTML=`	<div class="contenedor">
											<h1 class="mensaje-aleatorio">¡Perdiste!</h1>	
											</div>`;
						const mensajeFinal=document.querySelector(".mensaje-aleatorio");					
						mensajeFinal.style.color="red";	
					},1000)
					
					}
		});
	},3000)

		setTimeout(()=>{
		const botonResB=document.querySelector(".botonB");
		botonResB.addEventListener("click",()=>{

				let dibujarRespuestaB=botonResB.textContent;
				console.log(dibujaRespuestaC,dibujaRespuestaCorrecta)

				if(dibujaRespuestaCorrecta==dibujaRespuestaB) {
					botonResB.style.background="green";
							const puntosContainer=document.querySelector(".contenedor");
							puntosContainer.innerHTML+=`<div class="contador"></div>`;
							const puntos=document.querySelector(".contador");
							puntos.innerHTML+=`Puntaje: ${contador*10} pts`;
					if(contador>=5){
						const final=document.querySelector(".contenedor");
						final.innerHTML=`	<div class="contenedor">
											<h1 class="mensaje-aleatorio">¡Ganaste!</h1>	
											</div>`;
						const mensajeFinal=document.querySelector(".mensaje-aleatorio");					
						mensajeFinal.style.color="green";	

					}else{
							setTimeout(()=>{
							leerObjetos(nameTabla[key2],IDBRequest,key,posicionesRespuestas,IDBRequest2,IDBRequest3,contador);

						},1500);
					}

				}
				else {
					botonResB.style.background="red";
					setTimeout(()=>{
						
						const final=document.querySelector(".contenedor");
						final.innerHTML=`	<div class="contenedor">
											<h1 class="mensaje-aleatorio">¡Perdiste!</h1>	
											</div>`;
						const mensajeFinal=document.querySelector(".mensaje-aleatorio");					
						mensajeFinal.style.color="red";	
					},1000)
				}
		});

		},3000)

		setTimeout(()=>{
		const botonResC=document.querySelector(".botonC");
		botonResC.addEventListener("click",()=>{

					let dibujarRespuestaC=botonResC.textContent;
					console.log(dibujaRespuestaC,dibujaRespuestaCorrecta)
					if(dibujaRespuestaCorrecta==dibujaRespuestaC) {
							botonResC.style.background="green";
							const puntosContainer=document.querySelector(".contenedor");
							puntosContainer.innerHTML+=`<div class="contador"></div>`;
							const puntos=document.querySelector(".contador");
							puntos.innerHTML+=`Puntaje: ${contador*10} pts`;
						

						botonResC.style.background="green";
						setTimeout(()=>{
							leerObjetos(nameTabla[key2],IDBRequest,key,posicionesRespuestas,IDBRequest2,IDBRequest3,contador);
							const puntos=document.querySelector(".contador");
							puntos.innerHTML=3;
						},1500);
						



					}
					else {
						botonResC.style.background="red";
						setTimeout(()=>{
						
						const final=document.querySelector(".contenedor");
						final.innerHTML=`	<div class="contenedor">
											<h1 class="mensaje-aleatorio">¡Perdiste!</h1>	
											</div>`;
						const mensajeFinal=document.querySelector(".mensaje-aleatorio");					
						mensajeFinal.style.color="red";	
					},1000)
					}
	
		});
	},3000)

		setTimeout(()=>{
		const botonResD=document.querySelector(".botonD");
		botonResD.addEventListener("click",()=>{

					let dibujarRespuestaD=botonResD.textContent;
					console.log(dibujaRespuestaD,dibujaRespuestaCorrecta)

					if(dibujaRespuestaCorrecta==dibujaRespuestaD) {
						botonResD.style.background="green";
						
							const puntosContainer=document.querySelector(".contenedor");
							puntosContainer.innerHTML+=`<div class="contador"></div>`;
							const puntos=document.querySelector(".contador");
							puntos.innerHTML+=`Puntaje: ${contador*10} pts`;

						
						setTimeout(()=>{
							leerObjetos(nameTabla[key2],IDBRequest,key,posicionesRespuestas,IDBRequest2,IDBRequest3,contador);
						},1500);

						

					}
					else {
						botonResD.style.background="red";
						setTimeout(()=>{
						
						const final=document.querySelector(".contenedor");
						final.innerHTML=`	<div class="contenedor">
											<h1 class="mensaje-aleatorio">¡Perdiste!</h1>	
											</div>`;
						const mensajeFinal=document.querySelector(".mensaje-aleatorio");					
						mensajeFinal.style.color="red";	
					},1000)
					}

		});
	},3000)
		
	}

	}else{
						const final=document.querySelector(".contenedor");
						final.innerHTML=`	<div class="contenedor">
											<h1 class="mensaje-aleatorio">¡Ganaste!</h1>	
											</div>`;
						const mensajeFinal=document.querySelector(".mensaje-aleatorio");					
						mensajeFinal.style.color="green";
						return true	
	}


		






	






	
		
		//console.log(e.target.result.pregunta)
			// conexion[0].openCursor().onsuccess=function(e){
		 //  var cursor = e.target.result;
  	// 	if (cursor) {
  	// 		for (let k = 0; k < 5; k++) {
  				
 		// 		arrayRespuestas[k]=cursor.value;
   //  		//console.log(cursor.value)
   //  			//cursor.continue();
 		//  }
	// }
	//console.log(yo);
	//console.log(arrayRespuestas);
	// return arrayRespuestas;
	


	// cursor.addEventListener("success",()=>{
	// 	if(cursor.result){
	// 		arrayRespuestas.push(cursor.result.value);
	// 		//console.log(arrayRespuestas);
	// 		cursor.result.continue();
	// 	}else console.log("Todos los datos fueron leidos")

	// })
}

const modificarObjetos= (key,objeto)=>{

	const conexion=getIDBData("readwrite");
	conexion[0].put(objeto,key);
	conexion[1].addEventListener("complete",()=>{
		console.log("Objeto modificado correctamente");
	})
}

const eliminarObjetos= (key)=>{

	const conexion=getIDBData("readwrite");

	conexion[0].delete(key);
	conexion[1].addEventListener("complete",()=>{
		console.log("Objeto eliminado correctamente");
	})
}

///////////////////////////////////////////////////////////////////Cargar Info Base de Datos/////////////////////////////////////////////////////////

const texto= document.querySelector(".input");
const boton= document.querySelector(".boton");

const cuestiones={
	pregunta1: "¿Cual es el simbolo Quimico del Azufre?",
	pregunta2: "¿Qué es la fotosintesis?",
	pregunta3: "¿Cuanto vale la gravedad en la tierra aproximadamente?",
	pregunta4: "¿Que produce las olas en el oceano?",
	pregunta5: "¿Que tipo de animal es la ballena?",
	pregunta6: "¿Con que Pelicula ganó Di Caprio el Oscar a mejor Actor?",
	pregunta7: "¿Cual es la selección de Fútbol con más mundiales ganados?",
	pregunta8: "¿Pelicula de Disney ambientada en Colombia?",
	pregunta9: "¿Qué premio se le otorga a los mejores actores de telenovelas colombianas?",
	pregunta10: "¿Quién es el protagonista de 'El rey León'?",
	pregunta11: "¿Dónde está el mar muerto?",
	pregunta12: "¿Cuántos continentes hay en el mundo?",
	pregunta13: "¿Cuál es el desierto más grande?",
	pregunta14: "¿Cuál es el estado más grande de Estados Unidos?",
	pregunta15: "¿Cuál es el continente más poblado de la tierra?",
	pregunta16: "¿Quién es el autor de iliada y la odisea?",
	pregunta17: "¿Que escritor colombiano habla sobre flores amarillas?",
	pregunta18: "¿Cómo se llama el famoso payaso asesino del escritor Stephen King?",
	pregunta19: "¿Como se llama la saga de libros sobre un niño que es mago?",
	pregunta20: "¿Quién es el autor de la obre 'Rayuela'?",
	pregunta21: "¿Logaritmo conocido como neperiano?",
	pregunta22: "¿Cual es el primer número primo?",
	pregunta23: "¿Como se llama el resultado de la multiplicación?",
	pregunta24: "¿Cuál es el resultado de dividir por 0?",
	pregunta25: "¿Cuanto es el factorial de 0?"
};

const respuestasCiencias={
    respuesta1: "As",
    respuesta2: "S",
    respuesta3: "Au",
    respuesta4: "Zn",
    respuesta5: "Proceso de tomar fotos",
    respuesta6: "Proceso de respirar",
    respuesta7: "Proceso de generar energía a través del sol",
    respuesta8: "Proceso de relajación",
    respuesta9: "9.8",
    respuesta10: "9",
    respuesta11: "10",
    respuesta12: "14",
    respuesta13: "La luna",
    respuesta14: "El sol",
    respuesta15: "El aire",
    respuesta16: "La rotación",
    respuesta17: "Hervivoro",
    respuesta18: "Vegetariano",
    respuesta19: "Acuatico",
    respuesta20: "Mamifero"
}

const respuestaEntretenimiento={

	respuesta1: "Django",
    respuesta2: "El renacido",
    respuesta3: "El lobo de Wll Street",
    respuesta4: "Titanic",
    respuesta5: "Brasil",
    respuesta6: "Alemania",
    respuesta7: "Colombia",
    respuesta8: "Japón",
    respuesta9: "Coco",
    respuesta10: "Encanto",
    respuesta11: "Intensamente",
    respuesta12: "Los increibles",
    respuesta13: "Oscar",
    respuesta14: "Globo de Oro",
    respuesta15: "India Catalina",
    respuesta16: "Gaviota",
    respuesta17: "Un León",
    respuesta18: "Mufasa",
    respuesta19: "Alex",
    respuesta20: "Simba"
};	
	
const respuestaGeografia={
	respuesta1: "Israel",
    respuesta2: "China",
    respuesta3: "Italia",
    respuesta4: "No existe",
    respuesta5: "2",
    respuesta6: "7",
    respuesta7: "6",
    respuesta8: "10",
    respuesta9: "Sahara",
    respuesta10: "Antartida",
    respuesta11: "Tatacoa",
    respuesta12: "Las vegas",
    respuesta13: "Alaska",
    respuesta14: "Antartida",
    respuesta15: "Washintong",
    respuesta16: "California",
    respuesta17: "America",
    respuesta18: "Africa",
    respuesta19: "Europa",
    respuesta20: "Asia",
};

const respuestaLiteratura={
	respuesta1: "Gabriel Garcia Marquez",
    respuesta2: "Homero",
    respuesta3: "Julio Cortazar",
    respuesta4: "Shakespeare",
    respuesta5: "Daniel Samper Ospina",
    respuesta6: "Rafael Pombo",
    respuesta7: "Jose Eustasio Rivera",
    respuesta8: "Gabriel Garcia Marquez",
    respuesta9: "Eso",
    respuesta10: "Alan",
    respuesta11: "Pirinola",
    respuesta12: "Aquel",
    respuesta13: "El señor de los anillos",
    respuesta14: "Los juegos del hambre",
    respuesta15: "Crepúsculo",
    respuesta16: "Harry Potter",
    respuesta17: "Julio Cortazar",
    respuesta18: "Gabriela Mistral",
    respuesta19: "Pablo Neruda",
    respuesta20: "Miguel de Cervantes",
}

const respuestaMatematicas={
	respuesta1: "Base 2",
    respuesta2: "Base 10",
    respuesta3: "Base e",
    respuesta4: "logaritmo natural",
    respuesta5: "0",
    respuesta6: "1",
    respuesta7: "2",
    respuesta8: "3",
    respuesta9: "Resultado",
    respuesta10: "Sustraendo",
    respuesta11: "Cociente",
    respuesta12: "Producto",
    respuesta13: "Infinito",
    respuesta14: "Indeterminado",
    respuesta15: "0",
    respuesta16: "1",
    respuesta17: "0",
    respuesta18: "Infinito",
    respuesta19: "1",
    respuesta20: "Indeterminado",
}

const respuestasCorrectas={
	respuesta1: "S",
    respuesta2: "Proceso de generar energía a través del sol",
    respuesta3: "9.8",
    respuesta4: "La luna",
    respuesta5: "Mamifero",
    respuesta6: "El renacido",
    respuesta7: "Brasil",
    respuesta8: "Encanto",
    respuesta9: "India Catalina",
    respuesta10: "Simba",
    respuesta11: "Israel",
    respuesta12: "6",
    respuesta13: "Antartida",
    respuesta14: "Alaska",
    respuesta15: "Asia",
    respuesta16: "Homero",
    respuesta17: "Gabriel Garcia Marquez",
    respuesta18: "Eso",
    respuesta19: "Harry Potter",
    respuesta20: "Julio Cortazar",
    respuesta21: "logaritmo natural",
    respuesta22: "2",
    respuesta23: "Producto",
    respuesta24: "Indeterminado",
    respuesta25: "1",
}



const nombreTabla=["Ciencia", "Entretenimiento", "Geografia", "Literatura", "Matematicas"]

boton.addEventListener("click",()=>{
	let i=0,a=0;
	let acu=0;
	let choseTabla=nombreTabla[0];
    let j=0;

	for( i in cuestiones) {

		addObjetos({pregunta: cuestiones[i]},choseTabla,IDBRequest);

		acu=acu+1;
		if(acu>=5 && acu <10){
			choseTabla=nombreTabla[1];
		}if(acu>=10 && acu<15){
			choseTabla=nombreTabla[2];
		}if(acu>=15 && acu<20){
			choseTabla=nombreTabla[3];
		}if(acu>=20 && acu<25){
			choseTabla=nombreTabla[4];
		}
	}
	choseTabla=nombreTabla[0];
	acu=0;

	for( a in respuestasCorrectas) {

		addObjetos({respuesta: respuestasCorrectas[a]},choseTabla,IDBRequest3);
		acu=acu+1;
		if(acu>=5 && acu <10){
			choseTabla=nombreTabla[1];
		}if(acu>=10 && acu<15){
			choseTabla=nombreTabla[2];
		}if(acu>=15 && acu<20){
			choseTabla=nombreTabla[3];
		}if(acu>=20 && acu<25){
			choseTabla=nombreTabla[4];
		}
	}
    
    for( j in respuestasCiencias){
        addObjetos({respuesta: respuestasCiencias[j]},nombreTabla[0],IDBRequest2);
    }
	for( j in respuestasCiencias){
        addObjetos({respuesta: respuestaEntretenimiento[j]},nombreTabla[1],IDBRequest2);
    }
	for( j in respuestasCiencias){
        addObjetos({respuesta: respuestaGeografia[j]},nombreTabla[2],IDBRequest2);
    }
	for( j in respuestasCiencias){
        addObjetos({respuesta: respuestaLiteratura[j]},nombreTabla[3],IDBRequest2);
    }
	for( j in respuestasCiencias){
        addObjetos({respuesta: respuestaMatematicas[j]},nombreTabla[4],IDBRequest2);
    }

	const mensaje=document.querySelector(".mensaje");
	// const empezar=document.querySelector(".empezarDiv");
	mensaje.innerHTML="¡Empecemos el juego!";
	// empezar.innerHTML=`<button class="empezar">EMPEZAR</button>`;

	const posicionesRespuestas=[];
	const key= Math.round(Math.random()*5);
		for(let k=0;k<20;k++){
		posicionesRespuestas[k]=k+1;
	}

	let contador=0
	// leerObjetos(nombreTabla[key],IDBRequest,key,posicionesRespuestas,IDBRequest2);
	leerObjetos(nombreTabla[key],IDBRequest,key,posicionesRespuestas,IDBRequest2,IDBRequest3,contador);
	
})

//////////////////////Accionamiento///////////////////////////////////////////////////////////////////////////////

