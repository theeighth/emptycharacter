// Import Video.js and related libraries
/*import "https://vjs.zencdn.net/7.11.4/video-js.css";
import "https://vjs.zencdn.net/7.11.4/video.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/6.6.5/videojs.ads.min.js";
import "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
import "https://cdnjs.cloudflare.com/ajax/libs/videojs-ima/1.11.0/videojs.ima.min.css";
import "https://cdnjs.cloudflare.com/ajax/libs/videojs-ima/1.11.0/videojs.ima.min.js";*/

// Styles for close button
const closeButtonStyles = `
  .close-button {
    position: absolute;
    top: -20px;
    right: 5px;
    cursor: pointer;
    font-size: 16px;
    color: #777;
  }

  @media screen and (max-width: 759px) {
    #my-video, .vjs-tech {
      width: 256px !important;
      height: 144px !important;
      border: 1px solid: #bbb;
    }
  }
`;

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");

  var player = videojs('my-video');
  player.muted(true);
  player.play();

  console.log("Video.js player initialized");

  var vastTagPreroll = "https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-6419767829488704&slotname=emptycharacter&ad_type=video&description_url=https%3A%2F%2Ffilesamples.com%2Fsamples%2Fvideo%2Fmp4%2Fsample_960x400_ocean_with_audio.mp4&max_ad_duration=30000&videoad_start_delay=0&vpmute=1&vpa=click";
  var vastTagMidroll = "path/to/your/vast-tag.xml";
  var vastTagPostroll = "path/to/your/vast-tag.xml";
  var prerollTriggered = false;
  var postrollTriggered = false;
  var midrollRequested = false;
  var midrollInterval = 5 * 60; // 5 minutes
  var lastMidrollTime = 0; // The time when the last mid-roll ad was played

  if (!prerollTriggered) {
    player.ima({
      adTagUrl: vastTagPreroll,
      showControlsForAds: true,
      debug: false,
    });
  } else {
    player.ima({
      adTagUrl: '',
      showControlsForAds: true,
      debug: false,
    });
  }
  console.log("IMA settings configured");

  player.ima.initializeAdDisplayContainer();
  console.log("IMA ad display container initialized");

  function requestMidrollAd() {
    midrollRequested = true;
    player.ima.changeAdTag(vastTagMidroll);
    player.ima.requestAds();
  }

  player.on("timeupdate", function () {
    var currentTime = player.currentTime();
    console.log("Current time:", currentTime);
    var timeSinceLastMidroll = currentTime - lastMidrollTime;

    if (timeSinceLastMidroll >= midrollInterval && !midrollRequested) {
      lastMidrollTime = currentTime; // Update the last mid-roll ad time
      console.log("Midroll triggered");
      requestMidrollAd();
    }
  });

  player.on("ended", function () {
    console.log("Video ended");
    if (!postrollTriggered) {
      postrollTriggered = true;
      console.log("Postroll triggered");

      player.ima.requestAds({
        adTagUrl: vastTagPostroll,
      });

      console.log("Postroll ads requested");
    }
  });

  player.on("adsready", function () {
    if (midrollRequested) {
      console.log("Ads ready - midroll");
    } else {
      console.log("Ads ready - preroll");
      player.src(
        "https://video.twimg.com/amplify_video/1360061497691541505/vid/340x270/c4mklPwyMcAsZu6e.mp4"
      );
    }
  });

  player.on("aderror", function () {
    console.log("Ads aderror");
    player.play();
  });

  player.on("adend", function () {
    if (lastMidrollTime > 0) {
      console.log("A midroll ad has finished playing.");
      midrollRequested = false;
    } else {
      console.log("The preroll ad has finished playing.");
      prerollTriggered = true;
    }
    player.play();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var targetDiv = document.querySelector('.video-js');
  var targetDiv2 = document.querySelector('.vjs-tech');
  var targetDiv3 = document.querySelector('.my-video_ima-ad-container');

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    if (isElementInViewport(targetDiv) && window.matchMedia('(max-width: 767px)').matches) {
      targetDiv.style.width = '256px';
      targetDiv.style.height = '144px';
      targetDiv.style.position = 'fixed';
      targetDiv.style.right = '15px';
      targetDiv.style.bottom = '75px';
      targetDiv.style.zIndex = '100';
      targetDiv2.style.width = '256px';
      targetDiv2.style.height = '144px';
      targetDiv2.style.zIndex = '99';
      targetDiv3.style.zIndex = '200';
    } else if (isElementInViewport(targetDiv)) {
      targetDiv.style.position = 'fixed';
      targetDiv.style.right = '10px';
      targetDiv.style.bottom = '45px';
      targetDiv.style.width = '330px';
      targetDiv.style.height = '215px';
      targetDiv.style.zIndex = '100';
      targetDiv2.style.width = '330px';
      targetDiv2.style.height = '215px';
      targetDiv2.style.zIndex = '99';
      targetDiv3.style.zIndex = '200';
    } else {
      targetDiv.style.backgroundColor = 'white';
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  var targetDiv = document.getElementById('my-video');

  var closeButton = document.createElement('span');
  closeButton.innerHTML = 'X';
  closeButton.className = 'close-button';

  targetDiv.appendChild(closeButton);

  closeButton.addEventListener('click', function () {
    targetDiv.style.display = 'none';
  });
});

