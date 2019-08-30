$(document).on("pageshow","#pgn_login",function(){

	if(localStorage.getItem("REGISTRO_USUARIO") !== null)
	{
		irPara("pgn_listar_cliente");
	}
	$("#btn_login").click(function(event) {
		logar(select_user, cadastrar_usuario, );
	});
});

function logar(callback_select_user)
{
	var registro = $("#txt_logar").val();
	$.ajax 
	({
		url: "http://transparencia.confef.org.br:8099/SPW/API_CADASTRAL/cadastral/profissional/cadastrosimplificado",
	    type: 'POST',
	    dataType: 'json',
	    contentType: 'application/json',
	    processData: false,
	    data: '{"chave":"0e2d6f18-46e2-47d3-8f01-cffbe1462942","registro":"' + registro + '"}',
		beforeSend: function()
		{

		},
		success: function(data)
		{
			if(data['Registro'] == registro)
			{
				var cidade = data['Cidade'];
				var nome = data['Nome'];
				var situacaoCadastral = data['SituacaoCadastral'];
				callback_select_user(registro, cidade, nome, situacaoCadastral, cadastrar_usuario, alterar_usuario);
				localStorage.setItem("REGISTRO_USUARIO",registro);
				localStorage.setItem("NOME_USUARIO",nome);
				localStorage.setItem("CIDADE_USUARIO",cidade);
				$("#txt_logar").val("BA-");
				irPara("pgn_listar_cliente");
			}
			else
			{
				alert("Registro não encontrado por favor tente novamente");
			}
		},
		error:function()
		{
			alert('Ocorreu um erro ao trazer os dados do cliente!');
		}
	});
}
function cadastrar_usuario(registro, cidade, nome, situacaoCadastral)
{	
	db.transaction(function(client) {
		client.executeSql('INSERT INTO USUARIO ( USUA_NOME,USUA_EMAIL,USUA_TELEFONE,'+
				'USUA_NUMERO_REGISTRO,USUA_CIDADE,USUA_FLAG_ATIVO,USUA_DATA)'+
				'VALUES (?,?,?,?,?,?,?)',[nome,'','',registro,cidade,situacaoCadastral,"date('now')"]);

	});					
}
function alterar_usuario(registro, cidade, nome, situacaoCadastral)
{	
	db.transaction(function(client) {
		client.executeSql('UPDATE USUARIO SET USUA_NOME = ?,USUA_EMAIL = ?,USUA_TELEFONE = ?,'+
			'USUA_NUMERO_REGISTRO = ?,USUA_CIDADE = ?,USUA_FLAG_ATIVO = ?,USUA_DATA = ? WHERE USUA_NUMERO_REGISTRO = '+registro,
			[nome,'','',registro,cidade,situacaoCadastral,"date('now')"]);

	});					
}
function select_user(registro, cidade, nome, situacaoCadastral, callback_cadastrar_usuario, callback_alterar_usuario)
{  
	db.transaction(function(perf) {
		perf.executeSql('SELECT * FROM USUARIO WHERE USUA_NUMERO_REGISTRO =? ', [registro], 
			function (perf,retorno_user_cad){
				var rows = retorno_user_cad.rows;
				if(rows.length > 0)
				{
					callback_alterar_usuario(registro, cidade, nome, situacaoCadastral);
				}
				else
				{
					callback_cadastrar_usuario(registro, cidade, nome, situacaoCadastral);
				}
			}, 
			null
		);
	});		
}
function sair()
{
	localStorage.removeItem("REGISTRO_USUARIO");
	localStorage.removeItem("NOME_USUARIO");
	localStorage.removeItem("CIDADE_USUARIO");
	window.location.href='#pgn_login';;
}