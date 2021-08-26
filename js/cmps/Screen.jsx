export function Screen({ isOpen, closeModal, }) {

    return (

        <div onClick={() => { closeModal(null) }} className={`screen ${(isOpen ? 'screen-on' : '')}`}>

        </div>
    )
}