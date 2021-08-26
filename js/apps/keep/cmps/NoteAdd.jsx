export function NoteAdd({inputType, setInputType}){


    const formRef = React.createRef();
    const functionBtns = React.createRef();
    const secondInput = React.createRef();
    const addNote = React.createRef();

    const onEnterForm = (ev) => {
        // Expand
        const form = ev.target.form;
        form.classList.add('expand-form')

        //Reveal function buttons
        functionBtns.current.classList.add('inside-form-visible');
        // Reveal second input
        if(inputType !== 'text'){
            secondInput.current.classList.add('inside-form-visible');
        }
        // Reveal add button
        addNote.current.classList.add('inside-form-visible');
    }

    const onLeaveForm = (ev) => {
            // console.log(ev.target.id) 
            // Shrink
            const form = ev.target.form;
            form.classList.remove('expand-form')
            
            // UnReveal function buttons
            functionBtns.current.classList.remove('inside-form-visible');
            // UnReveal second input
            secondInput.current.classList.remove('inside-form-visible');
            // UnReveal add button
            addNote.current.classList.remove('inside-form-visible');
    }

    const onSetInputType = (type) => {
        setInputType(type);

        // Expand
        formRef.current.classList.add('expand-form')

        //Reveal function buttons
        functionBtns.current.classList.add('inside-form-visible');
        // Reveal second input
        if(type !== 'text'){
            secondInput.current.classList.add('inside-form-visible');
        }else{
            secondInput.current.classList.remove('inside-form-visible');
        }
        // Reveal add button
        addNote.current.classList.add('inside-form-visible');

    }



    return (
        <section className="notes-input notes-layout">
            <form className="notes-input-form" ref={formRef}>
                <label htmlFor="notes-title"></label>
                <input id="notes-title" type="text" placeholder="What's on your mind..." onFocus={onEnterForm} onBlur={onLeaveForm}/>
                <div className={`second-input ${inputType !== 'text' ? 'inside-form-visible' : ''}`} ref={secondInput}>
                    <label htmlFor="notes-content"></label>
                    <input   id="notes-content" type="text" placeholder={(inputType === 'todo' ? 'Let\'s make some tasks (use , to separate)' : 'Url goes here')} onFocus={onEnterForm} onBlur={onLeaveForm}/>
                </div>
                <div className="choose-type-btns" ref={functionBtns}>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('text')}} style={{color: (inputType === 'text' ? '#efc718' : 'black')}} className="far fa-file-alt"></i>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('todo')}} style={{color: (inputType === 'todo' ? '#efc718' : 'black')}} className="fas fa-list-ul"></i>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('image')}} style={{color: (inputType === 'image' ? '#efc718' : 'black')}} className="far fa-image"></i>
                    <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {onSetInputType('video')}} style={{color: (inputType === 'video' ? 'red' : 'black')}} className="fab fa-youtube"></i>
                </div>
                <button tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {console.log('add note')}} ref={addNote} className="add-note-btn">add note</button>
            </form>
        </section>
    )
}