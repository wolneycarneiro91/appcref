$(document).on("pageshow","#cadastrar_perfil",function(){
	console.log('pagina cadastrar_perfil carregada ');
	$("#field-name-profile").val(localStorage.getItem("NOME_USUARIO"));
	$("#field-city-profile").val(localStorage.getItem("CIDADE_USUARIO"));
	$("#field-register-profile").val(localStorage.getItem("REGISTRO_USUARIO"));
});

$(document).on("pageshow","#pgn_listar_perfil",function(){
	console.log('pagina pgn_listar_perfil carregada ');
	limpaCamposPerfil();
	mostrar_perfil();
});


function cadastrar_perfil(){		
	console.log('cadastrar_perfil');
		
	var id_perfil 			 = document.getElementById('field-id-perfil').value;
	var USUA_NOME 			 = document.getElementById('field-name-profile').value;    
	var USUA_EMAIL  		 = document.getElementById('field-mail-profile').value;
	var USUA_TELEFONE 		 = document.getElementById('field-phone-profile').value;
	var USUA_NUMERO_REGISTRO = document.getElementById('field-register-profile').value;
	var USUA_CIDADE 		 = document.getElementById('field-city-profile').value;
	var USUA_FLAG_ATIVO 	 = 1;
	
	var data 				 = new Date();
	var dia     			 = data.getDate(); 
	var mes     			 = data.getMonth();
	var ano    				 = data.getFullYear(); 
	var str_data 			 = ano + '-' + (mes+1) + '-' + dia;
	//var str_data 			 = dia + '/' + (mes+1) + '/' + ano;
	var USUA_DATA 			 = str_data;
	
	
	if(!validaCampoText('field-name-profile') || !validaCampoText('field-register-profile')){
		
		alert("Os campos com * são obrigatórios");
		return false;
	}	
	else {

		db.transaction(function(cli) {
			if(id_perfil){
				cli.executeSql('UPDATE USUARIO SET USUA_NOME=?,USUA_EMAIL=?,USUA_TELEFONE=?,USUA_NUMERO_REGISTRO=?,USUA_CIDADE=?,USUA_FLAG_ATIVO=?,USUA_DATA=? WHERE USUA_ID=?',[USUA_NOME,USUA_EMAIL,USUA_TELEFONE,USUA_CIDADE,USUA_FLAG_ATIVO,USUA_DATA,id_perfil],null);
			}else{
				cli.executeSql('INSERT INTO USUARIO ( USUA_NOME,USUA_EMAIL,USUA_TELEFONE,'+
								'USUA_NUMERO_REGISTRO,USUA_CIDADE,USUA_FLAG_ATIVO,'+
								'USUA_DATA) VALUES (?,?,?,?,?,?,?)', [USUA_NOME,USUA_EMAIL,USUA_TELEFONE,USUA_NUMERO_REGISTRO,USUA_CIDADE,USUA_FLAG_ATIVO,USUA_DATA]);
			}
			
		limpaCamposPerfil();
		irPara('pgn_listar_perfil');			
		});
	}


}

function mostrar_perfil(){ 

	console.log('mostrar_perfil');
	
	//var tabela_perfil = document.getElementById('tbody-profile');
	$('#tbody_profile').html('');

db.transaction(function(cli) {
		cli.executeSql('SELECT * FROM USUARIO ', [], function (cli,retorno_cli){
			var rows = retorno_cli.rows;
			console.log('transaction' +cli);
			var LINHA = '';
			for(var x = 0; x<rows.length; x++){
					
					LINHA += '<ion-item class="item md in-list ion-focusable hydrated item-label">'+																			
					'<ion-label> Nome - ' + rows.item(x)[["USUA_NOME"]] + '</ion-label></ion-item>';																																					   
									   
			}

			$('#tbody_profile').html(LINHA);
				//tabela_perfil.innerHTML = LINHA; 

		}, null);
	});
	
}


function limpaCamposPerfil(){
	
	$('#field-name-profile').val('');    
	$('#field-mail-profile').val('');
	$('#field-phone-profile').val('');
	$('#field-register-profile').val('');
	$('#field-city-profile').val('');
}