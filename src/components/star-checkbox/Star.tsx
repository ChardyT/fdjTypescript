import React, { Component } from 'react'
import './Star.scss'

interface Props {
    onChange: any,
}

interface State {
    
}

class Star extends Component<Props, State> {
    
     constructor(props:Props) {
       super(props)
     
       this.state = {
           
       };
     };



    render() {
        const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const {onChange} = this.props;
        return (
            <div className="stars">
                {stars.map(star =>  (
                    <div className="rating">
                        <label>
                            <input type="radio"
                                name="starchoice"
                                value={star}
                                key={star.toString()}
                                onChange={onChange}
                            />
                            <div className="star">
                                <i className="fas fa-star staricon">
                                    <span className="startext">{star}</span>
                                </i>
                            </div>
                        </label>
                    </div>
                    )
                )}
            
            </div>
        )
    }
}


export default Star;