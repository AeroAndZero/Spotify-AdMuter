let isEnable = true;
chrome.storage.sync.get('admuterStatus',function(status){
	isEnable = (status.admuterStatus == 'true');
})

if(isEnable){
	document.querySelector("#toggleButton").innerHTML = 'Disable';
}else{
	document.querySelector("#toggleButton").innerHTML = 'Enable';
}

$(function(){

	$("#toggleButton").click(function(){
		isEnable = !isEnable;
		if(isEnable){
			$("#toggleButton").text("Disable");
		}else{
			$("#toggleButton").text("Enable");
		}

		$("#toggleButton").attr("disabled", true);
		chrome.storage.sync.set({'admuterStatus' : isEnable.toString()},function(){
			$("#toggleButton").attr("disabled", false);
		});

		chrome.tabs.query({currentWindow:true, active:true},
			function(tabs){
				chrome.tabs.sendMessage(tabs[0].id,isEnable)
			}
		);
	});
});