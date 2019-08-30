$(document).on("pageshow","#pgn_estabelecimento",function(){
	console.log('pagina estabelecimento carregada');
	//mostrar_estabelecimento();
	
});

$(document).on("pageshow","#pgn_lista_estabelecimento",function(){
	console.log('pagina pgn_lista_estabelecimento carregada');
	mostrar_estabelecimento();
	
});


function cadastrar_estabelecimento(){
	console.log('cadastrar_estabelecimento');			
	var campo_nome_estabelecimento 			 = document.getElementById('campo_nome_estabelecimento').value;    
	var estabelecimento_id 			 = '';    
	var usuario_id 	 = 1;
	
	if(!validaCampoText('campo_nome_estabelecimento')){
		
		alert("Os campos com * são obrigatórios");
		}else{
	
				db.transaction(function(etb) {
					if(estabelecimento_id!=''){
						etb.executeSql('UPDATE ESTABELECIMENTO SET ESTA_NOME=?,ESTA_USUARIO_ID=? WHERE ESTA_ID=?',[campo_nome_estabelecimento,usuario_id,estabelecimento_id],null);
					}else{
						etb.executeSql('INSERT INTO ESTABELECIMENTO (ESTA_NOME,ESTA_USUARIO_ID) VALUES (?,?)', [campo_nome_estabelecimento,usuario_id]);
					}
				});
				$('#card_estabelecimento').hide();				
				limpaCampoEstabelecimento();
				irPara('pgn_lista_estabelecimento');
	}
	//inputSHOW(false);
}

function mostrar_estabelecimento(){  
	console.log('mostrar_estabelecimento');	
	//var tabela_estabelecimento = document.getElementById('tbody-profile');
	$('#lista_estabelecimentos').html('');

db.transaction(function(estab) {
		estab.executeSql('SELECT * FROM ESTABELECIMENTO ', [], function (estab,retorno_estab){
			var rows = retorno_estab.rows;
			console.log('transaction' +estab);
			var CONTEUDO_ESTAB = '';
			CONTEUDO_ESTAB +='<ion-grid>';	
			CONTEUDO_ESTAB +='<ion-row><ion-col>';	
			for(var y = 0; y<rows.length; y++)
			{
					
					CONTEUDO_ESTAB += '<ion-item class="item md in-list ion-focusable hydrated item-label">'+					
					'<ion-label>'+ rows.item(y)[["ESTA_NOME"]]+'</font></ion-label></ion-item>';																										
									   
									   
			}
	
			//console.log('CONTEUDO_ESTAB = ' +CONTEUDO_ESTAB);
			$('#lista_estabelecimentos').html(CONTEUDO_ESTAB);
				//tabela_estabelecimento.innerHTML = CONTEUDO_ESTAB; 

		}, null);
	});
}

function limpaCampoEstabelecimento(){
	
	$('#campo_nome_estabelecimento').val('');
	
	
}

/*function controlar_estabelecimento(){			
	$('#card_estabelecimento').show();
	$('#lista_estabelecimentos').html('');
	
}*/