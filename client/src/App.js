import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Route, Switch, Redirect  } from 'react-router-dom'
import httpUser from './httpUser'

import LogIn from "./views/LogIn.js"
import SignUp from "./views/SignUp"
import LogOut from "./views/LogOut"
import Dashboard from "./views/Dashboard.js"
import Home from "./views/Home/Home"
import Tabs from "./views/Tabs"
import Questions from "./views/Questions/Questions"
import Services from "./views/Services/Services"
import NotFound from "./views/NotFound"
import NavBar from "./views/NavBar/NavBar.js"
import ProductList from './views/Products/ProductList'
import Orders from './views/Orders/Orders'
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
    const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());
    const [commentList, setCommentList] = useState([]);
    const [serviceList, setServiceList] = useState([]);

    useEffect(() => {
      axios.get('comments/getComments')
          .then(res => {
              if (res.data.success) {
                  setCommentList(res.data.comments)
              } else {
                  alert('Failed to get comments')
              }
          })

      axios.get('services/getServices')
          .then(res => {
              if (res.data.success) {
                  setServiceList(res.data.services)
              } else {
                  alert('Failed to get services')
              }
          })

    }, [])

    const onLoginSuccess = () => {
        setCurrentUser(httpUser.getCurrentUser());
    };

    const logOut = () => {
        httpUser.logOut();
        setCurrentUser(null);
    };

    const updateComment = (newComment) => {
      // i was trying to get the new comments display at the top but when you refresh the page they go back to the top and i think it has to do with .map
      let list = newComment
      setCommentList(list.concat(commentList))
      //setCommentList(commentList.concat(newComment))
    }

    const removeComment = (deletedCommentId) => {
      setCommentList(commentList.filter(comment => comment._id !== deletedCommentId && comment.responseTo !== deletedCommentId));
    }

    const updateService = (newService) => {
      // i was trying to get the new comments display at the top but when you refresh the page they go back to the top and i think it has to do with .map
      let sList = newService
      setServiceList(sList.concat(serviceList))
      //setServiceList(serviceList.concat(newService))
    }

    const removeService = (deletedServiceId) => {
      setServiceList(serviceList.filter(service => service._id !== deletedServiceId && service.responseTo !== deletedServiceId));
    }



  return (
    <div>
      <NavBar currentUser={currentUser} />
	  <Tabs currentUser={currentUser} />

      <Switch>
        <Route path="/login" render={(props) => {
          return <LogIn {...props} onLoginSuccess={onLoginSuccess} />
        }} />
        <Route path="/signup" render={(props) => {
          return <SignUp {...props} onSignUpSuccess={onLoginSuccess} />
        }} />
        <Route path="/logout" render={(props) => {
          return <LogOut {...props} onLogOut={logOut} />
        }}/>
        <Route path="/dashboard" render={() => {
          return currentUser ? <Dashboard /> : <Redirect to="/login" />
        }}/>
        <Route path="/cart" render={() => {
          return currentUser ? <ProductList user={currentUser} /> : <Redirect to="/login" />  // necessary? does not show on nav bar unless logged in
        }}/>
        <Route path="/questions" render={() => {
          return currentUser ? <Questions user={currentUser} refresh={updateComment} remove={removeComment} commentList= {commentList}/> : <Redirect to="/login" />
        }}/>
        <Route path="/service" render={() => {
          return currentUser ? <Services user={currentUser} refresh={updateService} remove={removeService} serviceList= {serviceList}/> : <Redirect to="/login" />
        }}/>
        <Route path="/order" render={() => {
          return currentUser ? <Orders user={currentUser}/> : <Redirect to="/login" />
        }}/>

        <Route exact path="/Home" render={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route render={NotFound}/>
      </Switch>
    </div>
  );
};

export default App;
