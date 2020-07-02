import React, {useRef} from 'react';
import './popup.css';
import Backdrop from '../Backdrop/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = (props) => {
	const input = useRef(null);

	return (
			<Backdrop close={props.close}>
				<div className='Input' onClick={(e)=>{
								e.stopPropagation();
						}} >
					<h3>{props.heading}</h3>
					{
						props.type==='input'?<textarea ref={input} placeholder='Enter inputs seperated by whitespaces...'  />:null
					}
					{
						props.type==='output'?<div className='Output'><pre>{props.output}</pre></div>:null
					}
					{
						props.type==='input'?<button type='button' for='done' onClick={()=>{
							props.onSubmit(input.current.value);
							props.close();
						}
						}><FontAwesomeIcon icon='check-circle' />Done</button>:null
					}
					<button type='button' for='close' onClick={props.close}><FontAwesomeIcon icon='times-circle' />Close</button>
				</div>
			</Backdrop>
		);
};

export default Input;

/*
{
	type:input||output,
	heading:'Input||Ouput'
	close:fun,
	output:'output data'
}
*/