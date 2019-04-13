import React, { Component } from 'react'
import './Round.scss'

interface Props {
    onChange:any,
}

interface State {
   
}

 class Round extends Component<Props, State> {

   constructor(props: Props) {
     super(props)

     this.state = {
      
     };
   };



  render() {

    const boules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
      38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

      const {onChange} = this.props;

    return (
      <div className="choices">
        {boules.map(boule => (
          <label className="label">
            <input className="label__checkbox"
              type="checkbox"
              name="choix"
              value={boule}
              key={boule.toString()}
              onChange={onChange}
            />
            <span className="label__text">
              <span className="label__check">{boule}</span>
            </span>
          </label>
          )
        )}
            
      </div>
    )
  }
}


export default Round;