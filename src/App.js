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
import Header from './header';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/allUsers' element={<GetUsers />} />
        <Route path='/updateUser' element={<UpdateUser />} />
        <Route path='/user' element={<GetUser />} />
        <Route path='/createCourse' element={<Course />} />
        <Route path='/getProjects' element={<GetCourses />} />
        <Route path='/getProjectsAdmi' element={<GetCoursesAdmi />} />
        <Route path='/editProject' element={<UpdateCourse />} />
        <Route path='/courseteacher' element={<CourseTeacher />} />
        <Route path='/editProjectTeacher' element={<EditProjectTeacher />} />
      </Routes>
    </div>
  );
}

export default App;
