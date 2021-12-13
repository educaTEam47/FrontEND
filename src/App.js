import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login/login';
import Register from './register/register';
import Profile from './login/profile';
import GetUsers from './getUser/getUsers';
import UpdateUser from './update/updateUser';
import GetUser from './getUser/getUser';
import Course from './courses/courses';
import GetCourses from './courses/getCourses';
import GetCoursesAdmi from './courses/courseAdmi';
import UpdateCourse from './update/updateCourse';
import CourseTeacher from './courses/courseTeacher';
import EditProjectTeacher from './update/updateCourseTeacher';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem ,Container} from 'react-bootstrap';
function App() {
  return (
    <div className="App">
    <Navbar bg="light" expand="lg">
     <Container>
    <Navbar.Brand href="/">EducaTEam</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/login">Inicia</Nav.Link>
        <Nav.Link href="/register">Registrate</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path='/allUsers' element={<GetUsers/>}/>
      <Route path='/updateUser' element={<UpdateUser/>}/>
      <Route path='/user' element={<GetUser/>}/>
      <Route path='/createCourse' element={<Course/>}/>
      <Route path='/getProjects' element={<GetCourses/>}/>
      <Route path='/getProjectsAdmi' element={<GetCoursesAdmi/>}/>
      <Route path='/editProject' element={<UpdateCourse/>}/>
      <Route path='/courseteacher' element={<CourseTeacher/>}/>
      <Route path='/editProjectTeacher' element={<EditProjectTeacher/>}/>
    </Routes>
    </div>
  );
}

export default App;
