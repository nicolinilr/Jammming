import React from "react";
import '/Track.css';

export class Track extends React.Component {
    render() {
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3><!-- track name will go here --></h3>
                    <p><!-- Track artist will go here --> | <!-- track album will go here --></p>
                </div>
                <button className='Track-action'>{this.props.isRemoval ? '-' : '+'}</button>
            </div>
        );
    }
}