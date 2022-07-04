import { Component } from "react";
import { name } from "../package.json";
import { List, Modal, Button, Error, Form } from "./components";

// Assign the backend base url here
export const NODE_APP_URL = "http://localhost:8001/fixtures";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: undefined,
      showModal: false,
      formValues: {},
      formError: undefined,
      load:false
    }
    // this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount = () => {
    this.fetchData();
  };

  // Function to Show the Modal component
  showModalHandler = () => {
     // Your code goes here
     this.setState({showModal:true})
  }

  // Function to Hide the Modal component
  closeModalHandler = () => {
     // Your code goes here
     this.setState({showModal:false})
     this.setState({ formValues: {}})
     this.setState({ formError: undefined});
     this.setState({ error: undefined});
  }

  // Handles all input entered in the form component
  // and stores the values in the state variable "formValues" of Object type
  // formValues is a key-value pair of input elements { name: "value", name1: "value1" }
  inputChangeHandler = (e) => {
    const { name, value, type } = e.target;
    let { formValues } = this.state;
    formValues = { ...formValues, [name]: type === "number" ? parseInt(value) : value };
    this.setState({ formValues });
  }

  // Fetch data from the api
  // use NODE_APP_URL variable for the url in fetch method
  // NODE_APP_URL variable is assigned in the top of this file (src/App.js).
  fetchData = async () => {
    // Your code goes here
    // Fill up the code required for posting data to backend 
    const obj = await fetch(NODE_APP_URL)
      .then(response => response.json())
      .then(json => { 
        return json;
      })
      .catch(error => {
        this.setState({error :error});
      });
      this.setState({data :obj});
      this.setState({load:true})
      console.log(this.state.data);

    };

  // SubmitHandler should be used to create a record i.e., to execute post request to backend
  // On success of post request close modal and fetch call fetchData method again.
  // On Error set the error message in the banner.
  submitHandler = async (e) => {
    e.preventDefault();
    const { formValues } = this.state;
    console.log(formValues);
   
    await fetch(NODE_APP_URL, {
      // Your code goes here
      // Fill up the params required for posting data to backend
        method: "post",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formValues)
    })  
      .then((response) => response.json())
      .then((res) => {
        
        if (res.error) this.setState({ formError: res.error });
        else {     
          this.fetchData();
          this.closeModalHandler();
        }
        // console.log(res)
         console.log(this.state.formError)
      });
      
  }

  render() {
    const { showModal, error, data, formError,formValues,load } = this.state;

    return (
      <div className="app">
        <div className="app-body">
          <h2 className="app-title">{name.replace(/_/g, ' ')}</h2>
          <Error message={error} />
          {load ? ( <List data={data} />) : null}
          <div className="footer-controls">
            {/* Your code goes here */}
            {/* Render a Button that will display the Modal */}
            <Button onClick={this.showModalHandler} className="success">
              Add
            </Button>
          </div>
        </div>

        <Modal show={showModal} closeHandler={this.closeModalHandler}>
          {/* Your code goes here */}
          {/* Render the Form component here */}
          <Form title="Add" inputOnChangeHandler={this.inputChangeHandler} onSaveHandler={this.submitHandler} error={formError}/>
        </Modal>
      </div>
    );
  }
}

export default App;
