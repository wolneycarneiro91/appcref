$(document).on("pageshow","#pgn_listar_cliente",function(){
	console.log('pagina listar cliente carregada');
	localStorage.removeItem("id_CLIENTE");

	mostrar_cliente();
		//calcular_pontuacao();
	 $("#painel_escolhas").hide();
	
	
});

$(document).on("pageshow","#pgn_cadastrar_cliente",function(){
	console.log('pagina cadastrar cliente carregada');
	
	criar_select_estabelecimento();
	
});

function cadastrar_cliente(){	
	console.log('cadastrar_cliente');			
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
															
				client.executeSql('INSERT INTO CLIENTE ( CLIE_NOME,CLIE_SEXO_ID,CLIE_DATA_NASCIMENTO,'+
							'CLIE_PROFISSAO,CLIE_ESTADO_CIVIL_ID,CLIE_CIDADE,CLIE_ESTADO,CLIE_PAIS,CLIE_ESTABELECIMENTO_ID,'+
							'CLIE_DATA,CLIE_USUARIO_ID)'+
							'VALUES (?,?,?,?,?,?,?,?,?,?,?)',[CLIE_NOME,CLIE_SEXO_ID,CLIE_DATA_NASCIMENTO,CLIE_PROFISSAO,CLIE_ESTADO_CIVIL_ID,CLIE_CIDADE,CLIE_ESTADO,CLIE_PAIS,CLIE_ESTABELECIMENTO_ID,CLIE_DATA,CLIE_USUARIO_ID]);
													
				//}
				});					
				limpaCamposCliente();
				irPara('pgn_listar_cliente');
				}
	//inputSHOW(false);
}

function editar_cliente(){
	
		var CLIE_ID 			 		  = $('#CLIE_ID').val();
		var CLIE_NOME 			 		  = document.getElementById('CLIE_NOME').value;    
		var CLIE_SEXO_ID  		  		  = document.getElementById('CLIE_SEXO_ID').value;
		var CLIE_DATA_NASCIMENTO 	  	  = document.getElementById('CLIE_DATA_NASCIMENTO').value;
		var CLIE_PROFISSAO 	  			  = document.getElementById('CLIE_PROFISSAO').value;
		var CLIE_ESTADO_CIVIL_ID 	  	  = document.getElementById('CLIE_ESTADO_CIVIL_ID').value;
		var CLIE_CIDADE 		  		  = document.getElementById('CLIE_CIDADE').value;
		var CLIE_ESTADO 		  		  = document.getElementById('CLIE_ESTADO').value;
		var CLIE_PAIS 			  		  = document.getElementById('CLIE_PAIS').value;
		var CLIE_ESTABELECIMENTO_ID 	  = document.getElementById('CLIE_ESTABELECIMENTO_ID').value;
		var CLIE_DATAx= '';
		
		var data_clie 			 = new Date();
		var dia_clie    			 = data_clie.getDate(); 
		var mes_clie   			 = data_clie.getMonth();
		var ano_clie   			 = data_clie.getFullYear(); 
		//var str_data_cli 		 = ano_cli + '-' + (mes_cli+1) + '-' + dia_cli;
		var str_data_cli 		 = dia_clie + '/' + (mes_clie+1) + '/' + ano_clie;
		CLIE_DATAx 			 	 = str_data_cli;	
		var CLIE_USUARIO_ID =1;	
	if(CLIE_ID!=''){
				
				console.log("ID DO CLIENTE PASSADO = " +CLIE_ID);
		db.transaction(function(client_) {
				client_.executeSql('UPDATE CLIENTE SET  CLIE_NOME=?,  '+								
				' CLIE_SEXO_ID=?, '+
				' CLIE_DATA_NASCIMENTO=?, '+
				' CLIE_PROFISSAO=?, '+
				' CLIE_ESTADO_CIVIL_ID=?,'+
				' CLIE_CIDADE=?,'+
				' CLIE_ESTADO=?,'+			
				' CLIE_PAIS=?, '+
				' CLIE_ESTABELECIMENTO_ID=?, '+
				' CLIE_DATA=? '+
				' WHERE CLIE_ID=? ',
					[CLIE_NOME,
					CLIE_SEXO_ID,
					CLIE_DATA_NASCIMENTO,
					CLIE_PROFISSAO,
					CLIE_ESTADO_CIVIL_ID,
					CLIE_CIDADE,
					CLIE_ESTADO,				
					CLIE_PAIS,
					CLIE_ESTABELECIMENTO_ID,
					CLIE_DATAx,CLIE_ID],null);
		});	
		

	/*	console.log('UPDATE CLIENTE SET  CLIE_NOME=?,  '+								
				' CLIE_SEXO_ID=?, '+
				' CLIE_DATA_NASCIMENTO=?, '+
				' CLIE_PROFISSAO=?, '+
				' CLIE_ESTADO_CIVIL_ID=?,'+
				' CLIE_CIDADE=?,'+
				' CLIE_ESTADO=?,'+			
				' CLIE_PAIS=?, '+
				' CLIE_ESTABELECIMENTO_ID=?, '+
				' CLIE_DATA=? '+
				' WHERE CLIE_ID=? ',
					[CLIE_NOME,
					CLIE_SEXO_ID,
					CLIE_DATA_NASCIMENTO,
					CLIE_PROFISSAO,
					CLIE_ESTADO_CIVIL_ID,
					CLIE_CIDADE,
					CLIE_ESTADO,				
					CLIE_PAIS,
					CLIE_ESTABELECIMENTO_ID,
					CLIE_DATAx,CLIE_ID],null);*/
			 
			window.location.href ='#pgn_listar_cliente';
					
			}	
			
	}

function mostrar_cliente(){  
		console.log('mostrar_cliente');					
		$('#lista_clientes').html('');
		
		db.transaction(function(listcli) {
			listcli.executeSql('SELECT * FROM CLIENTE ', [], function (listcli,retorno_listcli){
				var rows = retorno_listcli.rows;
				//console.log('transaction' +listcli);
				var LISTA_CLIENTE = '';
				for(var a = 0; a<rows.length; a++){		
								data_nascimento = rows.item(a)[["CLIE_DATA_NASCIMENTO"]];
					data_nascimento = data_nascimento.split("-");

					var idade = Calcularidade(data_nascimento[0],data_nascimento[1],data_nascimento[2]);	
					var genero='';
					if(rows.item(a)[["CLIE_SEXO_ID"]]==1){
						genero='masculino';
						}
						
					if(rows.item(a)[["CLIE_SEXO_ID"]]==2){
						genero='feminino';
					}
					var estado_civil='';
					if(rows.item(a)[["CLIE_ESTADO_CIVIL_ID"]]==1){
						estado_civil='Casado';
						}
						
					if(rows.item(a)[["CLIE_ESTADO_CIVIL_ID"]]==2){
						estado_civil='Divorciado';
					}					
					if(rows.item(a)[["CLIE_ESTADO_CIVIL_ID"]]==3){
						estado_civil='Solteiro';
					}
					var profissao ='';
					if(rows.item(a)[["CLIE_PROFISSAO"]]!=''){
						profissao = rows.item(a)[["CLIE_PROFISSAO"]];
					}					
					var cidade ='';
					if(rows.item(a)[["CLIE_CIDADE"]]!=''){
						cidade = rows.item(a)[["CLIE_CIDADE"]];
					}					
					var estado ='';
					if(rows.item(a)[["CLIE_ESTADO"]]!=''){
						estado = rows.item(a)[["CLIE_ESTADO"]];
					}					
					var pais ='';
					if(rows.item(a)[["CLIE_PAIS"]]!=''){
						pais = rows.item(a)[["CLIE_PAIS"]];
					}
					var txt_estabelecimento='';
					if(rows.item(a)[["CLIE_ID"]]!=''){
						txt_estabelecimento = ver_estabelecimento(rows.item(a)[["CLIE_ID"]]);
					}					
					
					
					/*	LISTA_CLIENTE += '<ion-item class="item md in-list ion-focusable hydrated item-label">'+
										 '<ion-label>'+ rows.item(a)[["CLIE_NOME"]] +' '+
											'</ion-label>'+
											'<ion-fab-button color="light" horizontal="end" vertical="center" '+
											'size="small" onclick="exibir_painel('+ rows.item(a)[["CLIE_ID"]]+')" ><ion-icon name="checkmark-circle-outline" ></ion-fab-button></ion-icon></ion-item>';		*/																								  
						/*LISTA_CLIENTE += '<ion-item class="item md in-list ion-focusable hydrated item-label">'+
										 '<ion-label>'+ rows.item(a)[["CLIE_NOME"]] +' '+
											'</ion-label>'+
											'<ion-fab-button color="light" horizontal="end" vertical="center" '+
											'size="small" onclick="exibir_painel('+ rows.item(a)[["CLIE_ID"]]+')" ><img src="../img/sorrindo.png" ></ion-fab-button></ion-item>';	
						*/
						LISTA_CLIENTE += '<div data-role="collapsible-set" data-collapsed-icon="carat-d" >'+
										    '<div data-role="collapsible" data-mini="true" >'+
										        '<h6 >'+
													''+rows.item(a)[["CLIE_NOME"]]+'<br>idade:'+idade+'<br>  genero:'+genero+'<br> '+
													'estado civil:'+estado_civil+'<br>  '+
													'profissao:'+profissao+'<br>  '+
													'cidade:'+cidade+'<br>  '+
													'estado:'+estado+'<br>  '+
													'País:'+pais+'<br> '+													
													'</h6>'+
										        '<table width="100%" ><tr><td>'+
																									          	
													'<div data-role="collapsible" data-mini="true" data-collapsed-icon="arrow-r" data-iconpos="right"><h3 onclick="avaliarClient('+ rows.item(a)[["CLIE_ID"]]+')">Avaliar</h3></div>'+
													'<div data-role="collapsible" data-mini="true" data-collapsed-icon="action" data-iconpos="right"><h3 onclick="resultadoCliente('+ rows.item(a)[["CLIE_ID"]]+')">Resultado</h3></div>'+
													'<div data-role="collapsible" data-mini="true" data-collapsed-icon="edit" data-iconpos="right"><h3 onclick="mostrar_cliente_edicao('+ rows.item(a)[["CLIE_ID"]]+')">Editar</h3></div>'+
													'<div data-role="collapsible" data-mini="true"  data-collapsed-icon="delete" data-iconpos="right"><h3 onclick="confirma_exclusao('+ rows.item(a)[["CLIE_ID"]]+');">Excluir</h3></div>'+								            	
													'<div data-role="collapsible" data-mini="true"  data-collapsed-icon="delete" data-iconpos="right"><h3 >Excluir</h3></div>'+								            	
													'</td></tr></table>'+								            	
										    '</div>'+
										'</div>';															
				}
				//console.log('LISTA_CLIENTE = ' +LISTA_CLIENTE);
				$('#lista_clientes').html(LISTA_CLIENTE);	
				$('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});
							

			}, null);
		});
				
	}
	
	
	function ver_estabelecimento(cliente_vw){
	db.transaction(function(slcest) {
			slcest.executeSql('SELECT ESTABELECIMENTO.ESTA_NOME FROM CLIENTE INNER JOIN '+
									'ESTABELECIMENTO ON  '+
									'ESTABELECIMENTO.ESTA_ID = CLIENTE.CLIE_ESTABELECIMENTO_ID'+
									'WHERE  CLIENTE.CLIE_ID=?', [cliente_vw], function (slcest,retorno_estab_cli){
										
										
		var rows = retorno_estab_cli.rows;
			
			var estab_nome_x = '';

			for(var y = 0; y<rows.length; y++)
			{
					
					estab_nome_x = rows.item(y)[["ESTA_NOME"]];																										
									   
									   
			}
			return estab_nome_x;	
			}, null);
			
		});	
		
		 
		}
	
function exibir_painel(CLIE_ID){
		localStorage.setItem("id_CLIENTE",CLIE_ID);
		console.log('exibir_painel');
		console.log('id_CLIENTE CRIADO = '+localStorage.getItem("id_CLIENTE"));
		$("#painel_escolhas").show();
			
	
	}
	
function confirma_exclusao(ID_CLI_X){
			 console.log('confirma_exclusao');
		var txt;
			var r = confirm("Confirma exclusão?");
			if (r == true) {
			  excluir_cliente(ID_CLI_X);
			  mostrar_cliente();
			  $("#painel_escolhas").hide();
			} else {
			  
			}								
		}
				
function mostrar_cliente_edicao(CLIE_ID){ 
	localStorage.setItem("id_CLIENTE",CLIE_ID);
			var id_cliente_editar = localStorage.getItem("id_CLIENTE");
			irPara('pgn_editar_cliente');
			console.log('mostrar_cliente_cadastrada');				
			if(id_cliente_editar!=''){			
				db.transaction(function(anmncli) {
					anmncli.executeSql('SELECT * FROM cliente WHERE  CLIE_ID=? ', [id_cliente_editar], function (anmncli,retorno_listcli){
						var rows = retorno_listcli.rows;				
						var LISTA_cliente = '';
						if(rows.length>0){
							for(var b = 0; b<rows.length; b++){	
											
								$('#CLIE_ID').val(id_cliente_editar);				
								$('#CLIE_NOME').val(rows.item(b)[["CLIE_NOME"]]);   				
								$('#CLIE_SEXO_ID').val(rows.item(b)[["CLIE_SEXO_ID"]]);				
								$('#CLIE_DATA_NASCIMENTO').val(rows.item(b)[["CLIE_DATA_NASCIMENTO"]]);				
								$('#CLIE_PROFISSAO').val(rows.item(b)[["CLIE_PROFISSAO"]]);				
								$('#CLIE_ESTADO_CIVIL_ID').val(rows.item(b)[["CLIE_ESTADO_CIVIL_ID"]]);				
								$('#CLIE_CIDADE').val(rows.item(b)[["CLIE_CIDADE"]]);				
								$('#CLIE_ESTADO').val(rows.item(b)[["CLIE_ESTADO"]]);														
								$('#CLIE_PAIS').val(rows.item(b)[["CLIE_PAIS"]]);														
																					
								criar_select_estabelecimento_ed(rows.item(b)[["CLIE_ESTABELECIMENTO_ID"]]);																																																																							 
							}
						}

					}, null);
				});
			}
			
	}  
		
function criar_select_estabelecimento_ed(CLIE_ESTABELECIMENTO_ID){  
	console.log('criar_select_estabelecimento_ed = ' + CLIE_ESTABELECIMENTO_ID);		
	//$('#option_estabelecimentos_cliente_ed').html('');
	db.transaction(function(sltestab) {
			sltestab.executeSql('SELECT * FROM ESTABELECIMENTO ', [], function (sltestab,retorno_selectab){
				var rows = retorno_selectab.rows;
				//console.log('transaction' +sltestab);
				var CONTEUDO_SELECTESTAB = '';
			//	CONTEUDO_SELECTESTAB +='<select id="CLIE_ESTABELECIMENTO_ID">	';				
				for(var z = 0; z<rows.length; z++){

					if(CLIE_ESTABELECIMENTO_ID == rows.item(z)[["ESTA_ID"]] ) { 
						CONTEUDO_SELECTESTAB += '<option value="'+ CLIE_ESTABELECIMENTO_ID +'" selected>'+rows.item(z)[["ESTA_NOME"]] +'</option>';																																		  
					$('#CLIE_ESTABELECIMENTO_ID').append(CONTEUDO_SELECTESTAB);	
					} else{
						CONTEUDO_SELECTESTAB += '<option value="'+ rows.item(z)[["ESTA_ID"]] +'">'+rows.item(z)[["ESTA_NOME"]] +'</option>';																																		  
						$('#CLIE_ESTABELECIMENTO_ID').append(CONTEUDO_SELECTESTAB)
					}					   
				}			
				//CONTEUDO_SELECTESTAB +='</select>';						
				//$('#option_estabelecimentos_cliente_ed').html(CONTEUDO_SELECTESTAB);	
				$('#CLIE_ESTABELECIMENTO_ID').selectmenu('refresh', true);			
			}, null);
		});
}	
		
function excluir_cliente(CLIE_ID_x){
	console.log('excluir_cliente');

	
	db.transaction(function(excls4) {
			excls4.executeSql('DELETE FROM CLIENTE WHERE  CLIE_ID=?', [CLIE_ID_x], function (excls4,retorno_exc){																
			}, null);
		});		
	db.transaction(function(excls1) {
			excls1.executeSql('DELETE FROM RISCO_CARDIOVASCULAR WHERE  RISCO_CLIE_ID=?', [CLIE_ID_x], function (excls1,retorno_exc){																
			}, null);
		});	
		db.transaction(function(excls2) {
			excls2.executeSql('DELETE FROM PARQ WHERE  PARQ_CLIE_ID=?', [CLIE_ID_x], function (excls2,retorno_exc){																
			}, null);
		});	
		db.transaction(function(excls3) {
			excls3.executeSql('DELETE FROM ANAMNESE WHERE  ANAM_CLIE_ID=?', [CLIE_ID_x], function (excls3,retorno_exc){																
			}, null);
		});	
							
}	

function criar_select_estabelecimento(){  
	console.log('criar_select_estabelecimento');		
	$('#option_estabelecimentos_cliente').html('');

	db.transaction(function(sltestab) {
			sltestab.executeSql('SELECT * FROM ESTABELECIMENTO ', [], function (sltestab,retorno_selectab){
				var rows = retorno_selectab.rows;
				//console.log('transaction' +sltestab);
				var CONTEUDO_SELECTESTAB = '';
				//CONTEUDO_SELECTESTAB +='<ion-select id="campo_estabelecimento_cliente">	';				
				for(var z = 0; z<rows.length; z++){
						
					CONTEUDO_SELECTESTAB += '<option value="'+ rows.item(z)[["ESTA_ID"]] +'">'+rows.item(z)[["ESTA_NOME"]] +'</option>';																																		  
										   
				}			
				//CONTEUDO_SELECTESTAB +='</ion-select>';						
				$('#campo_estabelecimento_cliente').html(CONTEUDO_SELECTESTAB);		
				$("#campo_estabelecimento_cliente").selectmenu('refresh', true);				

			}, null);
		});
}

function limpaCamposCliente()
{
		
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
function avaliarClient(CLIE_ID)
{
	localStorage.setItem("id_CLIENTE",CLIE_ID);
	irPara('pgn_cadastrar_anamnese');
}
function resultadoCliente(CLIE_ID)
{
	localStorage.setItem("id_CLIENTE",CLIE_ID);
	irPara('pgn_avaliacao')	;
}




var el = document.getElementById('idOfElement');

// listen for the long-press event
el.addEventListener('long-press', function(e) {

  // stop the event from bubbling up
  e.preventDefault()
	console.log('works');
  console.log(e.target);
});
