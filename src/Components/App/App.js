import React, { Component } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Web3 from "web3";

const contractAddress = "0xE7e6AB60564d742453932b7728Aa0890324B93E7";

const ABI = [
        {
          "inputs": [
            {
              "internalType": "int32",
              "name": "_latitude",
              "type": "int32"
            },
            {
              "internalType": "int32",
              "name": "_longitude",
              "type": "int32"
            }
          ],
          "name": "addAddress",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "viewLatitude",
          "outputs": [
            {
              "internalType": "int32",
              "name": "",
              "type": "int32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "viewLongitude",
          "outputs": [
            {
              "internalType": "int32",
              "name": "",
              "type": "int32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
]

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contract = new web3.eth.Contract(ABI, contractAddress);


class App extends Component {

  state = { latitude: 0, longitude: 0 , blockchainLatitude: 0 , blockchainLongitude: 0, address: ''}

  componentDidMount()
    {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState ({ latitude: position.coords.latitude})
                this.setState ({ longitude: position.coords.longitude})
            },
            (error) => {
                this.setState({errorMessage: error.message})
            }
        );
        this.loadWeb3();
        this.loadBlockchainData();
    } 

    loadWeb3 = async() => 
    {

      Web3.givenProvider.enable();

    }

    getCurrentAccount = async () =>
    {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }

    loadBlockchainData = async () =>  
    {
      const account = await this.getCurrentAccount();

      this.setState({address: account});

      var latitude = await contract.methods.viewLatitude().call({from: account});

      latitude = this.getjavascriptLatitude(latitude);

      this.setState({blockchainLatitude: latitude});

      var longitude = await contract.methods.viewLongitude().call({from: account});

      longitude= this.getjavascriptLongitude(longitude);

      this.setState({blockchainLongitude: longitude});
    }

    addAddress = async() => {

      const account = await this.getCurrentAccount();

      await contract.methods.addAddress(this.getSolidityLatitude(), this.getSolidityLongitude()).send({from:account});

      await this.loadBlockchainData();
    }



//  fixedNumber =()=> {
//    console.log("latitude", this.state.latitude);
//    console.log("longitude", this.state.longitude);
//   const var1 = this.state.latitude;
//   const solidityVarriableLatitude = Number(var1*10000000).toFixed(0);
//   const var2 = this.state.longitude;
//   const solidityVarriableLongitude = Number(var2*10000000).toFixed(0);

//    console.log("SVLT", solidityVarriableLatitude);
//    console.log("SVLG", solidityVarriableLongitude);

//    const javascriptVarLongitude = solidityVarriableLongitude/10000000;
//    const javascriptVarLattitude = solidityVarriableLatitude/10000000;

//    console.log("JSLG", Number(javascriptVarLattitude).toFixed(7));
//    console.log("JSLT", Number(javascriptVarLongitude).toFixed(7));
//  }

  getjavascriptLatitude=(solidityLattitude)=>{
    return(Number(solidityLattitude/10000000));
  }

  getjavascriptLongitude=(solidityLongitude)=>{
    return(Number(solidityLongitude/10000000));
  }


  getSolidityLatitude=()=>
  {
    return (Number(this.state.latitude*10000000).toFixed(0));
  }
  getSolidityLongitude=()=>
  {
    return(Number(this.state.longitude*10000000).toFixed(0));
  }

  onformSubmit =(event)=>
  {
    event.preventDefault();
    
    this.addAddress();

  }
  render() {
    return (
      <div className='container'>
        <div className='col-12 col-sm-12 d-flex justify-content-center'>
          <div className="card" style={{width: '35rem'}}>
            <div className="alert alert-primary" role="alert">
              Turn on location to automatically detect your Location 
            </div>
            <div className="card-header text-center">
              <h2>Map Project </h2>
            </div>
            <div className="card-body text-center">
              <div>
                <h5>Your Binance Address: {this.state.address}  </h5>
                <h5>Your Latitude: {this.state.latitude}</h5>
                <h5>Your Longitude: {this.state.longitude} </h5>
              </div>
              <form onSubmit={this.onformSubmit}>
                <div className="mb-3">
                  <label 
                  htmlFor="latitude" 
                  className="form-label">
                    Enter Latitude
                  </label>
                  
                  <input 
                  type="text" 
                  onChange={(event)=> this.setState({latitude: event.target.value})} 
                  className="form-control" id="latitude" placeholder="Latitude..."
                  value={this.state.latitude}>
                  </input>
                </div>
                <div className="mb-3">
                  <label 
                  htmlFor="longitude" 
                  className="form-label">
                    Enter Logitude
                  </label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="logitude" 
                  onChange={(event)=>{this.setState({longitude: event.target.value})}}
                  value={this.state.longitude}
                  placeholder="Longitude">
                  </input>
                </div>
                <button className="btn btn-info rounded-pill"
                type="submit"
                >Add to Blockchain</button>
              </form>
              
              <div>
                <h5>Location against current address on Blockchain</h5>
                <h6>Your Latitude: {this.state.blockchainLatitude}</h6>
                <h6>Your Longitude:{this.state.blockchainLongitude}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
