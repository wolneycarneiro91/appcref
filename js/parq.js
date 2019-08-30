$(document).on("pageshow","#pgn_cadastrar_parq",function(){
	console.log('pagina parq carregada');
	limpaCamposparq();
	var id_cliente 	 = localStorage.getItem('id_CLIENTE'); // VEM DO STORAGE EM CLIENTE.JS
	if(id_cliente!=''){
		mostrar_parq_cadastrada(id_cliente);
		
	}	
	
});

	function mostrar_parq_cadastrada(id_cliente){  
		console.log('mostrar_parq_cadastrada');				
			if(id_cliente!=''){
			
			//$("#exibir_btn_risco").show();//MOSTRAR BOTAO PARA CADASTRO DO PAR-Q
				db.transaction(function(anmncli) {
					anmncli.executeSql('SELECT * FROM parq WHERE  PARQ_CLIE_ID=? ', [id_cliente], function (anmncli,retorno_listcli){
						var rows = retorno_listcli.rows;				
						var LISTA_parq = '';
						if(rows.length>0){
						$(".exibir_parq").show();
						$(".exibir_risco").show();
							for(var b = 0; b<rows.length; b++){	
											
								$('#PARQ_ID').val(rows[b].PARQ_ID);					
							//	$('#PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO').val(rows.item(b)[["PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO"]]); 
								if(rows.item(b)[["PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO"]] == 1)
								{
									$("#parq_flag_possui_problema_cardiaco[value='1']").prop('checked', true);
									//$('#id_quem_MIOC').show();
								}   				
								//$('#PARQ_FLAG_SENTE_DOR_EXERCICIO').val(rows.item(b)[["PARQ_FLAG_SENTE_DOR_EXERCICIO"]]);	
								if(rows.item(b)[["PARQ_FLAG_SENTE_DOR_EXERCICIO"]] == 1)
								{
									$("#parq_flag_sente_dor_exercicio[value='1']").prop('checked', true);
								//	$('#id_quem_MIOC').show();
								}  			
								//$('#PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO').val(rows.item(b)[["PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO"]]);				
								if(rows.item(b)[["PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO"]] == 1)
								{
									$("#parq_flag_ult_meses_sente_dor_exercicio[value='1']").prop('checked', true);
									//$('#id_quem_MIOC').show();
								}  
							//	$('#PARQ_FLAG_PERDE_EQUILIBRIO').val(rows.item(b)[["PARQ_FLAG_PERDE_EQUILIBRIO"]]);				
								if(rows.item(b)[["PARQ_FLAG_PERDE_EQUILIBRIO"]] == 1)
								{
									$("#parq_flag_perde_equilibrio[value='1']").prop('checked', true);
									//$('#id_quem_MIOC').show();
								}  
							//	$('#PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA').val(rows.item(b)[["PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA"]]);				
								if(rows.item(b)[["PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA"]] == 1)
								{
									$("#parq_flag_problemas_osseos_artic_coluna[value='1']").prop('checked', true);
									//$('#id_quem_MIOC').show();
								}  
								//$('#PARQ_FLAG_MEDICO_PRES_MEDICAMENTO').val(rows.item(b)[["PARQ_FLAG_MEDICO_PRES_MEDICAMENTO"]]);				
								if(rows.item(b)[["PARQ_FLAG_MEDICO_PRES_MEDICAMENTO"]] == 1)
								{
									$("#parq_flag_medico_pres_medicamento[value='1']").prop('checked', true);
								//	$('#id_quem_MIOC').show();
								}  
							//	$('#PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV').val(rows.item(b)[["PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV"]]);														
								if(rows.item(b)[["PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV"]] == 1)
								{
									$("#parq_flag_outra_razao_nao_praticar_ativ[value='1']").prop('checked', true);

								//	$('#id_quem_MIOC').show();
								}  																																																																							 
							}
						}

					}, null);
				});
			}				
	}

function cadastrar_parq(){	
	console.log('CADASTRAR PARQ');
		
									
			var PARQ_CLIE_ID 			 	 		 		= localStorage.getItem('id_CLIENTE'); // VEM DO STORAGE EM CLIENTE.JS
			var PARQ_ID 			 				 	 	= document.getElementById('parq_id').value;	
			var PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO 	 		= getRadioValor('parq_flag_possui_problema_cardiaco');	
			var PARQ_FLAG_SENTE_DOR_EXERCICIO  		  	  	= getRadioValor('parq_flag_sente_dor_exercicio');	
			var PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO 	= getRadioValor('parq_flag_ult_meses_sente_dor_exercicio');	
			var PARQ_FLAG_PERDE_EQUILIBRIO 	  			  	= getRadioValor('parq_flag_perde_equilibrio');	
			var PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA 	= getRadioValor('parq_flag_problemas_osseos_artic_coluna');	
			var PARQ_FLAG_MEDICO_PRES_MEDICAMENTO 		  	= getRadioValor('parq_flag_medico_pres_medicamento');	
			var PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV 	= getRadioValor('parq_flag_outra_razao_nao_praticar_ativ');	
					
			var PARQ_DATA= '';//ESSA COLUNA NAO EXISTE NO BANCO PARA CASO HAJA NECESSIDADE NO FUTURO			
			var PARQ_DATA 			 = new Date();
			var dia_parq    			 = PARQ_DATA.getDate(); 
			var mes_parq   			 = PARQ_DATA.getMonth();
			var ano_parq  			 = PARQ_DATA.getFullYear(); 	
			var str_data_parq 		 = dia_parq + '/' + (mes_parq+1) + '/' + ano_parq;
			PARQ_DATA 			 	 = str_data_parq;	
									
		  /*if(PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO        ==''){ PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO      =0; }
		  if(PARQ_FLAG_SENTE_DOR_EXERCICIO             ==''){ PARQ_FLAG_SENTE_DOR_EXERCICIO           =0; }
		  if(PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO   ==''){ PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO =0; }
		  if(PARQ_FLAG_PERDE_EQUILIBRIO                ==''){ PARQ_FLAG_PERDE_EQUILIBRIO              =0; }
		  if(PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA   ==''){ PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA =0; }
		  if(PARQ_FLAG_MEDICO_PRES_MEDICAMENTO         ==''){ PARQ_FLAG_MEDICO_PRES_MEDICAMENTO       =0; }
		  if(PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV   ==''){ PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV =0; }*/
							  							 
	db.transaction(function(parqq) {
			if(PARQ_ID!=''){
				
				console.log("ID DA parq PASSADO = " +PARQ_ID);
		
				parqq.executeSql('UPDATE parq SET  PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO=?,  '+								
				' PARQ_FLAG_SENTE_DOR_EXERCICIO=?, '+
				' PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO=?, '+
				' PARQ_FLAG_PERDE_EQUILIBRIO=?, '+
				' PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA=?,'+
				' PARQ_FLAG_MEDICO_PRES_MEDICAMENTO=?,'+
				' PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV=?,'+			
				' PARQ_CLIE_ID=? '+
				' WHERE PARQ_ID=? ',
					[PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO,
					PARQ_FLAG_SENTE_DOR_EXERCICIO,
					PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO,
					PARQ_FLAG_PERDE_EQUILIBRIO,
					PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA,
					PARQ_FLAG_MEDICO_PRES_MEDICAMENTO,
					PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV,				
					PARQ_CLIE_ID,
					PARQ_ID],null);
										
					alert('Atualizado com sucesso.');
					window.location.href ='#pgn_listar_cliente';
					
			}else{
								
			parqq.executeSql('INSERT INTO parq ('+
							'PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO,'+
							'PARQ_FLAG_SENTE_DOR_EXERCICIO,'+
							'PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO,'+
							'PARQ_FLAG_PERDE_EQUILIBRIO,'+
							'PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA,'+
							'PARQ_FLAG_MEDICO_PRES_MEDICAMENTO,'+
							'PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV,'+						
							'PARQ_CLIE_ID)'+
							'VALUES (?,?,?,?,?,?,?,?)',
							[PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO,
							PARQ_FLAG_SENTE_DOR_EXERCICIO,
							PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO,
							PARQ_FLAG_PERDE_EQUILIBRIO,
							PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA,
							PARQ_FLAG_MEDICO_PRES_MEDICAMENTO,
							PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV,						
							PARQ_CLIE_ID]);		
							
							
				console.log('INSERT INTO parq ('+
							'PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO,'+
							'PARQ_FLAG_SENTE_DOR_EXERCICIO,'+
							'PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO,'+
							'PARQ_FLAG_PERDE_EQUILIBRIO,'+
							'PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA,'+
							'PARQ_FLAG_MEDICO_PRES_MEDICAMENTO,'+
							'PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV,'+						
							'PARQ_CLIE_ID)'+
							'VALUES (?,?,?,?,?,?,?,?)',
							[PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO,
							PARQ_FLAG_SENTE_DOR_EXERCICIO,
							PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO,
							PARQ_FLAG_PERDE_EQUILIBRIO,
							PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA,
							PARQ_FLAG_MEDICO_PRES_MEDICAMENTO,
							PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV,						
							PARQ_CLIE_ID]);				
				
				//limpaCamposparq();
				alert('Cadastrado com sucesso.');
				//window.location.href ='#pgn_listar_cliente';
				window.location.href ='#pgn_cadastrar_risco';
		}
	});	
		
	//}
	
}

	function limpaCamposparq(){
	console.log('limpar campos parq');
		//$('#parq_flag_possui_problema_cardiaco').val('');
		//$('#parq_flag_sente_dor_exercicio').val('');
		//$('#parq_flag_ult_meses_sente_dor_exercicio').val('');
		//$('#parq_flag_perde_equilibrio').val('');
		//$('#parq_flag_problemas_osseos_artic_coluna').val('');
		//$('#parq_flag_medico_pres_medicamento').val('');
		//$('#parq_flag_outra_razao_nao_praticar_ativ').val('');
$("#parq_flag_possui_problema_cardiaco[value='0']").prop('checked', true);

									$("#parq_flag_sente_dor_exercicio[value='0']").prop('checked', true);
									$("#parq_flag_ult_meses_sente_dor_exercicio[value='0']").prop('checked', true);
									$("#parq_flag_perde_equilibrio[value='0']").prop('checked', true);
									$("#parq_flag_problemas_osseos_artic_coluna[value='0']").prop('checked', true);
									$("#parq_flag_medico_pres_medicamento[value='0']").prop('checked', true);
									$("#parq_flag_outra_razao_nao_praticar_ativ[value='0']").prop('checked', true);
		
		
		//return;
	}