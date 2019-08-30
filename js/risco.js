$(document).on("pageshow","#pgn_cadastrar_risco",function(){
	console.log('pagina pgn_cadastrar_risco carregada');
	limpaCamposRISCO();
	var id_cliente 	 = localStorage.getItem('id_CLIENTE'); // VEM DO STORAGE EM CLIENTE.JS
	if(id_cliente!='')
	{
		mostrar_RISCO_cadastrada(id_cliente);
	}	
	
});
	function iniciarRisco()
	{
		var id_cliente 	 = localStorage.getItem('id_CLIENTE'); 
		var data_nascimento = 0;
		db.transaction(function(perf) {
			perf.executeSql('SELECT CLIE_DATA_NASCIMENTO FROM CLIENTE WHERE CLIE_ID =? ', [id_cliente], 
				function (perf,retorno_user_cad){
					var rows = retorno_user_cad.rows;
					data_nascimento = rows.item(0)[["CLIE_DATA_NASCIMENTO"]];
					data_nascimento = data_nascimento.split("-");

					var idade = Calcularidade(data_nascimento[0],data_nascimento[1],data_nascimento[2]);
					if(idade >= 10 && idade <= 20)
					{
						$("#idade_enum").val(0);
					}
					if(idade >= 21 && idade <= 30)
					{
						$("#idade_enum").val(1);
					}
					if(idade >= 31 && idade <= 40)
					{
						$("#idade_enum").val(2);
					}
					if(idade >= 41 && idade <= 50)
					{
						$("#idade_enum").val(3);
					}
					if(idade >= 51 && idade <= 60)
					{
						$("#idade_enum").val(4);
					}
					if(idade >= 61 && idade <= 70)
					{
						$("#idade_enum").val(5);
					}
				}, 
				null
			);
		});	
		db.transaction(function(perf) {
			perf.executeSql('SELECT ANAM_TABAGISMO_ENUM,ANAM_FLAG_HABITO_FUMAR FROM anamnese WHERE ANAM_CLIE_ID =? ', [id_cliente], 
				function (perf,retorno_user_cad){
					var rows = retorno_user_cad.rows;
					fuma = rows.item(0)[["ANAM_TABAGISMO_ENUM"]];
					if(fuma == 0){

						$("#SEL_RISC_TABAGISMO").val(fuma);
					}
					else
					{
						$("#SEL_RISC_TABAGISMO").val(rows.item(0)[["ANAM_TABAGISMO_ENUM"]]);
					}
					
				}, 
				null
			);
		});	
		db.transaction(function(perf) {
			perf.executeSql('SELECT CLIE_SEXO_ID FROM CLIENTE WHERE CLIE_ID =? ', [id_cliente], 
				function (perf,retorno_user_cad){
					var rows = retorno_user_cad.rows;
					sexo = rows.item(0)[["CLIE_SEXO_ID"]];
					localStorage.setItem("SEXO_CLIENTE", sexo);
					if(sexo == '1')
					{
						$("#cintura_masculina").show();
					}
					else
					{
						$("#cintura_feminina").show();
					}
					
				}, 
				null
			);
		});	
	}
	function mostrar_RISCO_cadastrada(id_cliente)
	{  

		iniciarRisco();
		console.log('mostrar_RISCO_cadastrada');				
		if(id_cliente!='')
		{
			$("#exibir_btn_risco").show();//MOSTRAR BOTAO PARA CADASTRO DO PAR-Q
			db.transaction(function(anmncli) {
				anmncli.executeSql('SELECT * FROM RISCO_CARDIOVASCULAR WHERE  RISCO_CLIE_ID=? ', [id_cliente], function (anmncli,retorno_listcli){
					var rows = retorno_listcli.rows;				
					var LISTA_RISCO = '';
					if(rows.length>0){
						for(var b = 0; b<rows.length; b++){	
										
							$('#RISCO_ID').val(rows[b].RISCO_ID);					  				
							$('#RISC_HERANCA_FAMILIAR_ENUM').val(rows.item(b)[["RISC_HERANCA_FAMILIAR_ENUM"]]);				
							$('#RISC_CIRC_CINTURA_MASCULINA_ENUM').val(rows.item(b)[["RISC_CIRC_CINTURA"]]);				
							$('#RISC_CIRC_CINTURA_FEMININA_ENUM').val(rows.item(b)[["RISC_CIRC_CINTURA"]]);							
							$('#RISC_ATIVIDADE_FISICA_SEMANAL_ENUM').val(rows.item(b)[["RISC_ATIVIDADE_FISICA_SEMANAL_ENUM"]]);				
							$('#RISC_COLESTEROL_ENUM').val(rows.item(b)[["RISC_COLESTEROL_ENUM"]]);	
							$('#RISC_PRESSAO_SISTOLICA_ENUM').val(rows.item(b)[["RISC_PRESSAO_SISTOLICA_ENUM"]]);	
							$('#RISC_PRESSAO_DIASTOLICA_ENUM').val(rows.item(b)[["RISC_PRESSAO_DIASTOLICA_ENUM"]]);														
																																																																															 
						}
					}

				}, null);
			});
		}				
	}

function cadastrar_RISCO(){	
	console.log('CADASTRAR RISCO');
	var RISC_CIRC_CINTURA = 0;
		var sexo = localStorage.getItem("SEXO_CLIENTE");
									
			var RISCO_CLIE_ID 			 	 		 		= localStorage.getItem('id_CLIENTE'); // VEM DO STORAGE EM CLIENTE.JS
			var RISCO_ID 			 				 	 	= $('#RISCO_id').val();	
			var RISC_HERANCA_FAMILIAR_ENUM 	 		= $('#RISC_HERANCA_FAMILIAR_ENUM').val();	
			var RISC_CIRC_CINTURA_MASCULINA_ENUM  		  	  	= $('#RISC_CIRC_CINTURA_MASCULINA_ENUM').val();
			var RISC_CIRC_CINTURA_FEMININA_ENUM 	= $('#RISC_CIRC_CINTURA_FEMININA_ENUM').val();	
			var RISC_ATIVIDADE_FISICA_SEMANAL_ENUM 	  			  	= $('#RISC_ATIVIDADE_FISICA_SEMANAL_ENUM').val();	
			var RISC_COLESTEROL_ENUM 	= $('#RISC_COLESTEROL_ENUM').val();	
			var RISC_PRESSAO_SISTOLICA_ENUM 		  	= $('#RISC_PRESSAO_SISTOLICA_ENUM').val();	
			var RISC_PRESSAO_DIASTOLICA_ENUM 	= $('#RISC_PRESSAO_DIASTOLICA_ENUM').val();	
					
			var RISCO_DATA= '';//ESSA COLUNA NAO EXISTE NO BANCO PARA CASO HAJA NECESSIDADE NO FUTURO			
			var RISCO_DATA 			 = new Date();
			var dia_RISCO    			 = RISCO_DATA.getDate(); 
			var mes_RISCO   			 = RISCO_DATA.getMonth();
			var ano_RISCO  			 = RISCO_DATA.getFullYear(); 	
			var str_data_RISCO 		 = dia_RISCO + '/' + (mes_RISCO+1) + '/' + ano_RISCO;
			RISCO_DATA 			 	 = str_data_RISCO;	

									
		  /*if(RISCO_FLAG_POSSUI_PROBLEMA_CARDIACO        ==''){ RISCO_FLAG_POSSUI_PROBLEMA_CARDIACO      =0; }
		  if(RISCO_FLAG_SENTE_DOR_EXERCICIO             ==''){ RISCO_FLAG_SENTE_DOR_EXERCICIO           =0; }
		  if(RISCO_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO   ==''){ RISCO_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO =0; }
		  if(RISCO_FLAG_PERDE_EQUILIBRIO                ==''){ RISCO_FLAG_PERDE_EQUILIBRIO              =0; }
		  if(RISCO_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA   ==''){ RISCO_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA =0; }
		  if(RISCO_FLAG_MEDICO_PRES_MEDICAMENTO         ==''){ RISCO_FLAG_MEDICO_PRES_MEDICAMENTO       =0; }
		  if(RISCO_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV   ==''){ RISCO_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV =0; }*/
							  							 
	db.transaction(function(RISCOq) {
			if(typeof RISCO_ID !== "undefined"){
				
				console.log("ID DA RISCO PASSADO = " +RISCO_ID);
				if(sexo == 1)
				{
					RISC_CIRC_CINTURA = $('#RISC_CIRC_CINTURA_MASCULINA_ENUM').val();
				}
				else
				{
					RISC_CIRC_CINTURA = $('#RISC_CIRC_CINTURA_FEMININA_ENUM').val();
				}
				RISCOq.executeSql('UPDATE RISCO_CARDIOVASCULAR SET  RISC_HERANCA_FAMILIAR_ENUM=?,  '+								
				' RISC_CIRC_CINTURA=?, '+
				' RISC_ATIVIDADE_FISICA_SEMANAL_ENUM=?, '+
				' RISC_COLESTEROL_ENUM=?, '+
				' RISC_PRESSAO_SISTOLICA_ENUM=?,'+
				' RISC_PRESSAO_DIASTOLICA_ENUM=?,'+		
				' RISCO_CLIE_ID=? '+
				' WHERE RISCO_ID=? ',
					[RISC_HERANCA_FAMILIAR_ENUM,
					RISC_CIRC_CINTURA,
					RISC_ATIVIDADE_FISICA_SEMANAL_ENUM,
					RISC_COLESTEROL_ENUM,
					RISC_PRESSAO_SISTOLICA_ENUM,
					RISC_PRESSAO_DIASTOLICA_ENUM,				
					RISCO_CLIE_ID,
					RISCO_ID],null);
										
					alert('Atualizado com sucesso.');
					window.location.href ='#pgn_listar_cliente';
					
			}else{
								
			RISCOq.executeSql('INSERT INTO RISCO_CARDIOVASCULAR ('+
							'RISC_HERANCA_FAMILIAR_ENUM,'+
							'RISC_CIRC_CINTURA,'+
							'RISC_ATIVIDADE_FISICA_SEMANAL_ENUM,'+
							'RISC_COLESTEROL_ENUM,'+
							'RISC_PRESSAO_SISTOLICA_ENUM,'+
							'RISC_PRESSAO_DIASTOLICA_ENUM,'+						
							'RISCO_CLIE_ID)'+
							'VALUES (?,?,?,?,?,?,?)',
							[RISC_HERANCA_FAMILIAR_ENUM,
							RISC_CIRC_CINTURA,
							RISC_ATIVIDADE_FISICA_SEMANAL_ENUM,
							RISC_COLESTEROL_ENUM,
							RISC_PRESSAO_SISTOLICA_ENUM,
							RISC_PRESSAO_DIASTOLICA_ENUM,						
							RISCO_CLIE_ID]);		
							
											
				
				//limpaCamposRISCO();
				
				alert('Cadastrado com sucesso.');
				window.location.href ='#pgn_listar_cliente';
		}
	});	
	//calcular_pontuacao(RISCO_CLIE_ID);	
	//}
	
}



	function limpaCamposRISCO()
	{
		console.log('limpar campos RISCO');
		localStorage.removeItem("SEXO_CLIENTE");
		$('#RISCO_id').val('');
		$('#RISC_HERANCA_FAMILIAR_ENUM').val('');
		$('#RISC_CIRC_CINTURA_MASCULINA_ENUM').val('');
		$('#RISC_CIRC_CINTURA_FEMININA_ENUM').val('');
		$('#RISC_ATIVIDADE_FISICA_SEMANAL_ENUM').val('');
		$('#RISC_COLESTEROL_ENUM').val('');
		$('#RISC_PRESSAO_SISTOLICA_ENUM').val('');
		$('#RISC_PRESSAO_DIASTOLICA_ENUM').val('');
		
		return;
	}