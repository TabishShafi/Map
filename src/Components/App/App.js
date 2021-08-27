import React, { Component } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='col-12 col-sm-12 d-flex justify-content-center'>
          <div className="card" style={{width: '30rem'}}>
            <div className="card-header text-center">
              <h2>Map Project </h2>
            </div>
            <div className="card-body text-center">
              <form>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              </form>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
