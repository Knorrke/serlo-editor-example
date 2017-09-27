import React, {Component} from 'react'

class Spoiler extends Component {
    state = {
        hidden: true
    }

    onToggle = () => {
        this.setState({hidden: !this.state.hidden})
    }

    render() {
        const {children, state: {title}} = this.props
        return (
            <div className="spoiler">
                <div className="spoiler-title" onClick={this.onToggle}>
                        <span className={this.state.hidden
                            ? "fa fa-caret-square-o-down"
                            : "fa fa-caret-square-o-up"
                        }/>
                    { title }
                </div>

                <div className="spoiler-content" style={{display: this.state.hidden ? 'none' : 'block'}}>
                    {children}
                </div>
            </div>
        )
    }
}

export default Spoiler