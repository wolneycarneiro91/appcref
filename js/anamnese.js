$(document).on("pageshow","#pgn_cadastrar_anamnese",function(){
	console.log('pagina anamnese carregada');
	limpaCamposanamnese();
	var id_cliente 	 = localStorage.getItem('id_CLIENTE'); // VEM DO STORAGE EM CLIENTE.JS
	if(id_cliente!=''){
		mostrar_anamnese_cadastrada(id_cliente);
		
	}
});

	function mostrar_anamnese_cadastrada(id_cliente){  
		console.log('mostrar_anamnese_cadastrada');				
			if(id_cliente!=''){
			
			//MOSTRAR BOTAO PARA CADASTRO DO PAR-Q
				db.transaction(function(anmncli) {
					anmncli.executeSql('SELECT * FROM anamnese WHERE  ANAM_CLIE_ID=? ', [id_cliente], function (anmncli,retorno_listcli){
						var rows = retorno_listcli.rows;				
						var LISTA_anamnese = '';
						if(rows.length>0){
							$(".exibir_parq").show();
							}
						for(var a = 0; a<rows.length; a++)
						{			
							$('#ANAM_ID').val(rows.item(a)[["ANAM_ID"]]);					
						//	$('#ANAM_FLAG_POSSUI_PATOLOGIA').val(rows.item(a)[["ANAM_FLAG_POSSUI_PATOLOGIA"]]); 
							if(rows.item(a)[["ANAM_FLAG_POSSUI_PATOLOGIA"]] == 1)
							{
								$("#ANAM_FLAG_POSSUI_PATOLOGIA[value='1']").prop('checked', true);
								$('#id_quais_patologias').show();
							}   				
							$('#ANAM_PATOLOGIA').val(rows.item(a)[["ANAM_PATOLOGIA"]]);				
							//$('#ANAM_FLAG_USA_MEDICACAO').val(rows.item(a)[["ANAM_FLAG_USA_MEDICACAO"]]);
							if(rows.item(a)[["ANAM_FLAG_USA_MEDICACAO"]] == 1)
							{
								$("#ANAM_FLAG_USA_MEDICACAO[value='1']").prop('checked', true);
								$('#id_quais_medicamentos').show();
							}  				
							$('#ANAM_MEDICACAO').val(rows.item(a)[["ANAM_MEDICACAO"]]);				
						//	$('#ANAM_FLAG_CIRURGIA_FRATURA').val(rows.item(a)[["ANAM_FLAG_CIRURGIA_FRATURA"]]);	
							if(rows.item(a)[["ANAM_FLAG_CIRURGIA_FRATURA"]] == 1)
							{
								$("#ANAM_FLAG_CIRURGIA_FRATURA[value='1']").prop('checked', true);
								$('#id_qual_tipo_fratura').show();
							}  			
							$('#ANAM_CIRURGIA_FRATURA').val(rows.item(a)[["ANAM_CIRURGIA_FRATURA"]]);				
							//$('#ANAM_FLAG_RELATA_DOR').val(rows.item(a)[["ANAM_FLAG_RELATA_DOR"]]);	
							if(rows.item(a)[["ANAM_FLAG_RELATA_DOR"]] == 1)
							{
								$("#ANAM_FLAG_RELATA_DOR[value='1']").prop('checked', true);
								$('#id_qual_dor').show();
							}  			
							$('#ANAM_DOR').val(rows.item(a)[["ANAM_DOR"]]);				
							///$('#ANAM_FLAG_HABITO_FUMAR').val(rows.item(a)[["ANAM_FLAG_HABITO_FUMAR"]]);	
							if(rows.item(a)[["ANAM_FLAG_HABITO_FUMAR"]] == 1)
							{
								$("#ANAM_FLAG_HABITO_FUMAR[value='1']").prop('checked', true);
								$('#id_select_fumo').show();
							}  			
							$('#ANAM_TABAGISMO_ENUM').val(rows.item(a)[["ANAM_TABAGISMO_ENUM"]]);				
							//$('#ANAM_FLAG_POSSUI_ALERGIA').val(rows.item(a)[["ANAM_FLAG_POSSUI_ALERGIA"]]);	
							if(rows.item(a)[["ANAM_FLAG_POSSUI_ALERGIA"]] == 1)
							{
								$("#ANAM_FLAG_POSSUI_ALERGIA[value='1']").prop('checked', true);
								$('#id_qual_alergia').show();
							}  			
							$('#ANAM_ALERGIA').val(rows.item(a)[["ANAM_ALERGIA"]]);				
							$('#ANAM_TIPO_ALIMENTACAO').val(rows.item(a)[["ANAM_TIPO_ALIMENTACAO"]]);				
							$('#ANAM_ATIVIDADE_FISICA').val(rows.item(a)[["ANAM_ATIVIDADE_FISICA"]]);				
							$('#ANAM_COMPORTAMENTO_SEDENTARIO').val(rows.item(a)[["ANAM_COMPORTAMENTO_SEDENTARIO"]]);				
							$('#ANAM_QUAL_OBJETIVO').val(rows.item(a)[["ANAM_QUAL_OBJETIVO"]]);				
							//$('#ANAM_FLAG_PARENTE_DIABETE').val(rows.item(a)[["ANAM_FLAG_PARENTE_DIABETE"]]);	
							if(rows.item(a)[["ANAM_FLAG_PARENTE_DIABETE"]] == 1)
							{
								$("#ANAM_FLAG_PARENTE_DIABETE[value='1']").prop('checked', true);
								$('#id_diabete').show();
							}  			
							$('#ANAM_PARENTE_DIABETE').val(rows.item(a)[["ANAM_PARENTE_DIABETE"]]);				
							//$('#ANAM_FLAG_PARENTE_DAC').val(rows.item(a)[["ANAM_FLAG_PARENTE_DAC"]]);
							if(rows.item(a)[["ANAM_FLAG_PARENTE_DAC"]] == 1)
							{
								$("#ANAM_FLAG_PARENTE_DAC[value='1']").prop('checked', true);
								$('#id_quem_DAC').show();			
							}  				
							$('#ANAM_PARENTE_DAC').val(rows.item(a)[["ANAM_PARENTE_DAC"]]);				
							//$('#ANAM_FLAG_PARENTE_AVC').val(rows.item(a)[["ANAM_FLAG_PARENTE_AVC"]]);	
							if(rows.item(a)[["ANAM_FLAG_PARENTE_AVC"]] == 1)
							{
								$("#ANAM_FLAG_PARENTE_AVC[value='1']").prop('checked', true);
								$('#id_quem_AVC').show();
							}  			
							$('#ANAM_PARENTE_AVC').val(rows.item(a)[["ANAM_PARENTE_AVC"]]);				
							//$('#ANAM_FLAG_PARENTE_IAM').val(rows.item(a)[["ANAM_FLAG_PARENTE_IAM"]]);
							if(rows.item(a)[["ANAM_FLAG_PARENTE_IAM"]] == 1)
							{
								$("#ANAM_FLAG_PARENTE_IAM[value='1']").prop('checked', true);
								$('#id_quem_MIOC').show();
							}  				
							$('#ANAM_PARENTE_IAM').val(rows.item(a)[["ANAM_PARENTE_IAM"]]);				
																																																																															 
						}											

					}, null);
				});
			}				
	}

function cadastrar_anamnese(){	
	console.log('cadastrar_anamnese');
				
	if(
		!validaTextArea('ANAM_TIPO_ALIMENTACAO')||
		!validaTextArea('ANAM_ATIVIDADE_FISICA')||
		!validaTextArea('ANAM_COMPORTAMENTO_SEDENTARIO')||
		!validaTextArea('ANAM_QUAL_OBJETIVO')			
	
	){
	
		alert("Os campos com * são obrigatórios");
	}else{
									
			var ANAM_CLIE_ID 			 	  = localStorage.getItem('id_CLIENTE'); // VEM DO STORAGE EM CLIENTE.JS
			var ANAM_ID 			 		  = document.getElementById('ANAM_ID').value;	
			var ANAM_FLAG_POSSUI_PATOLOGIA 	  = getRadioValor('ANAM_FLAG_POSSUI_PATOLOGIA');    
			var ANAM_PATOLOGIA  		  	  = document.getElementById('ANAM_PATOLOGIA').value;
			var ANAM_FLAG_USA_MEDICACAO 	  = getRadioValor('ANAM_FLAG_USA_MEDICACAO');
			var ANAM_MEDICACAO 	  			  = document.getElementById('ANAM_MEDICACAO').value;
			var ANAM_FLAG_CIRURGIA_FRATURA 	  = getRadioValor('ANAM_FLAG_CIRURGIA_FRATURA');
			var ANAM_CIRURGIA_FRATURA 		  = document.getElementById('ANAM_CIRURGIA_FRATURA').value;
			var ANAM_FLAG_RELATA_DOR 		  = getRadioValor('ANAM_FLAG_RELATA_DOR');
			var ANAM_DOR 			  		  = document.getElementById('ANAM_DOR').value;
			var ANAM_FLAG_HABITO_FUMAR 	 	  = getRadioValor('ANAM_FLAG_HABITO_FUMAR');
			var ANAM_TABAGISMO_ENUM 	  	  = document.getElementById('ANAM_TABAGISMO_ENUM').value;
			var ANAM_FLAG_POSSUI_ALERGIA 	  = getRadioValor('ANAM_FLAG_POSSUI_ALERGIA');
			var ANAM_ALERGIA 	  			  = document.getElementById('ANAM_ALERGIA').value;
			var ANAM_TIPO_ALIMENTACAO 	 	  = document.getElementById('ANAM_TIPO_ALIMENTACAO').value;
			var ANAM_ATIVIDADE_FISICA 	      = document.getElementById('ANAM_ATIVIDADE_FISICA').value;
			var ANAM_COMPORTAMENTO_SEDENTARIO = document.getElementById('ANAM_COMPORTAMENTO_SEDENTARIO').value;
			var ANAM_QUAL_OBJETIVO 	  		  = document.getElementById('ANAM_QUAL_OBJETIVO').value;
			var ANAM_FLAG_PARENTE_DIABETE 	  = getRadioValor('ANAM_FLAG_PARENTE_DIABETE');
			var ANAM_PARENTE_DIABETE 	 	  = document.getElementById('ANAM_PARENTE_DIABETE').value;
			var ANAM_FLAG_PARENTE_DAC 	 	  = getRadioValor('ANAM_FLAG_PARENTE_DAC');
			var ANAM_PARENTE_DAC 	 		  = document.getElementById('ANAM_PARENTE_DAC').value;
			var ANAM_FLAG_PARENTE_AVC 	 	  = getRadioValor('ANAM_FLAG_PARENTE_AVC');
			var ANAM_PARENTE_AVC 	 		  = document.getElementById('ANAM_PARENTE_AVC').value;
			var ANAM_FLAG_PARENTE_IAM 	  	  = getRadioValor('ANAM_FLAG_PARENTE_IAM');
			var ANAM_PARENTE_IAM 	  		  = document.getElementById('ANAM_PARENTE_IAM').value;			
			var ANAN_DATA= '';//ESSA COLUNA NAO EXISTE NO BANCO PARA CASO HAJA NECESSIDADE NO FUTURO			
			var ANAN_DATA 			 = new Date();
			var dia_anam    			 = ANAN_DATA.getDate(); 
			var mes_anam   			 = ANAN_DATA.getMonth();
			var ano_anam  			 = ANAN_DATA.getFullYear(); 	
			var str_data_anam 		 = dia_anam + '/' + (mes_anam+1) + '/' + ano_anam;
			ANAN_DATA 			 	 = str_data_anam;	

		if(!ANAM_TABAGISMO_ENUM){
			
			ANAM_TABAGISMO_ENUM ="0";
			
		}

	db.transaction(function(anam) {
			if(ANAM_ID!=''){
				
				console.log("ID DA ANAMNESE PASSADO = " +ANAM_ID);
		
				anam.executeSql('UPDATE ANAMNESE SET  ANAM_FLAG_POSSUI_PATOLOGIA=?,  '+								
				' ANAM_PATOLOGIA=?, '+
				' ANAM_FLAG_USA_MEDICACAO=?, '+
				' ANAM_MEDICACAO=?, '+
				' ANAM_FLAG_CIRURGIA_FRATURA=?,'+
				' ANAM_CIRURGIA_FRATURA=?,'+
				' ANAM_FLAG_RELATA_DOR=?,'+
				' ANAM_DOR=?,'+
				' ANAM_FLAG_HABITO_FUMAR=?,'+
				' ANAM_TABAGISMO_ENUM=?,'+
				' ANAM_FLAG_POSSUI_ALERGIA=?,'+
				' ANAM_ALERGIA=?,'+
				' ANAM_TIPO_ALIMENTACAO=?,'+
				' ANAM_ATIVIDADE_FISICA=?,'+
				' ANAM_COMPORTAMENTO_SEDENTARIO=?,'+
				' ANAM_QUAL_OBJETIVO=?,'+
				' ANAM_FLAG_PARENTE_DIABETE=?,'+
				' ANAM_PARENTE_DIABETE=?,'+
				' ANAM_FLAG_PARENTE_DAC=?,'+
				' ANAM_PARENTE_DAC=?,'+
				' ANAM_FLAG_PARENTE_AVC=?,'+
				' ANAM_PARENTE_AVC=?,'+
				' ANAM_FLAG_PARENTE_IAM=?,'+
				' ANAM_PARENTE_IAM=?,'+
				' ANAM_CLIE_ID=? '+
				' WHERE ANAM_ID=? ',
					[ANAM_FLAG_POSSUI_PATOLOGIA,
					ANAM_PATOLOGIA,
					ANAM_FLAG_USA_MEDICACAO,
					ANAM_MEDICACAO,
					ANAM_FLAG_CIRURGIA_FRATURA,
					ANAM_CIRURGIA_FRATURA,
					ANAM_FLAG_RELATA_DOR,
					ANAM_DOR,
					ANAM_FLAG_HABITO_FUMAR,
					ANAM_TABAGISMO_ENUM,
					ANAM_FLAG_POSSUI_ALERGIA,
					ANAM_ALERGIA,
					ANAM_TIPO_ALIMENTACAO,
					ANAM_ATIVIDADE_FISICA,
					ANAM_COMPORTAMENTO_SEDENTARIO,
					ANAM_QUAL_OBJETIVO,
					ANAM_FLAG_PARENTE_DIABETE,
					ANAM_PARENTE_DIABETE,
					ANAM_FLAG_PARENTE_DAC,
					ANAM_PARENTE_DAC,
					ANAM_FLAG_PARENTE_AVC,
					ANAM_PARENTE_AVC,
					ANAM_FLAG_PARENTE_IAM,
					ANAM_PARENTE_IAM,
					ANAM_CLIE_ID,
					ANAM_ID],null);
										
					alert('Atualizado com sucesso.');
					window.location.href ='#pgn_listar_cliente';
					
			}else{
								
			anam.executeSql('INSERT INTO ANAMNESE ('+
							'ANAM_FLAG_POSSUI_PATOLOGIA,'+
							'ANAM_PATOLOGIA,'+
							'ANAM_FLAG_USA_MEDICACAO,'+
							'ANAM_MEDICACAO,'+
							'ANAM_FLAG_CIRURGIA_FRATURA,'+
							'ANAM_CIRURGIA_FRATURA,'+
							'ANAM_FLAG_RELATA_DOR,'+
							'ANAM_DOR,'+
							'ANAM_FLAG_HABITO_FUMAR,'+
							'ANAM_TABAGISMO_ENUM,'+
							'ANAM_FLAG_POSSUI_ALERGIA,'+
							'ANAM_ALERGIA,'+
							'ANAM_TIPO_ALIMENTACAO,'+
							'ANAM_ATIVIDADE_FISICA,'+
							'ANAM_COMPORTAMENTO_SEDENTARIO,'+
							'ANAM_QUAL_OBJETIVO,'+
							'ANAM_FLAG_PARENTE_DIABETE,'+
							'ANAM_PARENTE_DIABETE,'+
							'ANAM_FLAG_PARENTE_DAC,'+
							'ANAM_PARENTE_DAC,'+
							'ANAM_FLAG_PARENTE_AVC,'+
							'ANAM_PARENTE_AVC,'+
							'ANAM_FLAG_PARENTE_IAM,'+
							'ANAM_PARENTE_IAM,'+
							'ANAM_CLIE_ID)'+
							'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
							[ANAM_FLAG_POSSUI_PATOLOGIA,
							ANAM_PATOLOGIA,
							ANAM_FLAG_USA_MEDICACAO,
							ANAM_MEDICACAO,
							ANAM_FLAG_CIRURGIA_FRATURA,
							ANAM_CIRURGIA_FRATURA,
							ANAM_FLAG_RELATA_DOR,
							ANAM_DOR,
							ANAM_FLAG_HABITO_FUMAR,
							ANAM_TABAGISMO_ENUM,
							ANAM_FLAG_POSSUI_ALERGIA,
							ANAM_ALERGIA,
							ANAM_TIPO_ALIMENTACAO,
							ANAM_ATIVIDADE_FISICA,
							ANAM_COMPORTAMENTO_SEDENTARIO,
							ANAM_QUAL_OBJETIVO,
							ANAM_FLAG_PARENTE_DIABETE,
							ANAM_PARENTE_DIABETE,
							ANAM_FLAG_PARENTE_DAC,
							ANAM_PARENTE_DAC,
							ANAM_FLAG_PARENTE_AVC,
							ANAM_PARENTE_AVC,
							ANAM_FLAG_PARENTE_IAM,
							ANAM_PARENTE_IAM,
							ANAM_CLIE_ID]);		
				
				limpaCamposanamnese();
				alert('Cadastrado com sucesso.');
				//window.location.href ='#pgn_listar_cliente';
				window.location.href ='#pgn_cadastrar_parq';
		}
	});	
		
	}
	
}

	function limpaCamposanamnese(){
		
		//$('#ANAM_FLAG_POSSUI_PATOLOGIA').val('');   		
		$('#ANAM_PATOLOGIA').val('');		
		//$('#ANAM_FLAG_USA_MEDICACAO').val('');		
		$('#ANAM_MEDICACAO').val('');		
		//$('#ANAM_FLAG_CIRURGIA_FRATURA').val('');		
		$('#ANAM_CIRURGIA_FRATURA').val('');		
		//$('#ANAM_FLAG_RELATA_DOR').val('');		
		$('#ANAM_DOR').val('');
		//$('#ANAM_FLAG_HABITO_FUMAR').val('');
		$('#ANAM_TABAGISMO_ENUM').val('');
	//	$('#ANAM_FLAG_POSSUI_ALERGIA').val('');
		$('#ANAM_ALERGIA').val('');
		$('#ANAM_TIPO_ALIMENTACAO').val('');
		$('#ANAM_ATIVIDADE_FISICA').val('');
		$('#ANAM_COMPORTAMENTO_SEDENTARIO').val('');
		$('#ANAM_QUAL_OBJETIVO').val('');
		//$('#ANAM_FLAG_PARENTE_DIABETE').val('');
		$('#ANAM_PARENTE_DIABETE').val('');
		//$('#ANAM_FLAG_PARENTE_DAC').val('');
		$('#ANAM_PARENTE_DAC').val('');
		//$('#ANAM_FLAG_PARENTE_AVC').val('');
		$('#ANAM_PARENTE_AVC').val('');
		//$('#ANAM_FLAG_PARENTE_IAM').val('');
		$('#ANAM_PARENTE_IAM').val('');
		$("#ANAM_FLAG_POSSUI_PATOLOGIA[value='0']").prop('checked', true);
		$("#ANAM_FLAG_USA_MEDICACAO[value='0']").prop('checked', true);
		$("#ANAM_FLAG_CIRURGIA_FRATURA[value='0']").prop('checked', true);
		$("#ANAM_FLAG_RELATA_DOR[value='0']").prop('checked', true);
		$("#ANAM_FLAG_HABITO_FUMAR[value='0']").prop('checked', true);
		$("#ANAM_FLAG_POSSUI_ALERGIA[value='0']").prop('checked', true);
		$("#ANAM_FLAG_PARENTE_DIABETE[value='0']").prop('checked', true);
		$("#ANAM_FLAG_PARENTE_DAC[value='0']").prop('checked', true);
		$("#ANAM_FLAG_PARENTE_AVC[value='0']").prop('checked', true);
		$("#ANAM_FLAG_PARENTE_IAM[value='0']").prop('checked', true);
		$('#id_quais_patologias').hide();
		$('#id_quais_medicamentos').hide();
		$('#id_qual_tipo_fratura').hide();
		$('#id_qual_dor').hide();
		$('#id_qual_alergia').hide();
		$('#id_diabete').hide();
		$('#id_quem_DAC').hide();	
		$('#id_quem_AVC').hide();
		$('#id_quem_MIOC').hide();
		$('#id_select_fumo').hide();
	}