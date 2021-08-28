export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            folder: 'inbox',
            searchTxt: '',
            isRead: false,
            isStared: false,
        }
    }


    handleChange = ({target}) => {

        this.setState({filterBy: {...this.state.filterBy, searchTxt: target.value, folder: this.props.currentFolder}}, () => {
            this.props.onSetFilter(this.state.filterBy);
        })
    }

    blurrr = () => {
        setTimeout(this.props.onCloseMenu,50);
    }

    render(){

        const { onOpenMenu } = this.props;

        return(
            <React.Fragment>
                <i tabIndex="-1" onFocus={onOpenMenu} onBlur={this.blurrr} className="fas fa-bars folders-menu-btn"></i>
                <input type="text" placeholder="Search" onChange={this.handleChange} autoComplete="off" ></input>
            </React.Fragment>
        )
    }
}