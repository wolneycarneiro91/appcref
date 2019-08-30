$(document).on("pageshow","#pgn_cadastrar_cliente",function(){
	console.log('pagina cliente carregada');
	mostrar_cliente();
	criar_select_estabelecimento();

});



function cadastrar_cliente(){	
	console.log('cadastrar_cliente');
	
	$('#content_form_cliente').show();	
	$("#content_lista_cliente").hide();
		
	var CLIE_ID 			 		  = document.getElementById('campo_id_cliente').value;
	var CLIE_NOME 			 		  = document.getElementById('campo_nome_cliente').value;    
	var CLIE_SEXO_ID  		  		  = document.getElementById('campo_sexo_cliente').value;
	var CLIE_DATA_NASCIMENTO 	  	  = document.getElementById('campo_data_nasc_cliente').value;
	var CLIE_PROFISSAO 	  			  = document.getElementById('campo_profissao_cliente').value;
	var CLIE_ESTADO_CIVIL_ID 	  	  = document.getElementById('campo_estado_civil_cliente').value;
	var CLIE_CIDADE 		  		  = document.getElementById('campo_cidade_cliente').value;
	var CLIE_ESTADO 		  		  = document.getElementById('campo_estado_cliente').value;
	var CLIE_PAIS 			  		  = document.getElementById('campo_pais_cliente').value;
	var CLIE_ESTABELECIMENTO_ID 	  = document.getElementById('campo_estabelecimento_cliente').value;
	var CLIE_DATA= '';
	
	var data_cli 			 = new Date();
	var dia_cli    			 = data_cli.getDate(); 
	var mes_cli    			 = data_cli.getMonth();
	var ano_cli   			 = data_cli.getFullYear(); 
	//var str_data_cli 		 = ano_cli + '-' + (mes_cli+1) + '-' + dia_cli;
	var str_data_cli 		 = dia_cli + '/' + (mes_cli+1) + '/' + ano_cli;
	CLIE_DATA 			 	 = str_data_cli;	
	var CLIE_USUARIO_ID =1;

if(!validaCampoText('campo_nome_cliente') || 	
	!validaCampoText('campo_data_nasc_cliente')||
	!validaCampoText('campo_profissao_cliente')||
	!validaCampoText('campo_estado_civil_cliente')||
	!validaCampoText('campo_cidade_cliente')||
	!validaCampoText('campo_estado_cliente')||
	!validaCampoText('campo_pais_cliente')||
	!validaCampoText('campo_estabelecimento_cliente')
	){
		
		alert("Os campos com * são obrigatórios");
		}else{	

				db.transaction(function(client) {
				/*	if(id_cliente){
						cli.executeSql('UPDATE USUARIO SET USUA_NOME=?,USUA_EMAIL=?,USUA_TELEFONE=?,USUA_NUMERO_REGISTRO=?,USUA_CIDADE=?,USUA_FLAG_ATIVO=?,USUA_DATA=? WHERE USUA_ID=?',[USUA_NOME,USUA_EMAIL,USUA_TELEFONE,USUA_CIDADE,USUA_FLAG_ATIVO,USUA_DATA,id_cliente],null);
					}else{*/
					
										
			client.executeSql('INSERT INTO CLIENTE ( CLIE_NOME,CLIE_SEXO_ID,CLIE_DATA_NASCIMENTO,'+
							'CLIE_PROFISSAO,CLIE_ESTADO_CIVIL_ID,CLIE_CIDADE,CLIE_ESTADO,CLIE_PAIS,CLIE_ESTABELECIMENTO_ID,'+
							'CLIE_DATA,CLIE_USUARIO_ID)'+
							'VALUES (?,?,?,?,?,?,?,?,?,?,?)',[CLIE_NOME,CLIE_SEXO_ID,CLIE_DATA_NASCIMENTO,CLIE_PROFISSAO,CLIE_ESTADO_CIVIL_ID,CLIE_CIDADE,CLIE_ESTADO,CLIE_PAIS,CLIE_ESTABELECIMENTO_ID,CLIE_DATA,CLIE_USUARIO_ID]);
							
						
				//}
				});	
				mostrar_cliente();
				limpaCamposCliente();
				}
	//inputSHOW(false);
}



	function mostrar_cliente(){  
		console.log('mostrar_cliente');
		
		$('#content_form_cliente').hide();		
		$('#lista_clientes').html('');

	db.transaction(function(listcli) {
			listcli.executeSql('SELECT * FROM CLIENTE ', [], function (listcli,retorno_listcli){
				var rows = retorno_listcli.rows;
				//console.log('transaction' +listcli);
				var LISTA_CLIENTE = '';
				for(var a = 0; a<rows.length; a++){										
						LISTA_CLIENTE += '<ion-item class="item md in-list ion-focusable hydrated item-label">'+
										 '<ion-label>'+ rows.item(a)[["CLIE_NOME"]] +' '+
											'</ion-label>'+
											'<ion-fab-button color="light" horizontal="end" vertical="center" '+
											'size="small" onclick="exibir_pergunta('+ rows.item(a)[["CLIE_ID"]]+')" ><ion-icon name="checkmark-circle-outline" ></ion-fab-button></ion-icon></ion-item>';																										  
				}
				//console.log('LISTA_CLIENTE = ' +LISTA_CLIENTE);
				$('#lista_clientes').html(LISTA_CLIENTE);				

			}, null);
		});
		
		$("#content_lista_cliente").show();
	}

	
function exibir_pergunta(CLIE_ID){
		localStorage.setItem("id_CLIENTE",CLIE_ID);
		console.log('EXIBIR PERGUNTA');
		console.log('id_CLIENTE CRIADO = '+localStorage.getItem("id_CLIENTE"));
		
		var txt;
		var r = confirm("Avaliar cliente agora?");
		if (r == true) {
		  window.location.href ='#pgn_cadastrar_anamnese';
		} else {
		  
		}		
	
	
	}
function criar_select_estabelecimento(){  
	console.log('criar_select_estabelecimento');		
	$('#option_estabelecimentos_cliente').html('');

	db.transaction(function(sltestab) {
			sltestab.executeSql('SELECT * FROM ESTABELECIMENTO ', [], function (sltestab,retorno_selectab){
				var rows = retorno_selectab.rows;
				//console.log('transaction' +sltestab);
				var CONTEUDO_SELECTESTAB = '';
				CONTEUDO_SELECTESTAB +='<ion-select id="campo_estabelecimento_cliente">	';				
				for(var z = 0; z<rows.length; z++){
						
					CONTEUDO_SELECTESTAB += '<ion-select-option value="'+ rows.item(z)[["ESTA_ID"]] +'">'+rows.item(z)[["ESTA_NOME"]] +'</ion-select-option>';																																		  
										   
				}			
				CONTEUDO_SELECTESTAB +='</ion-select>';						
				$('#option_estabelecimentos_cliente').html(CONTEUDO_SELECTESTAB);					

			}, null);
		});
}






function limpaCamposCliente(){
		
	$('#campo_nome_cliente').val('');	
	$('#campo_sexo_cliente').val('');	
	$('#campo_data_nasc_cliente').val('');	
	$('#campo_profissao_cliente').val('');	
	$('#campo_estado_civil_cliente').val('');	
	$('#campo_cidade_cliente').val('');	
	$('#campo_estado_cliente').val('');	
	$('#campo_pais_cliente').val('');	
	$('#campo_estabelecimento_cliente').val('');	


}