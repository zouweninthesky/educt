import React from "react";
import './ProgressBar.css';

const ProgressBar = ({current, total}) => {

	const style = {
		width: `${((current + 1)/total*100)}%`
	} 
	
	return(
		<div className="progress-bar">
			<div className="progress-bar__progress" style={style}></div>
		</div>
	)
};

export default ProgressBar;