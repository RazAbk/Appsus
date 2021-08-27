export function NoteAdd({inputType, setInputType, creatNote}){


    const formRef = React.createRef();
    const functionBtns = React.createRef();
    const optionalInputDiv = React.createRef();
    const addNote = React.createRef();

    const input1 = React.createRef();
    const input2 = React.createRef();

    const onEnterForm = (ev) => {
        // Expand
        const form = ev.target.form;
        form.classList.add('expand-form')

        //Reveal function buttons
        functionBtns.current.classList.add('inside-form-visible');
        // Reveal optional input
        if(inputType !== 'note-txt'){
            optionalInputDiv.current.classList.add('inside-form-visible');
        }
        // Reveal add button
        addNote.current.classList.add('inside-form-visible');
    }

    const onLeaveForm = (ev) => {
            // Shrink
            const form = ev.target.form;
            form.classList.remove('expand-form')
            
            // UnReveal function buttons
            functionBtns.current.classList.remove('inside-form-visible');
            // UnReveal optional input
            optionalInputDiv.current.classList.remove('inside-form-visible');
            // UnReveal add button
            addNote.current.classList.remove('inside-form-visible');
    }

    const onSetInputType = (type) => {
        setInputType(type);

        // Expand
        formRef.current.classList.add('expand-form')

        //Reveal function buttons
        functionBtns.current.classList.add('inside-form-visible');
        // Reveal optional input
        if(type !== 'note-txt'){
            optionalInputDiv.current.classList.add('inside-form-visible');
        }else{
            optionalInputDiv.current.classList.remove('inside-form-visible');
        }
        // Reveal add button
        addNote.current.classList.add('inside-form-visible');

    }


    const onAddNote = () => {
        const firstInput = input1.current.value;
        const optionalInput = input2.current.value;

        if(!firstInput) return;

        let info;

        if(inputType === 'note-txt'){
            info = { txt: firstInput}
        } else if(inputType === 'note-img' || inputType === 'note-video' ){
            if(!optionalInput) return;
            info = { title: firstInput, url: optionalInput}
        } else if(inputType === 'note-todos'){
            if(!optionalInput) return;
            const todos = optionalInput.split(',').map(todo => {
                return { txt: todo, doneAt: null}
            })
            info = {label: firstInput, todos}
        }
        
        creatNote(info)
        input1.current.value = '';
        input2.current.value = '';
    }

    return (
        <section className="notes-input notes-layout">
            <form className="notes-input-form" ref={formRef}>
                <label htmlFor="notes-title"></label>
                <input id="notes-title" type="text" placeholder="What's on your mind..." autoComplete="off" onFocus={onEnterForm} onBlur={onLeaveForm} ref={input1}/>
                <div className={`optional-input ${inputType !== 'note-txt' ? 'inside-form-visible' : ''}`} ref={optionalInputDiv}>
                    <label htmlFor="notes-content"></label>
                    <input id="notes-content" type="text" placeholder={(inputType === 'note-todos' ? 'Let\'s make some tasks (use , to separate)' : 'Url goes here')} autoComplete="off" onFocus={onEnterForm} onBlur={onLeaveForm} ref={input2}/>
                </div>
                <div className="choose-type-btns" ref={functionBtns}>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('note-txt')}} style={{color: (inputType === 'note-txt' ? '#efc718' : 'black')}} className="far fa-file-alt"></i>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('note-todos')}} style={{color: (inputType === 'note-todos' ? '#efc718' : 'black')}} className="fas fa-list-ul"></i>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('note-img')}} style={{color: (inputType === 'note-img' ? '#efc718' : 'black')}} className="far fa-image"></i>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('note-video')}} style={{color: (inputType === 'note-video' ? 'red' : 'black')}} className="fab fa-youtube"></i>
                </div>
                <button tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={onAddNote} ref={addNote} className="add-note-btn">add note</button>
            </form>
        </section>
    )
}