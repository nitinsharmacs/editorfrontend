import React, {useState, useEffect, useRef} from 'react';
import './editor.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-c.min';
import 'prismjs/components/prism-cpp.min';
import 'prismjs/themes/prism.css';

const Snippet = (props) => {
	const [content, changeContent] = useState(props.content||'');
	const languages = {
		cpp:Prism.languages.cpp,
		python:Prism.languages.python
	}
	useEffect(()=>{
		document.getElementById('codeoutput').innerHTML = Prism.highlight(content, languages[props.language], props.language);
		props.onChange(content);
	}, [props.language, content]);
	const code = useRef(null);
	const checkTab = (event) => {
		let value = content,
	      selStartPos = event.currentTarget.selectionStart;
	    if (event.key === "Tab") {
	    	event.preventDefault();
	      value =
	        value.substring(0, selStartPos) +
	       "   "+
	      value.substring(selStartPos, value.length);
	      event.currentTarget.selectionStart = selStartPos + 3;
	      event.currentTarget.selectionEnd = selStartPos + 4;
	      changeContent(value);
	    }
	};
	
	return (
		<div className='EditorArea' onClick={()=>code.current.focus()}>
			<div className='Editor'>
				<textarea ref={code}  className='CodeInput' spellcheck='false' value={content} onChange={e=>changeContent(e.target.value)} onKeyDown={checkTab}   />
				<pre  className='CodeOutput' id='codeoutput'>
					
				</pre>
			</div>
		</div>
		);
};

export default Snippet;


/*
<code  ref={code} className={`Code language-${props.language}`} id='code'>{content}</code>
onKeyDown={(event)=>{

					if(event.keyCode===9){event.preventDefault(); var v=event.target.value,s=event.target.selectionStart,e=event.target.selectionEnd;event.target.value=v.substring(0, s)+'\t'+v.substring(e);event.target.selectionStart=event.target.selectionEnd=s+1;return false;}
				}}

*/