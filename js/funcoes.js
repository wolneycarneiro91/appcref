function checkConnection()
{
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    console.log('Connection type: ' + states[networkState]);
}

function irPara(id_pagina)
{
    jQuery.mobile.changePage("#" + id_pagina, {transition: "none", changeHash: false });
}

function Calcularidade(ano_aniversario, mes_aniversario, dia_aniversario) 
{
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
}

function validaCPF(campoCpf){

	var Cpf = '#' + campoCpf;
    var strCPF = $(Cpf).val();
    strCPF = strCPF.replace(".","");
    strCPF = strCPF.replace(".","");
    strCPF = strCPF.replace("-","");
    var cpfValidado = TestaCPF(strCPF);

    if(!cpfValidado){
    	toast('CPF inv?lido!');
    	$(Cpf).parent().css('border', 'solid 2px red');
    	return false
    }
    else{
    	$(Cpf).parent().css('border', 'solid 1px #EEE');
    	return true;
    }
}

function toast(message, duration = "short"){
	window.plugins.toast.showWithOptions(
    	{
          message: message,
          duration: duration, 
          position: "bottom",
          addPixelsY: -120 
        }
  	);
}

function validateEmail($email) 
{
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test( $email );
}


function validaCampoText(id_campo)
{
	if( $.trim($("#" + id_campo).val()) == "" )
	{
		$("#" + id_campo).parent().css('border', 'solid 2px red');
		$("#" + id_campo).focus();
		return false;
	}
	else
	{
		$("#" + id_campo).parent().css('border', 'solid 0px ');
		return true;
	}
}


function validaTextArea(id_campo)
{
	if( $.trim($("#" + id_campo).val()) == "" )
	{	
		$("#" + id_campo).parent().css('border', 'solid 1px red');
		$("#" + id_campo).focus();
		return false;
	}
	else
	{	
		$("#" + id_campo).parent().css('border', 'solid 0px');
		return true;
	}
}

function validaCampoSelect( idCampo )
{
	if( $('#' + idCampo ).val()==""  )
	{
		$('#' + idCampo ).parent().css('border', 'solid 2px red');
		return false;
	}
	else
	{
		$('#' + idCampo ).parent().css('border', 'solid 1px green');
		return true;
	}
}

function validaCampoCheckBox( idCampo )
{
	if( $('#' + idCampo ).is(":checked"))
	{
		$('#checkbox-termos' ).css('border', 'solid 0px green');
		return false;
		
	}
	else
	{
		$('#checkbox-termos' ).css('border', 'solid 2px red');
		return true;
		
	}
}


function refreshPage()
{
	$.mobile.changePage
	(
	    window.location.href,
		{
	    	allowSamePageTransition : true,
	    	transition              : 'none',
	    	showLoadMsg             : false,
	    	reloadPage              : true
		}
	);
}

function limpaCampos(idForm)
{	
	var form = document.getElementById(idForm);
	var textarea = form.querySelectAll('ion-textarea');
		for (var i = 0; i < textarea.length; i++) {
			textarea[i].value = '';
		}
		
  var selects = form.querySelectAll('ion-select');
    for (i = 0; i < selects.length; i++) {
        var options = selects[i].querySelectorAll('ion-select-option');
        if (options.length > 0) {
            selects[i].value = options[0].value;
        }
    }
	var inputs = form.querySelectAll('ion-input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != 'checkbox' && inputs[i].type != 'radio') {
            inputs[i].value = '';
        }
    }	
		

}


function limparCamposForms(idForm) {
    // seleciona o form a ser resetado
    var form = document.getElementById(idForm);

    // limpa todos os inputs do tipo text, password, etc...
    var inputs = form.querySelectAll('ion-input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != 'checkbox' && inputs[i].type != 'radio') {
            inputs[i].value = '';
        }
    }

    // limpa todas as textareas
    var textarea = form.querySelectAll('ion-textarea');
    for (var i = 0; i < textarea.length; i++) {
        textarea[i].value = '';
    }

    // desmarca todos os checkboxes e radios
    inputs = form.querySelectAll('input[type=checkbox], input[type=radio]');
    for (i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }

    // seleciona a primeira opcao de todos os selects
    var selects = form.querySelectAll('ion-select');
    for (i = 0; i < selects.length; i++) {
        var options = selects[i].querySelectorAll('ion-select-option');
        if (options.length > 0) {
            selects[i].value = options[0].value;
        }
    }
}



function getRadioValor(name){
  var rads = document.getElementsByName(name);
   
  for(var i = 0; i < rads.length; i++){
   if(rads[i].checked){
	if(rads[i].value==''){
		rads[i].value = 0;
	}
    return rads[i].value;
   }
   
  }
   
  return null;
 }
 