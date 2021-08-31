import React, { useEffect, useRef } from 'react';
import { Stream } from 'stream';

import mainLogo from '../../assets/img/content/main-logo.svg';

import './Editor.scss';

const EditorTemp = () => {
	const canvasRef = useRef(null);
	const recordRef = useRef(null);
	const playerRef = useRef(null);
	
	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');

		let imgObj = new Image();

  	imgObj.onload = function() {
  	    let w = canvasRef.current.width;
  	    let nw = imgObj.naturalWidth;   //1350
  	    let nh = imgObj.naturalHeight;  //900
  	    let aspect = nw / nh;
  	    let h = w / aspect;
  	    console.log('height', h)
  	    canvasRef.current.height = h;
  	    ctx.drawImage(imgObj, 0, 0, w, h);
  	     //ctx.drawImage(imgObj, dx, dy);
  	    //ctx.drawImage(imgObj, dx, dy, dw, dh);
  	    //ctx.drawImage(imgObj, sx, sy, sw, sh, dx, dy, dw, dh);
  	};
		console.log(222);
            
		imgObj.src = mainLogo;	
		console.log(imgObj.src);

  	recordRef.current.addEventListener('change', function(e) {
    	const file = e.target.files[0];
    	const url = URL.createObjectURL(file);
    	// Do something with the audio file.
    	playerRef.current.src = url;
  	});

		// Получение доступа к микро
		const handleSuccess = function(stream) {
			// if (window.URL) {
			// 	recordRef.current!.srcObject = stream as MediaStream;
			// } else {
			// 	recordRef.current!.src = stream as string;
			// }
			const context = new AudioContext();
				const source = context.createMediaStreamSource(stream);
				const processor = context.createScriptProcessor(1024, 1, 1);
		
				source.connect(processor);
				processor.connect(context.destination);
		
				processor.onaudioprocess = function(e) {
					// Do something with the data, e.g. convert it to WAV
					console.log(e.inputBuffer);
				};
		};
	
		navigator.mediaDevices.getUserMedia({ audio: true, video: false })
				.then(handleSuccess);
		// 
	});
	
	return (
		<div>
			<h1>Я редактор :)</h1>
			<img width="122" height="28" src={mainLogo}/>
			<canvas width="600" height="400" ref={canvasRef}></canvas>
			<input ref={recordRef} type="file" accept="audio/*" capture id="recorder"/>
			<audio ref={playerRef} id="player" controls></audio>
		</div>
	);
};

export default EditorTemp;