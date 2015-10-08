var codeLength=16;
var codeWidth=codeHeight=10;
function decode(c)
{ 
	var receiverTime;
	 imgData=c.getImageData(0, codeHeight/2.0, codeWidth*codeLength, 1).data;
	 if(imgData[3]!=0) //alpha channel =0 means video frame is empty
	 {
		 var i;
		 receiverTime=0;
		 for(i=0;i<codeLength;i++)
			 receiverTime = receiverTime*2 + (imgData[(i*codeWidth+codeWidth/2.0)*4]>128?1:0);
	 }

	c.font = "12px Courier New";
	c.fillText(prependSpace(receiverTime,6),170,12);
	return receiverTime;
}

var startTime=-1;
function drawCode(c, senderTime)
{
        var i;

        //draw ime
        c.font = "12px Courier New";
        c.fillText(prependSpace(senderTime,6),170,12);

        //drawbinary code
        var binaryCode = senderTime.toString(2);
        for(i=0;i<codeLength;i++)
        {
            if(i>=binaryCode.length || binaryCode.substr(binaryCode.length-i-1,1)=='0')
                c.fillStyle='#000000';
            else
                c.fillStyle='#FF0000';
            var x = (codeLength-i-1)*codeWidth;
            var y = 0;
            c.fillRect(x,y,codeWidth,codeHeight);
        }
}
