const menuCtrl = document.querySelector('ion-menu-controller');

function fechar_menu(){
  menuCtrl.enable(false, 'first');
  menuCtrl.close('first');
}

/*function openEnd() {
  menuCtrl.open('end');
}

function openCustom() {
  menuCtrl.enable(true, 'custom');
  menuCtrl.open('custom');
}*/