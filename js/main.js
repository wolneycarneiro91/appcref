function waitForDeviceReady()
{
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady()
{

}

/*function abrir_manual_procedimentos(){
open(
   // '../PDF/MANUAL_DE_PROCEDIMENTOS_2016.pdf', // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
   'cdvfile://../PDF/MANUAL_DE_PROCEDIMENTOS_2016.pdf',
    'application/pdf',
    {
        error : function(e) {
            console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
        },
        success : function () {
            console.log('file opened successfully');
        }
    }
);
}*/