let isRunning;
let pageLoad = false;
let volumeButton;
let isMuted = false;

chrome.storage.sync.get('admuterStatus',function(status){
	isRunning = (status.admuterStatus == 'true');
})

chrome.runtime.onMessage.addListener(function(msg){
	isRunning = msg;
});

window.onload = (event) => {
  pageLoad = true;
  try{
  	volumeButton = document.querySelector('[aria-label="Mute"]');
  }catch{
  	alert("Extension or Page didn't load correctly, please refresh the page");
  }
};

window.setInterval( function(){
	try{
		if(isRunning && pageLoad){
			let songDurationClasses = document.getElementsByClassName('playback-bar__progress-time')
			songDuration = songDurationClasses[1];
			songMinutes = parseInt(songDuration.innerText[0]);
			songSeconds = parseInt(songDuration.innerText.split(":")[1]);
			if(songMinutes < 1 && songSeconds <= 30){
				if(!isMuted){
					volumeButton.click()
					isMuted = true
					console.log("Ad Muted")
				}
			}else{
				if(isMuted){
					volumeButton.click();
					isMuted = false;
				}
			}
		}
	}catch{
			alert("Extension or Page didn't load correctly, please refresh the page");
	}
},1000)