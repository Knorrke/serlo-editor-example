import React, {Component} from 'react'
import {white, faintBlack} from 'material-ui/styles/colors'


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
            <div>
                <div className="spoiler panel panel-default" onClick={this.onToggle}>
                    <div className="spoiler-teaser panel-heading">
                        <span class={this.state.hidden
                            ? "fa fa-caret-square-o-down"
                            : "fa fa-caret-square-o-up"
                        }/>
                        { title }
                    </div>
                </div>
                <div className="content" style={{display: this.state.hidden ? 'none' : 'block'}}>
                    {children}
                </div>
            </div>
        )
    }
}

export default Spoiler