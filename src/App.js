import "./App.css";
import SideMenu, { menuItems } from "./components/SideMenu/SideMenu";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MultilineAppV3 from "./components/MultilineChartV3/MultilineAppV3";
import TDPage from "./components/TDPage/TDPage";
import TDList from "./components/TDList/TDList";
import { axisBottom } from "d3";
import axios from 'axios'
import { Component } from "react";
import Footer from "./components/Footer/Footer";


const Content = () => <h1>Content</h1>;
const Courses = () => <h1>Content/Courses</h1>;
const Videos = () => <h1>Content/Videos</h1>;
const Design = () => <h1>Design</h1>;
const Content2 = () => <h1>Content2</h1>;
const Courses2 = () => <h1>Content/Courses 2</h1>;
const Videos2 = () => <h1>Content/Videos 2</h1>;
const Design2 = () => <h1>Design 2</h1>;

function App() {


  const [inactive, setInactive] = useState(false);
  const [TDData, setTDData] = useState(null)


    useEffect(() => {
    axios.get('https://eirpol.herokuapp.com/api').then((response) => {
      setTDData(response.data);
    });
  }, [])


    if(!TDData) return null;

  return (
    <div className="App">
      <Router>

        <Navbar/>
          {/* improvememt, not recorded in video, its just looping through menuItems
          instead of hard coding all the routes */}
          {/* {menuItems.map((menu, index) => (
            <>
              <Route key={menu.name} exact={menu.exact} path={menu.to}>
                <h1>{menu.name}</h1>
              </Route>
              {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map((subMenu, i) => (
                    <Route key={subMenu.name} path={subMenu.to}>
                      <h1>{subMenu.name}</h1>
                    </Route>
                  ))
                : null}
            </>
          ))} */}

          <Switch>
            <Route exact path={"/"}>
              <Dashboard data={TDData}/>
            </Route>
            <Route path="/TDs">
            <TDList data={TDData}/>
            </Route>
            <Route path="/:TD">
              <TDPage data={TDData}/>
            </Route>
          </Switch>
      </Router>
      <Footer>  
      </Footer>
    </div>
  );
}

export default App;