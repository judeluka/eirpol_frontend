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
  // const [TDData, setTDData] = useState({hits: []})


//  const fetchData = () => {
//     axios.get('http://localhost:8080/api')
//     .then((response) =>  {
//       const data = response.data
//       setTDData(data)
//       console.log('Data has been received')
      
//     })
//     .catch(() => {
//       alert('Error retrieving data');
//     });
    
//   }

  // useEffect(() => {


  //   fetchData()
  //   console.log(TDData)

  // }, []);
  











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
              <Dashboard/>
            </Route>
            <Route path={"/tdlist"}>
            <TDList />
            </Route>
            <Route path={"/td/michaelmartin"}>
              <TDPage />
            </Route>
            <Route path={"/design"}>
              <TDList />
            </Route>
            <Route exact path={"/content-2"}>
              <Content2 />
            </Route>
            <Route path={"/content-2/courses"}>
              <Courses2 />
            </Route>
            <Route path={"/content-2/videos"}>
              <Videos2 />
            </Route>
            <Route path={"/design-2"}>
              <Design2 />
            </Route>
          </Switch>
        
      </Router>
      <Footer>
        
      </Footer>
    </div>
  );
}

export default App;