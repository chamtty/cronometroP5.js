let canvas;
let divTotal;
let horas_texto;
let btnContagem;
let btnZerar;
let radioOpc;
let radioOpc_Marcado;
let timer_input_Minutos;
let timer_input_Segundos;
let borda = 50;
let contar = false;
let zerar = true;
let cor = 50;
let tamanho = 80;
let minutos, segundos;
let segundos_Alt, minutos_Alt;
let regressiva_Var = true;

let segundosNow;
let segundosCompara;

let uma_Vez = false;

function setup() {
	background(20);
	this.lastSegundo = second();
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1');

	horas_texto = select('#timer_texto');
	horas_texto.hide();
	btnContagem = select('#btnContagem');
	btnZerar = select('#btnZerar');
	radioOpc = document.getElementsByName('tipo');
	timer_input_Minutos = select('#timer_input_Minutos');
	timer_input_Segundos = select('#timer_input_Segundos');
	divTotal = select('#timer');
	cetralizaElemento(divTotal);
	btnContagem.mousePressed(iniciaContagem);
	btnZerar.mousePressed(pararContagem);

}

function windowResized(){
	canvas.size(windowWidth, windowHeight);
	cetralizaElemento(divTotal);
}

function draw() {

	cetralizaElemento(divTotal);
	desenhaCirculos();

	if(regressiva_Var == true && contar == true){
		regressiva(minutos, segundos);
	}else if(regressiva_Var == false && contar == true){
		progressiva(minutos, segundos);
	}

	segundosCompara = segundosNow;
	segundosNow = second();
}

function desenhaCirculos(){

	push();
	fill(cor);
	if(mouseIsPressed){
		borda++;
		if(borda == 255){
			borda = 50;
		}
		stroke(borda);
	}else{
		noStroke();
	}
	ellipse(mouseX,mouseY,tamanho,tamanho);
	pop();

}

function pararContagem(modo){
	if(modo == 1){
		if(zerar == false){
			zerar = true;
			minutos = '00';
			segundos = '00';
			segundos_Alt = '00';
			minutos_Alt = '00';
			contar = false;
			horas_texto.html('00 : 00');
			horas_texto.hide();
			select('#temp_TextBox').show();
			btnContagem.html('Iniciar Contagem');
		}
	}else if(modo == 2){
		if(zerar == false){
			zerar = true;
			setarTexto(minutos_Alt, segundos_Alt);
			minutos = '00';
			segundos = '00';
			segundos_Alt = '00';
			minutos_Alt = '00';
			contar = false;
			horas_texto.hide();
			select('#temp_TextBox').show();
			btnContagem.html('Iniciar Contagem');
		}
	}else{
		zerar = true;
		minutos = '00';
		segundos = '00';
		segundos_Alt = '00';
		minutos_Alt = '00';
		contar = false;
		horas_texto.html('00 : 00');
		horas_texto.hide();
		select('#temp_TextBox').show();
		btnContagem.html('Iniciar Contagem');
	}

}

function iniciaContagem(){

	if(contar == false){
		contar = true;
		if(zerar == true){
			zerar = false;

			for (var i=0;i<radioOpc.length;i++){
				if ( radioOpc[i].checked ) {
					radioOpc_Marcado = radioOpc[i].value;
				}
			}

			if(radioOpc_Marcado == 'regressivo'){
				regressiva_Var = true;
			}else if(radioOpc_Marcado == 'progressivo'){
				regressiva_Var = false;
			}

			minutos = timer_input_Minutos.value();
			segundos = timer_input_Segundos.value();

			if(regressiva_Var == true){
				segundos_Alt = segundos;
				minutos_Alt = minutos;
			}else if(regressiva_Var == false){
				segundos_Alt = 0;
				minutos_Alt = 0;
			}
		}
		btnContagem.html('Pausar Contagem');
		select('#temp_TextBox').hide();
		setarTexto(minutos_Alt, segundos_Alt);
		horas_texto.show();
	}else if(contar  == true){
		pausarContagem();
	}
}

function pausarContagem(){
	contar = false;
	btnContagem.html('Continuar Contagem');
}

function progressiva(minutos, segundos){

	
	if(segundosNow != segundosCompara){
		if(segundos_Alt <= 60){
			segundos_Alt++;
			if(segundos_Alt == 60){
				segundos_Alt = 0;
				minutos_Alt++;
			}
		}

		setarTexto(minutos_Alt, segundos_Alt);
	}
}

function regressiva(minutos, segundos){

	if(segundosNow != segundosCompara && contar == true && zerar == false){
		segundos_Alt--;
		if(segundos_Alt <= 0){
			segundos_Alt = 59;
			if(minutos_Alt == 0){
				segundos_Alt = 0;
			}
			minutos_Alt--;
		}
		if(minutos_Alt <= 0 ){
			minutos_Alt = 0;
		}

		if(segundos_Alt == 0 && minutos_Alt == 0){
			pararContagem(1);
		}

		setarTexto(minutos_Alt, segundos_Alt);
	}
}

function formatarTempo(tempo){
	tempo = ''+tempo+'';
	let str = tempo.split('');

	if(tempo < 10){
		tempo = '0'+tempo;
	}

	if(str.length == 3 && str[0] == 0){
		tempo = str[1]+''+str[2];
	}

	if(tempo == 0){
		tempo = "00";
	}

	return tempo;
}

function setarTexto(minutos, segundos){
	segundos = formatarTempo(segundos);
	minutos = formatarTempo(minutos);

	if(zerar == false){
		horas_texto.html(minutos+' : '+segundos);
	}

}

function cetralizaElemento(div){
	let interacao = select('#interacao');
	div.position(0, windowHeight/2 - div.height/2);
	div.size(windowWidth);
	btnContagem.size(interacao.size().width/2);
	if(btnContagem.size().width < 30){
		btnContagem.size(200);
	}
}

function mascara(text){
	let str = text.value.replace(/[^\d]/,'');
	text.value = str;
}

function formatarText(text){
	text.value = formatarTempo(text.value);
}

/*function desenhaRelogio(){
	let minutos = minute();
	let segundos = second();

	if(segundos<10){
		segundos = '0'+segundos;
	}
	if(minutos<10){
		minutos = '0'+minutos;
	}

	push();
	fill(255);
	textAlign(CENTER);
	textSize(180);
	horas_texto.html(+': '+minutos+': '+segundos);
	//text(minutos+': '+segundos,windowWidth/2,windowHeight/2);
	pop();
}*/