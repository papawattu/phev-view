import React from 'react'
const OnOffButton = props => <div className="btn-group pull-right">
                <button className={"btn " + (props.on === false ? "btn-default disabled" : "btn-primary")} onClick={props.offClickHandler}>
                    Off
                </button>
                <button className={"btn " + (props.on === true ? "btn-default disabled" : "btn-primary")} onClick={props.onClickHandler}>
                    On
                </button>
            </div>
    
export default OnOffButton