	window.addEventListener('load', carregado);

		var db = openDatabase("bancoCREF", "1.0", "Armazenamento Local", 2 * 1024 * 1024);

	function carregado(){    
	

		
		//document.getElementById('btn-salvar').addEventListener('click', salvar);
		//document.getElementById('btn_cadastrar_perfil').addEventListener('click', cadastrar_perfil);
		document.getElementById('btn_cadastrar_estabelecimento').addEventListener('click', cadastrar_estabelecimento);
		document.getElementById('btn_cadastrar_cliente').addEventListener('click', cadastrar_cliente);
		document.getElementById('btn_editar_cliente').addEventListener('click',editar_cliente);
		//document.getElementById('btn_control_estabelecimento').addEventListener('click',controlar_estabelecimento);
		document.getElementById('btn_salvar_anamnese').addEventListener('click',cadastrar_anamnese);
		document.getElementById('btn_salvar_parq').addEventListener('click',cadastrar_parq);
		//document.getElementById('btn-deletar').addEventListener('click', deletar);
		
		db.transaction(function(tx) {
			tx.executeSql("DROP TABLE myTable" );
			tx.executeSql("CREATE TABLE IF NOT EXISTS myTable ( id INTEGER PRIMARY KEY,nome TEXT,senha TEXT, email TEXT)" );
		  
		});
		
		db.transaction(function(ct) {	
			ct.executeSql("CREATE TABLE IF NOT EXISTS USUARIO "+
							" (USUA_ID INTEGER PRIMARY KEY AUTOINCREMENT,USUA_NOME VARCHAR(150),"+
							" USUA_EMAIL VARCHAR(150),USUA_TELEFONE VARCHAR(12),"+
							" USUA_NUMERO_REGISTRO VARCHAR(50),USUA_CIDADE VARCHAR(100),"+
							" USUA_FLAG_ATIVO INTEGER DEFAULT 0,USUA_DATA DATE);");
		});
		
		db.transaction(function(estab) {						 
			estab.executeSql("CREATE TABLE IF NOT EXISTS ESTABELECIMENTO("+
						"  ESTA_ID INTEGER PRIMARY KEY AUTOINCREMENT,"+
						"  ESTA_NOME VARCHAR(150),"+
						"  ESTA_USUARIO_ID INTEGER NOT NULL,"+
						"  FOREIGN KEY (ESTA_USUARIO_ID) REFERENCES USUARIO (USUA_ID))");
		});	

		db.transaction(function(cli) {				
			cli.executeSql("CREATE TABLE IF NOT EXISTS CLIENTE("+
						"  CLIE_ID INTEGER PRIMARY KEY AUTOINCREMENT,"+
						"  CLIE_USUARIO_ID INTEGER,"+
						"  CLIE_NOME VARCHAR(150),"+
						"  CLIE_SEXO_ID INTEGER, "+
						"  CLIE_DATA_NASCIMENTO DATE,"+
						"  CLIE_PROFISSAO VARCHAR(100),"+
						"  CLIE_ESTADO_CIVIL_ID INTEGER,"+
						"  CLIE_CIDADE VARCHAR(150),"+
						"  CLIE_ESTADO VARCHAR(50),"+
						"  CLIE_PAIS VARCHAR(150),"+
						"  CLIE_ESTABELECIMENTO_ID INTEGER,"+
						"  CLIE_DATA DATE,"+
						"  FOREIGN KEY (CLIE_USUARIO_ID) REFERENCES USUARIO (USUA_ID),"+
						"  FOREIGN KEY (CLIE_ESTABELECIMENTO_ID) REFERENCES ESTABELECIMENTO (ESTA_ID))" );	
		});	
		db.transaction(function(anamn) {
			//anamn.executeSql("DROP TABLE ANAMNESE;" );
			anamn.executeSql("CREATE TABLE IF NOT EXISTS ANAMNESE  ("+
						"  ANAM_ID INTEGER PRIMARY KEY AUTOINCREMENT,"+
						"  ANAM_CLIE_ID INTEGER ,"+
						"  ANAM_FLAG_POSSUI_PATOLOGIA INTEGER DEFAULT 0,"+
						"  ANAM_PATOLOGIA VARCHAR(200),"+
						"  ANAM_FLAG_USA_MEDICACAO INTEGER DEFAULT 0,"+
						"  ANAM_MEDICACAO VARCHAR(200),"+
						"  ANAM_FLAG_CIRURGIA_FRATURA INTEGER DEFAULT 0,"+
						"  ANAM_CIRURGIA_FRATURA VARCHAR(200),"+
						"  ANAM_FLAG_RELATA_DOR INTEGER DEFAULT 0,"+
						"  ANAM_DOR VARCHAR(200),"+
						"  ANAM_FLAG_HABITO_FUMAR INTEGER DEFAULT 0,"+
						"  ANAM_TABAGISMO_ENUM INTEGER,"+
						"  ANAM_FLAG_POSSUI_ALERGIA INTEGER DEFAULT 0,"+
						"  ANAM_ALERGIA VARCHAR(200),"+
						"  ANAM_TIPO_ALIMENTACAO VARCHAR(200),"+
						"  ANAM_ATIVIDADE_FISICA VARCHAR(200),"+
						"  ANAM_COMPORTAMENTO_SEDENTARIO VARCHAR(200),"+
						"  ANAM_QUAL_OBJETIVO VARCHAR(200),"+
						"  ANAM_FLAG_PARENTE_DIABETE INTEGER DEFAULT 0,"+
						"  ANAM_PARENTE_DIABETE VARCHAR(200),"+
						"  ANAM_FLAG_PARENTE_DAC INTEGER DEFAULT 0,"+
						"  ANAM_PARENTE_DAC VARCHAR(200),"+
						"  ANAM_FLAG_PARENTE_AVC INTEGER DEFAULT 0,"+
						"  ANAM_PARENTE_AVC VARCHAR(200),"+
						"  ANAM_FLAG_PARENTE_IAM INTEGER DEFAULT 0,"+
						"  ANAM_PARENTE_IAM VARCHAR(200),"+
						"  FOREIGN KEY (ANAM_CLIE_ID) REFERENCES CLIENTE (CLIE_ID))"
			);
		});	
		db.transaction(function(prq) {		
		
		
		//prq.executeSql("DROP TABLE PARQ; ");
			prq.executeSql("CREATE TABLE IF NOT EXISTS PARQ ("+
						"  PARQ_ID INTEGER PRIMARY KEY AUTOINCREMENT,"+
						"  PARQ_CLIE_ID INTEGER ,"+
						"  PARQ_FLAG_POSSUI_PROBLEMA_CARDIACO INTEGER DEFAULT 0,"+
						"  PARQ_FLAG_SENTE_DOR_EXERCICIO INTEGER DEFAULT 0,"+
						"  PARQ_FLAG_ULT_MESES_SENTE_DOR_EXERCICIO INTEGER DEFAULT 0,"+
						"  PARQ_FLAG_PERDE_EQUILIBRIO INTEGER DEFAULT 0,"+
						"  PARQ_FLAG_PROBLEMAS_OSSEOS_ARTIC_COLUNA INTEGER DEFAULT 0,"+
						"  PARQ_FLAG_MEDICO_PRES_MEDICAMENTO INTEGER DEFAULT 0,"+
						"  PARQ_FLAG_OUTRA_RAZAO_NAO_PRATICAR_ATIV INTEGER DEFAULT 0,"+
						"  FOREIGN KEY (PARQ_CLIE_ID) REFERENCES CLIENTE (CLIE_ID) ) ;" ); 
		});	
		
		db.transaction(function(rsc) {					
			rsc.executeSql("CREATE TABLE IF NOT EXISTS RISCO_CARDIOVASCULAR ("+
						"  RISC_ID INTEGER PRIMARY KEY AUTOINCREMENT,"+
						"  RISC_HERANCA_FAMILIAR_ENUM INTEGER,"+
						"  RISC_CIRC_CINTURA INTEGER,"+
						"  RISC_ATIVIDADE_FISICA_SEMANAL_ENUM INTEGER,"+
						"  RISC_COLESTEROL_ENUM INTEGER,"+
						"  RISC_PRESSAO_SISTOLICA_ENUM INTEGER,"+
						"  RISC_PRESSAO_DIASTOLICA_ENUM INTEGER,"+
						"  RISCO_CLIE_ID);" );	
						
		});	
		db.transaction(function(aval) {	
		
			aval.executeSql("CREATE TABLE IF NOT EXISTS AVALIACAO ("+
						"  AVAL_ID INTEGER PRIMARY KEY AUTOINCREMENT,"+
						"  AVAL_CLIENTE_ID INTEGER,"+
						"  AVAL_ANAMNESE_ID INTEGER,"+
						"  AVAL_PARQ_ID INTEGER,"+
						"  AVAL_RISCO_ID INTEGER,"+
						"  AVAL_TOTAL_RESPOSTA_ANAMENSE REAL,"+
						"  AVAL_TOTAL_RESPOSTA_PARQ INTEGER,"+
						"  AVAL_TOTAL_RISCO INTEGER,"+
						"  AVAL_STATUS_RISCO_ID INTEGER,"+
						"  AVAL_STATUS_CLIENTE_AVALIACAO INTEGER DEFAULT 0,"+
						"  AVAL_FLAG_APRESENTOU_ATESTADO INTEGER DEFAULT 0,"+
						"  AVAL_STATUS_CLIENTE_AVALIACAO_OLD INTEGER DEFAULT 0,"+
						"  AVAL_ENCAMINHAMENTO VARCHAR(100),"+
						"  AVAL_DATA DATE,"+
						"  FOREIGN KEY (AVAL_CLIENTE_ID) REFERENCES CLIENTE (CLIE_ID))" );	
						
		
		
		});
		
		db.transaction(function(altav) {	
			altav.executeSql("ALTER TABLE  AVALIACAO ALTER COLUMN AVAL_TOTAL_RESPOSTA_ANAMENSE REAL" );
			
		});

		
	}   

function openFirst() {
	var menuCtrl = document.querySelector('ion-menu-controller');
  menuCtrl.enable(true, 'first');
  menuCtrl.open('first');
}	





	/*function mostrar(){        
		var table = document.getElementById('tbody-register');

		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado) {
				var rows = resultado.rows;
				var tr = '';
				for(var i = 0; i < rows.length; i++){
						tr += '<tr>';
						tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
						tr += '<td>' + rows[i].senha + '</td>';
						tr += '<td>' + rows[i].email + '</td>';
						tr += '</tr>';                   
				}
					table.innerHTML = tr; 

			}, null);
		});
	}*/

	/*function atualizar(_id){   
		
		var id = document.getElementById('field-id');
		var nome = document.getElementById('field-name');
		var pass = document.getElementById('field-pass');
		var mail = document.getElementById('field-mail');
		
		id.value = _id;
		
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM myTable WHERE id=?', [_id], function (tx, resultado) {
				var rows = resultado.rows[0];

				nome.value = rows.nome ;
				pass.value = rows.senha ;
				mail.value = rows.email ;
			});
		});
		inputSHOW(true);
	}*/

	/*function deletar(){
		
		var id = document.getElementById('field-id').value;
		
		db.transaction(function(tx) {
			tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
		});
		
		mostrar();
		//limpaCampo();
		inputSHOW(false);
	}*/