import React, { Component } from 'react';
import './App.css';
import RoundedCheckbox from './components/round-checkbox/Round';
import StarCheckbox from './components/star-checkbox/Star';

import axios from 'axios';

import datas from './data/datas';

// const API = 'http://www.fdj.fr/apigw/rtg/rest/euromillions';

interface Props {}

interface State {
  score: Array<any>,
  isLoading: Boolean,
  amount: Number,
  etoile: Number,
  nombres: Array<Number>
}


class App extends Component <Props, State>{

  constructor(props:Props) {
    super(props);

    this.state = {
      score: [],
      isLoading: false,
      amount: 0,
      etoile: 0,
      nombres: []
    };

  }

  // getData = async () => {
  //   this.setState({ isLoading: true });
  //   await axios.get(API)
  //     .then(result => {
  //       this.setState({
  //         score: result,
  //         isLoading: false
  //       });
  //       console.log(result)
  //     }
  //     )
  //     .catch(error => this.setState({
  //       error,
  //       isLoading: false
  //     }));
  // }


  getDatas = async () => {
    this.setState({ isLoading: true });

    await this.setState({
      score: datas
    })
    
    this.setState({ isLoading: false });
  }

  handleOnChange = (e:any) => {
    if (e.target.type == 'radio') {
    
      let n = parseInt(e.target.value);
      this.setState({
         etoile: n,
         amount:0
      })
      let array = [...this.state.nombres];
        array.forEach(nombre => {
          let tempattern = [nombre, n]
          this.state.score.map(element => {
            console.log('fdj pattern: ' + element.pattern)
            console.log('Jc pattern: ' + tempattern)
            let resultat = this.compareArray(tempattern, element.pattern)
            console.log(resultat)
            if (resultat) {
              this.setState(prevState => ({
                amount: prevState.amount + element.cost.value
              }))
            }
          });
        });   
      console.log(e.target.value)   
    } else {
    let n = parseInt(e.target.value);

    if (this.state.nombres.indexOf(n) == -1) {
      this.setState(prevState => ({
        nombres: [...prevState.nombres, n]
      }))
      let tempattern = [n, this.state.etoile]
      this.state.score.map(element => {
        console.log('fdj pattern: ' + element.pattern)
        console.log('Jc pattern: ' + tempattern)
        let resultat = this.compareArray(tempattern, element.pattern)
        console.log(resultat)
        if (resultat) {
          this.setState(prevState => ({
            amount: prevState.amount + element.cost.value
          }))
        }
      });
    } else {
      let array = [...this.state.nombres];
      let index = array.indexOf(n)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({
          nombres: array,
          amount:0
        });
        array.forEach(nombre => {
          let tempattern = [nombre, this.state.etoile]
          this.state.score.map(element => {
            console.log('fdj pattern: ' + element.pattern)
            console.log('Jc pattern: ' + tempattern)
            let resultat = this.compareArray(tempattern, element.pattern)
            console.log(resultat)
            if (resultat) {
              this.setState(prevState => ({
                amount: prevState.amount + element.cost.value
              }))
            }
          });
        })
      }

    }  
  }
  }
   

  getAmount(){
    return this.state.amount;
  }
  

  compareArray(arr1:any, arr2:any) {

    return JSON.stringify(arr1) == JSON.stringify(arr2);

  }

  componentDidMount() {
    // axios.get('http://www.fdj.fr/apigw/rtg/rest/euromillions') cette appel api renvoi les données comm prévu
    //   .then(json => console.log(json));

    // this.getData();
   this.getDatas();
   
  }

  render() {
    
    
    return (
      <div className="App center">
        <div className="leftSide">
            <div className="topleft">
               <h3>Grille 1</h3>
            </div>
            <div className="bottomleft">
                
            
                <RoundedCheckbox
              onChange={(e:any) => this.handleOnChange(e)}
                />
            

            </div>
        </div>
        <div className="rightSide">
             <div className="topright">
                <span className="montant">Mise totale {this.getAmount().toString()} €</span>
             </div>
             <div className="bottomright">
         
                <StarCheckbox
                  onChange={(e:any) => this.handleOnChange(e)}
                />
           
             </div>
        </div>
      </div>
    );
  }
}

export default App;
