/*
 * (C) Copyright 2014-2015 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the GNU Lesser General Public License (LGPL)
 * version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

function getopts(args, opts)
{
  var result = opts.default || {};
  args.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) { result[$1] = $3; });

  return result;
};

var args = getopts(location.search,
{
  default:
  {
    ws_uri: 'ws://' + location.hostname + ':8888/kurento',
    //ws_uri: 'wss://' + location.hostname + ':8443/kurento',
    ice_servers: undefined
  }
});

if (args.ice_servers) {
  console.log("Use ICE servers: " + args.ice_servers);
  kurentoUtils.WebRtcPeer.prototype.server.iceServers = JSON.parse(args.ice_servers);
} else {
  console.log("Use freeice")
}


var disableTrickleICE = true;
function setIceCandidateCallbacks(webRtcPeer, webRtcEp, onerror)
{

  var localIceCandidates = [];
  var remoteIceCandidates = [];
  webRtcPeer.on('icecandidate', function(candidate) {
    webConsole.log("Local candidate:",candidate);
    if(disableTrickleICE)
    {
        localIceCandidates.push(candidate);
    }
    else
    {
        candidate = kurentoClient.register.complexTypes.IceCandidate(candidate);
        webRtcEp.addIceCandidate(candidate, onerror)
    }
  });

  webRtcEp.on('OnIceCandidate', function(event) {
    var candidate = event.candidate;
    webConsole.log("Remote candidate:",candidate);
    if(disableTrickleICE)
        remoteIceCandidates.push(candidate);
    else
        webRtcPeer.addIceCandidate(candidate, onerror);
  });

  webRtcEp.on('OnIceGatheringDone', function(event) {
      webConsole.log("ICE Gathering done");
      var i;
      for(i=0;i<localIceCandidates.length;i++)
      {
        var candidate = localIceCandidates[i];
        webConsole.log("add " + candidate);
        candidate = kurentoClient.register.complexTypes.IceCandidate(candidate);
        webRtcEp.addIceCandidate(candidate, onerror);
      }
      for(i=0;i<remoteIceCandidates.length;i++)
      {
        var candidate = remoteIceCandidates[i];
        webConsole.log("add " + candidate);
        webRtcPeer.addIceCandidate(candidate, onerror);
      }
  });
}

var helloworld={};

window.addEventListener('load', function()
{
  webConsole = new Console();

  var webRtcPeer;
  var pipeline;

  var videoInput = document.getElementById('videoInput');
  var videoOutput = document.getElementById('videoOutput');

  var startButton = document.getElementById("start");
  var stopButton = document.getElementById("stop");

  helloworld.start=function ()
  {
    showSpinner(videoInput, videoOutput);

    var options = {
      localVideo: videoInput,
      remoteVideo: videoOutput
    };

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(error)
    {
      if(error) return onError(error)

      this.generateOffer(onOffer)
    });

    function onOffer(error, sdpOffer)
    {
      if(error) return onError(error)

      kurentoClient(args.ws_uri, function(error, client)
      {
        if(error) return onError(error);

        client.create("MediaPipeline", function(error, _pipeline)
        {
          if(error) return onError(error);

          pipeline = _pipeline;

          pipeline.create("WebRtcEndpoint", function(error, webRtc){
            if(error) return onError(error);

/*
            pipeline.create('RecorderEndpoint', {uri: "file:///tmp/test1.webm"},
				function(error, recorder)
				{
					if(error) return onError(error);
					
					webRtc.connect(recorder, function(error){
						if(error) onError(error);
					});

					recorder.record(function(error)
					{
							if(error) onError(error);
					});
				});
*/
			


            setIceCandidateCallbacks(webRtcPeer, webRtc, onError)

            webRtc.processOffer(sdpOffer, function(error, sdpAnswer){
              if(error) return onError(error);

              webRtcPeer.processAnswer(sdpAnswer, onError);
            });
            webRtc.gatherCandidates(onError);

            webRtc.connect(webRtc, function(error){
              if(error) return onError(error);

              webConsole.log("Loopback established");
            });
          });
        });
      });
    }
  };


    helloworld.stop=function () {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }

    if(pipeline){
      pipeline.release();
      pipeline = null;
    }

    hideSpinner(videoInput, videoOutput);
  }

  function onError(error) {
    if(error)
    {
      webConsole.error(error);
      stop();
    }
  }
})


function showSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].poster = 'img/transparent-1px.png';
    arguments[i].style.background = "center transparent url('img/spinner.gif') no-repeat";
  }
}

function hideSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].src = '';
    arguments[i].poster = 'img/webrtc.png';
    arguments[i].style.background = '';
  }
}

/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});
