//TO DO:
//

"use strict";

var myObj = [{
  recipe: "Pizza",
  ingredients: ["dough", "Cheese", "tomato sauce"]
}, {
  recipe: "Omlette",
  ingredients: ["eggs", "bacon", "avocado", "cheese", "salsa"]
}];
//localStorage.test = JSON.stringify(myObj);
// console.log(localStorage.getItem("test"));
//var test = JSON.parse(localStorage.test);
// document.getElementById("test").innerHTML = test[0].ingredients;

var Well = ReactBootstrap.Well;
var Panel = ReactBootstrap.Panel;
var Accordion = ReactBootstrap.Accordion;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;

var RecipeBox = React.createClass({
  displayName: "RecipeBox",

  getInitialState: function getInitialState() {
    // creates empty variable
    return {
      myRecipes: [],
      showAdd: false,
      showEdit: false,
      oldRec2Edit: "",
      valR: "",
      valI: ""
    };
  },
  open: function open(modal, rec) {
    if (modal == "edit") {
      this.setState({ oldRec2Edit: rec.recipe, valR: rec.recipe, valI: rec.ingredients, showEdit: true });
    } else if (modal == "add") {
      this.setState({ showAdd: true });
    }
  },
  close: function close(modal) {
    if (modal == "add") {
      this.setState({ valR: "", valI: "", showAdd: false });
    } else if (modal == "edit") {
      this.setState({ valR: "", valI: "", showEdit: false });
    }
  },
  handleChangeR: function handleChangeR(e) {
    this.setState({ valR: e.target.value });
  },
  handleChangeI: function handleChangeI(e) {
    this.setState({ valI: e.target.value });
  },
  updateLocalStorage: function updateLocalStorage(modal, rec2edit) {
    // first 4 lines are to help correct issues w/empty data
    var newR = this.state.valR;
    var newI = this.state.valI;
    if (newR == "") {
      newR = "Undefined" + (JSON.parse(localStorage._rooster3_recipes).length + 1);
    }
    if (newI == "") {
      newI = "None.";
    }
    // next part is to convert string->array even if there is only one ingredient.
    var iFix = [];
    if (!newI.includes(",")) {
      iFix[0] = newI;
    } else {
      iFix = newI.split(",");
    }
    // pull data from LS, update it, and re-store the whole thing
    var myArray = JSON.parse(localStorage._rooster3_recipes);
    myArray.push({
      recipe: newR,
      ingredients: iFix
    });
    localStorage._rooster3_recipes = JSON.stringify(myArray);

    if (modal == "add") {
      this.setState({ valR: "", valI: "", myRecipes: JSON.parse(localStorage._rooster3_recipes) });
    } else if (modal == "edit") {
      console.log("edit button called on: " + rec2edit);
      this.deleteItem(rec2edit); //THIS NEEDS UPDATING!!!!!!!
      // idea is to store the "current recipe" to a state value
      //and then pull that here when passing the delete thing instead of  "rec.recipe"
    }
    this.close(modal);
  },
  deleteItem: function deleteItem(item) {
    console.log("Delete called on: " + item);
    // pull LS array json parse
    var myArray = JSON.parse(localStorage._rooster3_recipes);
    //function to locate item in array
    function findItem(rec) {
      return rec.recipe === item;
    }
    var deleteMe = myArray.indexOf(myArray.find(findItem));
    //console.log(deleteMe);
    // splice the one with this name (item=rec.recipe)
    myArray.splice(deleteMe, 1);
    // jsonify and restore new version of LS array
    localStorage._rooster3_recipes = JSON.stringify(myArray);
    // update state of myRecipes
    this.setState({ myRecipes: JSON.parse(localStorage._rooster3_recipes) });
  },
  checkLS: function checkLS() {
    // loads local storage or creates starter object into it
    if (localStorage._rooster3_recipes) {
      this.setState({ myRecipes: JSON.parse(localStorage._rooster3_recipes) });
    } else {
      localStorage._rooster3_recipes = JSON.stringify(myObj);
      this.setState({ myRecipes: JSON.parse(localStorage._rooster3_recipes) });
    }
  },
  componentDidMount: function componentDidMount() {
    //once react loadds, run localstorage check function
    this.checkLS();
  },
  render: function render() {
    var _this2 = this;

    var recipeList = this.state.myRecipes.map(function (rec) {
      var _this = this;

      return React.createElement(
        Panel,
        { bsStyle: "success", header: rec.recipe, eventKey: rec.recipe, key: rec.recipe },
        React.createElement(
          "h4",
          null,
          "Ingredients"
        ),
        React.createElement(
          ListGroup,
          null,
          rec.ingredients.map(function (ing) {
            return React.createElement(
              ListGroupItem,
              { key: ing },
              ing
            );
          })
        ),
        React.createElement(
          Button,
          { onClick: function onClick() {
              return _this.open("edit", rec);
            }, bsStyle: "default" },
          "Edit"
        ),
        " ",
        React.createElement(
          Button,
          { onClick: function onClick() {
              return _this.deleteItem(rec.recipe);
            }, bsStyle: "danger" },
          "Delete"
        )
      );
    }, this);
    return React.createElement(
      "div",
      { className: "main" },
      React.createElement(
        "h1",
        null,
        "A Recipe Box"
      ),
      React.createElement(
        Well,
        null,
        React.createElement(
          Accordion,
          null,
          recipeList
        ),
        React.createElement(
          Button,
          { bsStyle: "primary", onClick: function onClick() {
              return _this2.open("add");
            } },
          "Add Recipe"
        )
      ),
      React.createElement(
        Modal,
        { show: this.state.showAdd, onHide: function onHide() {
            return _this2.close("add");
          } },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            "Add a New Recipe"
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(
              FormGroup,
              {
                controlId: "formBasicText" },
              React.createElement(
                ControlLabel,
                null,
                "Recipe"
              ),
              React.createElement(FormControl, {
                type: "text",
                value: this.state.valR,
                placeholder: "Recipe Name",
                onChange: this.handleChangeR
              }),
              React.createElement("br", null),
              React.createElement(
                ControlLabel,
                null,
                "Ingredients"
              ),
              React.createElement(FormControl, {
                type: "text",
                value: this.state.valI,
                placeholder: "List of ingredients separated by commas",
                onChange: this.handleChangeI
              })
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: function onClick() {
                return _this2.close("add");
              } },
            "Close"
          ),
          React.createElement(
            Button,
            { onClick: function onClick() {
                return _this2.updateLocalStorage("add");
              }, bsStyle: "primary" },
            "Add Recipe"
          )
        )
      ),
      React.createElement(
        Modal,
        { show: this.state.showEdit, onHide: function onHide() {
            return _this2.close("edit");
          } },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            "Edit Recipe"
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(
              FormGroup,
              {
                controlId: "editModal" },
              React.createElement(
                ControlLabel,
                null,
                "Recipe"
              ),
              React.createElement(FormControl, {
                type: "text",
                value: this.state.valR,
                placeholder: "Recipe Name",
                onChange: this.handleChangeR
              }),
              React.createElement("br", null),
              React.createElement(
                ControlLabel,
                null,
                "Ingredients"
              ),
              React.createElement(FormControl, {
                type: "text",
                value: this.state.valI,
                placeholder: "List of ingredients separated by commas",
                onChange: this.handleChangeI
              })
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: function onClick() {
                return _this2.close("edit");
              } },
            "Close"
          ),
          React.createElement(
            Button,
            { onClick: function onClick() {
                return _this2.updateLocalStorage("edit", _this2.state.oldRec2Edit);
              }, bsStyle: "primary" },
            "Edit Recipe"
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('container'));