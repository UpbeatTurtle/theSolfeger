const hands = new Hands({locateFile: (file) => 
    `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5
});

hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0 ) {
        const landmarks = results.multiHandLandmarks[0];
        const indexTip = landmarks[8];

        //all the fingers in xLands and yLands
        for (let i = 0; i < 21; i++) {
            xLands[i] = videoX + (1 - landmarks[i].x) * videoWidth;
            yLands[i] = videoY + landmarks[i].y * videoHeight;
        }

        //top, middle, bottom rows maybe
        knucklesYavg = 0;
        for (let i = 1; i < 5; i++) {
            knucklesY[i] = yLands[1+i*4];
            knucklesYavg += knucklesY[i];
        }
        knucklesYavg /= 4;
        //text = Math.round(knucklesYavg);

        cracklesYavg = 0;
        for (let i = 1; i < 5; i++) {
            cracklesY[i] = yLands[2+i*4];
            cracklesYavg += cracklesY[i];
        }
        cracklesYavg /= 4;
        //text = Math.round(cracklesYavg);

        tipsYavg = 0;
        for (let i = 1; i < 5; i++) {
            tipsY[i] = yLands[4+i*4];
            tipsYavg += tipsY[i];
        }
        tipsYavg /= 4;
        
        ncdiff = Math.abs(knucklesYavg - cracklesYavg);
        ctdiff = Math.abs(cracklesYavg - tipsYavg);
        text = Math.round(ctdiff);

        handx = videoX + (1 - indexTip.x) * videoWidth;
        handy = videoY + indexTip.y * videoHeight;
        determineSign()
        text = currentSign;
    } else {
        handx = null;
        handy = null;
    }

});

function determineSign(){
    let dif12 = Math.abs(knucklesY[1] - knucklesY[2]);
    let dif23 = Math.abs(knucklesY[2] - knucklesY[3]);
    let dif34 = Math.abs(knucklesY[3] - knucklesY[4]);
    let difavg = (dif12 + dif23 + dif34) / 3;
    let indexToTipsdiff = Math.abs(yLands[8] - tipsYavg);
    if ((knucklesY[1] < knucklesY[2] &&
                knucklesY[2] < knucklesY[3] &&
                knucklesY[3] < knucklesY[4]) && difavg > 10){

        currentSign = Sign.sol;
    } else if((knucklesY[1] > knucklesY[2] &&
                knucklesY[2] > knucklesY[3] &&
                knucklesY[3] > knucklesY[4]) && difavg > 0){

        currentSign = Sign.fa;
    }  else if (ctdiff < 15 && ncdiff < 15 && indexToTipsdiff < 8){
        currentSign = Sign.mi;
        
    }  else if(ncdiff < 20 && yLands[8] < cracklesYavg && indexToTipsdiff > 10){
        currentSign = Sign.ti;
        
    } else if (tipsYavg < cracklesYavg && cracklesYavg < knucklesYavg){
        currentSign = Sign.re;
    }  else if (knucklesYavg <= cracklesYavg && ctdiff < 15){
        currentSign = Sign.do;
    }  else if (tipsYavg > cracklesYavg && cracklesYavg > knucklesYavg){
        currentSign = Sign.la;
    }  else {
        currentSign = Sign.none;
    }

    
}

const camera = new Camera(video, {
    onFrame: async () => {
        await hands.send({image: video}); 
    },
    width: 640,
    height: 480
});
camera.start();