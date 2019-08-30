$(document).on("pageshow","#pgn_avaliacao",function(){

	iniciarPaginaAvaliacao();
	
});
function iniciarPaginaAvaliacao()
{  
	localStorage.removeItem("valorAnamese");
	localStorage.removeItem("valorParq");
	localStorage.removeItem("valorRisco");
	$("#pgn_avaliacao_anamnese").html("");
	$("#pgn_avaliacao_parq").html("");
	$("#pgn_avaliacao_risco").html("");
	$("#pgn_avaliacao_conduta").html("");
	$("#pgn_avaliacao_status").html("");
	var valorAnamese = 0;
	var valorParq = 0;
	var valorRisco = 0;
	var id_cliente 	 = localStorage.getItem('id_CLIENTE'); 
	var sql1 = 'SELECT ANAM_ID,ANAM_CLIE_ID,ANAM_FLAG_POSSUI_PATOLOGIA,ANAM_FLAG_USA_MEDICACAO,ANAM_FLAG_CIRURGIA_FRATURA,'+
		'ANAM_FLAG_RELATA_DOR,ANAM_FLAG_HABITO_FUMAR, ANAM_FLAG_POSSUI_ALERGIA,ANAM_FLAG_PARENTE_DIABETE,'+
		'ANAM_FLAG_PARENTE_DAC,ANAM_FLAG_PARENTE_AVC,ANAM_FLAG_PARENTE_IAM '+
		'FROM ANAMNESE  WHERE  ANAM_CLIE_ID='+id_cliente;
		console.log(sql1);
	db.transaction(function(anmncli) {
		anmncli.executeSql(sql1, null, function (anmncli,retorno_listcli){
			var rows = retorno_listcli.rows;	
			if(rows.length>0)
			{
				for(var z = 0; z<rows.length; z++)
				{
					valorAnamese += rows.item(z)[["ANAM_FLAG_POSSUI_PATOLOGIA"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_USA_MEDICACAO"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_CIRURGIA_FRATURA"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_RELATA_DOR"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_HABITO_FUMAR"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_POSSUI_ALERGIA"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_PARENTE_DIABETE"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_PARENTE_DAC"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_PARENTE_AVC"]];
					valorAnamese += rows.item(z)[["ANAM_FLAG_PARENTE_IAM"]];
					localStorage.setItem("valorAnamese",valorAnamese);
				}
			}
		}, null);
	});
	var sql2 = 'SELECT PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO,PARQ_FLAG_SENTE_DOR_EXERCICIO, PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO,'+
			'PARQ_FLAG_PERDE_EQUILIBRIO,PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA,PARQ_FLAG_MEDICO_PRES_MEDICAMENTO,'+
			'PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV '+
			'FROM PARQ  WHERE  PARQ_CLIE_ID= ' + id_cliente;
	console.log(sql2);
	db.transaction(function(anmncli) {
		anmncli.executeSql(sql2, null, function (anmncli,retorno_listcli){
			var rows = retorno_listcli.rows;	
			if(rows.length>0)
			{
				for(var z = 0; z<rows.length; z++)
				{
					valorParq += rows.item(z)[["PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO"]];
					valorParq += rows.item(z)[["PARQ_FLAG_SENTE_DOR_EXERCICIO"]];
					valorParq += rows.item(z)[["PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO"]];
					valorParq += rows.item(z)[["PARQ_FLAG_PERDE_EQUILIBRIO"]];
					valorParq += rows.item(z)[["PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA"]];
					valorParq += rows.item(z)[["PARQ_FLAG_MEDICO_PRES_MEDICAMENTO"]];
					valorParq += rows.item(z)[["PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV"]];
					localStorage.setItem("valorParq",valorParq);
				}
			}
		}, null);
	});
	var sql3 = 'SELECT CLIENTE.CLIE_ID,(date() - CLIENTE.CLIE_DATA_NASCIMENTO ) AS IDADE_CLIENTE,'+
					  'RISCO_CARDIOVASCULAR.RISC_HERANCA_FAMILIAR_ENUM AS QUANTIDADE_PARENTE_CARDIO,'+
					  'CLIENTE.CLIE_SEXO_ID AS SEXO_DO_CLIENTE,'+
					  'RISCO_CARDIOVASCULAR.RISC_CIRC_CINTURA AS CIRCUFERENCIA_CINTURA,'+
					  'ANAMNESE.ANAM_TABAGISMO_ENUM AS QUANTIDADE_CIGARROS,'+
					  'RISCO_CARDIOVASCULAR.RISC_ATIVIDADE_FISICA_SEMANAL_ENUM AS QUANTIDADE_ATIVIDADE_FISICA,'+
					  'RISCO_CARDIOVASCULAR.RISC_COLESTEROL_ENUM AS QUANTIDADE_COLESTEROL,'+
					  'RISCO_CARDIOVASCULAR.RISC_PRESSAO_SISTOLICA_ENUM AS QUANTIDADE_PRESSAO_SISTOLICA,'+
					  'RISCO_CARDIOVASCULAR.RISC_PRESSAO_DIASTOLICA_ENUM AS QUANTIDADE_PRESSAO_DIASTOLICA_ '+
					  'FROM CLIENTE  '+
					  'INNER JOIN RISCO_CARDIOVASCULAR ON RISCO_CARDIOVASCULAR.RISCO_CLIE_ID = CLIENTE.CLIE_ID '+
					  'INNER JOIN ANAMNESE ON ANAMNESE.ANAM_CLIE_ID = CLIENTE.CLIE_ID'+
					 ' WHERE  CLIENTE.CLIE_ID=  '+id_cliente+
					 ' ORDER BY RISCO_CARDIOVASCULAR.RISC_ID DESC '+
					 'LIMIT 1 ';
					 console.log(sql3);
	db.transaction(function(cons_calc) {
	cons_calc.executeSql(sql3, null, function (cons_calc,retorno_calculo){
					var rows = retorno_calculo.rows;
					var TOTAL1 =0;										
					var TOTAL2 =0;										
					var TOTAL_GERAL =0;										
					if(rows.length>0){
							var IDADE_CLIENTE 				   = rows.item(0)[["IDADE_CLIENTE"]]; //SERA IDADE_ENUM incluir no banco na insercao
							var QUANTIDADE_PARENTE_CARDIO 	   = rows.item(0)[["QUANTIDADE_PARENTE_CARDIO"]];
							var SEXO_DO_CLIENTE 			   = rows.item(0)[["SEXO_DO_CLIENTE"]];
							var CIRCUFERENCIA_CINTURA 		   = rows.item(0)[["CIRCUFERENCIA_CINTURA"]];
							var QUANTIDADE_CIGARROS 		   = rows.item(0)[["QUANTIDADE_CIGARROS"]];
							var QUANTIDADE_ATIVIDADE_FISICA    = rows.item(0)[["QUANTIDADE_ATIVIDADE_FISICA"]];
							var QUANTIDADE_COLESTEROL 		   = rows.item(0)[["QUANTIDADE_COLESTEROL"]];
							var QUANTIDADE_PRESSAO_SISTOLICA   = rows.item(0)[["QUANTIDADE_PRESSAO_SISTOLICA"]];
							var QUANTIDADE_PRESSAO_DIASTOLICA_ = rows.item(0)[["QUANTIDADE_PRESSAO_DIASTOLICA_"]];	
				var PONTO_IDADE = 0;
				
				
					if(IDADE_CLIENTE >= 10 && IDADE_CLIENTE <= 20)
					{
						PONTO_IDADE  = (0);
					}
					if(IDADE_CLIENTE >= 21 && IDADE_CLIENTE <= 30)
					{
						PONTO_IDADE  = (1);
					}
					if(IDADE_CLIENTE >= 31 && IDADE_CLIENTE <= 40)
					{
						PONTO_IDADE  = (2);
					}
					if(IDADE_CLIENTE >= 41 && IDADE_CLIENTE <= 50)
					{
						PONTO_IDADE  = (3);
					}
					if(IDADE_CLIENTE >= 51 && IDADE_CLIENTE <= 60)
					{
						PONTO_IDADE  = (4);
					}
					if(IDADE_CLIENTE >= 61 && IDADE_CLIENTE <= 70)
					{
						PONTO_IDADE  = (5);
					}				
							
				TOTAL1 = parseInt(PONTO_IDADE+QUANTIDADE_PARENTE_CARDIO+SEXO_DO_CLIENTE);
				TOTAL2 = parseInt(TOTAL1+CIRCUFERENCIA_CINTURA+QUANTIDADE_CIGARROS+QUANTIDADE_ATIVIDADE_FISICA);
				TOTAL_GERAL = parseInt(TOTAL2+QUANTIDADE_COLESTEROL+QUANTIDADE_PRESSAO_SISTOLICA+QUANTIDADE_PRESSAO_DIASTOLICA_);
					if(TOTAL_GERAL>=5 && TOTAL_GERAL<=11){
							console.log('Risco bem abaixo da média');
							valorRisco = 0;
						
						}
						if(TOTAL_GERAL>12 && TOTAL_GERAL<=17){
							console.log('Risco abaixo da média');
							valorRisco = 1;
						
						}
						if(TOTAL_GERAL>17 && TOTAL_GERAL<=24){
							console.log('Risco médio habitual');
							valorRisco = 2;
						
						}	
						if(TOTAL_GERAL>24 && TOTAL_GERAL<=31){
							console.log('Risco moderado');
							valorRisco = 3;
						
						}
						if(TOTAL_GERAL>31 && TOTAL_GERAL<=40){
							console.log('Risco perigoso');
							valorRisco = 4;
						
						}	
						if(TOTAL_GERAL>40 && TOTAL_GERAL<=63){
							console.log('Risco urgente - procure seu médico');
							valorRisco = 5;
						}	
						localStorage.setItem("valorRisco",valorRisco);				
				
					}

				}, null);
			});
	var a = localStorage.getItem("valorAnamese");
	var p = localStorage.getItem("valorParq");
	var r = localStorage.getItem("valorRisco")
	if(a == 0 && p == 0 && r <= 1)
	{
		$("#pgn_avaliacao_anamnese").html("<h5>Anamnese</h5> Sem relatos de saúde importantes");
		$("#pgn_avaliacao_parq").html("<h5>PAR-Q</h5> Com respostas negativas para todas as questões");
		$("#pgn_avaliacao_risco").html("<h5>Risco Cardiovascular</h5> Classificado como abaixo da média ou bem abaixo da média");
		$("#pgn_avaliacao_conduta").html("<h5>Conduta do profissional de Educação Física</h5> Início imediato do programa de atividades físicas de moderada intensidade.");
		$("#pgn_avaliacao_status").html("<h5>Status</h5> Liberado para atividade física");
	}
	else if((a <= 2 || r <= 2) && (p <= 1 ))
	{
		$("#pgn_avaliacao_anamnese").html("<h5>Anamnese</h5> Com poucos relatos de saúde importantes");
		$("#pgn_avaliacao_parq").html("<h5>PAR-Q</h5> Com pelo menos uma questão com resposta positiva");
		$("#pgn_avaliacao_risco").html("<h5>Risco Cardiovascular</h5> Classificado como médio habitual");
		$("#pgn_avaliacao_conduta").html("<h5>Conduta do profissional de Educação Física</h5> Iníciodo programa de atividade física de baixa intensidade e encaminhamento para avaliação médica conforme necessidade observada na avaliação. O profissional de Educação Física deverá estabelecer um prazo para que o atestado médico, bem como os resultados dos exames sejam apresentados.");
		$("#pgn_avaliacao_status").html("<h5>Status</h5> Liberado para atividade física com restrições");
	}
	else
	{
		$("#pgn_avaliacao_anamnese").html("<h5>Anamnese</h5> com muitos relatos de saúde importantes");
		$("#pgn_avaliacao_parq").html("<h5>PAR-Q</h5> Com duas ou mais questões com respostas positivas");
		$("#pgn_avaliacao_risco").html("<h5>Risco</h5> Cardiovascular classificado como moderado ou perigoso");
		$("#pgn_avaliacao_conduta").html("<h5>Conduta do profissional de Educação Física</h5> Não iniciar as atividades físicas até que seja apresentado atestado médico e resultados de exames solicitados.");
		$("#pgn_avaliacao_status").html("<h5>Status</h5> Não liberado para prática de atividade física");
	}
	$("#h1_avaliacao").html("<center>Avaliação</center>");
}
function calcular_pontuacao(id_cliente_r)
{
	var sql = 'SELECT CLIENTE.CLIE_ID,(date() - CLIENTE.CLIE_DATA_NASCIMENTO ) AS IDADE_CLIENTE,'+
					  'RISCO_CARDIOVASCULAR.RISC_HERANCA_FAMILIAR_ENUM AS QUANTIDADE_PARENTE_CARDIO,'+
					  'CLIENTE.CLIE_SEXO_ID AS SEXO_DO_CLIENTE,'+
					  'RISCO_CARDIOVASCULAR.RISC_CIRC_CINTURA AS CIRCUFERENCIA_CINTURA,'+
					  'ANAMNESE.ANAM_TABAGISMO_ENUM AS QUANTIDADE_CIGARROS,'+
					  'RISCO_CARDIOVASCULAR.RISC_ATIVIDADE_FISICA_SEMANAL_ENUM AS QUANTIDADE_ATIVIDADE_FISICA,'+
					  'RISCO_CARDIOVASCULAR.RISC_COLESTEROL_ENUM AS QUANTIDADE_COLESTEROL,'+
					  'RISCO_CARDIOVASCULAR.RISC_PRESSAO_SISTOLICA_ENUM AS QUANTIDADE_PRESSAO_SISTOLICA,'+
					  'RISCO_CARDIOVASCULAR.RISC_PRESSAO_DIASTOLICA_ENUM AS QUANTIDADE_PRESSAO_DIASTOLICA_ '+
					  'FROM CLIENTE  '+
					  'INNER JOIN RISCO_CARDIOVASCULAR ON RISCO_CARDIOVASCULAR.RISCO_CLIE_ID = CLIENTE.CLIE_ID '+
					  'INNER JOIN ANAMNESE ON ANAMNESE.ANAM_CLIE_ID = CLIENTE.CLIE_ID'+
					 ' WHERE  CLIENTE.CLIE_ID=?  '+
					 'ORDER BY RISCO_CARDIOVASCULAR.RISC_ID DESC '+
					 'LIMIT 1 ';
					 console.log(sql);
	db.transaction(function(cons_calc) {
	cons_calc.executeSql(sql, [id_cliente_r], function (cons_calc,retorno_calculo){
					var rows = retorno_calculo.rows;
					var TOTAL1 =0;										
					var TOTAL2 =0;										
					var TOTAL_GERAL =0;										
					if(rows.length>0){
							var IDADE_CLIENTE 				   = rows.item(0)[["IDADE_CLIENTE"]]; //SERA IDADE_ENUM incluir no banco na insercao
							var QUANTIDADE_PARENTE_CARDIO 	   = rows.item(0)[["QUANTIDADE_PARENTE_CARDIO"]];
							var SEXO_DO_CLIENTE 			   = rows.item(0)[["SEXO_DO_CLIENTE"]];
							var CIRCUFERENCIA_CINTURA 		   = rows.item(0)[["CIRCUFERENCIA_CINTURA"]];
							var QUANTIDADE_CIGARROS 		   = rows.item(0)[["QUANTIDADE_CIGARROS"]];
							var QUANTIDADE_ATIVIDADE_FISICA    = rows.item(0)[["QUANTIDADE_ATIVIDADE_FISICA"]];
							var QUANTIDADE_COLESTEROL 		   = rows.item(0)[["QUANTIDADE_COLESTEROL"]];
							var QUANTIDADE_PRESSAO_SISTOLICA   = rows.item(0)[["QUANTIDADE_PRESSAO_SISTOLICA"]];
							var QUANTIDADE_PRESSAO_DIASTOLICA_ = rows.item(0)[["QUANTIDADE_PRESSAO_DIASTOLICA_"]];	
				var PONTO_IDADE = 0;
				
				
					if(IDADE_CLIENTE >= 10 && IDADE_CLIENTE <= 20)
					{
						PONTO_IDADE  = (0);
					}
					if(IDADE_CLIENTE >= 21 && IDADE_CLIENTE <= 30)
					{
						PONTO_IDADE  = (1);
					}
					if(IDADE_CLIENTE >= 31 && IDADE_CLIENTE <= 40)
					{
						PONTO_IDADE  = (2);
					}
					if(IDADE_CLIENTE >= 41 && IDADE_CLIENTE <= 50)
					{
						PONTO_IDADE  = (3);
					}
					if(IDADE_CLIENTE >= 51 && IDADE_CLIENTE <= 60)
					{
						PONTO_IDADE  = (4);
					}
					if(IDADE_CLIENTE >= 61 && IDADE_CLIENTE <= 70)
					{
						PONTO_IDADE  = (5);
					}				
							
				TOTAL1 = parseInt(PONTO_IDADE+QUANTIDADE_PARENTE_CARDIO+SEXO_DO_CLIENTE);
				TOTAL2 = parseInt(TOTAL1+CIRCUFERENCIA_CINTURA+QUANTIDADE_CIGARROS+QUANTIDADE_ATIVIDADE_FISICA);
				TOTAL_GERAL = parseInt(TOTAL2+QUANTIDADE_COLESTEROL+QUANTIDADE_PRESSAO_SISTOLICA+QUANTIDADE_PRESSAO_DIASTOLICA_);
					if(TOTAL_GERAL>=5 && TOTAL_GERAL<=11){
							console.log('Risco bem abaixo da média');
						
						}
						if(TOTAL_GERAL>12 && TOTAL_GERAL<=17){
							console.log('Risco abaixo da média');
						
						}
						if(TOTAL_GERAL>17 && TOTAL_GERAL<=24){
							console.log('Risco médio habitual');
						
						}	
						if(TOTAL_GERAL>24 && TOTAL_GERAL<=31){
							console.log('Risco moderado');
						
						}
						if(TOTAL_GERAL>31 && TOTAL_GERAL<=40){
							console.log('Risco perigoso');
						
						}	
						if(TOTAL_GERAL>40 && TOTAL_GERAL<=63){
							console.log('Risco urgente - procure seu médico');
						
						}					
				
					}

				}, null);
			});


}
