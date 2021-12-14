import React from "react";
import { gql } from '@apollo/client'

export const loginql = gql`
mutation loginUsername($username:String!,$password:String!){
    login(input:{
        username:$username
        password:$password
    }) {
        login
        token
        error{
            path
            message
          }
      }
}
`
export const registerql = gql`
mutation register($nombres:String!, $apellidos:String!, $username:String!,$email:String!, $password:String!,$rol:String!){
    registro(input:{
      nombres:$nombres
      apellidos:$apellidos
      username:$username
      email:$email
      password:$password
      rol:$rol
    }){
      user{
        _id
        nombres
        apellidos
        email
        rol
      }
      register
      error{
        path
        message
      }
    }
  }
`
export const updateUserql = gql`
mutation updateUserql($email:String!,$nombres:String,$apellidos:String,$identificacion:String,$numIdentificacion:String,$Carrera:String,$Estado:String){
  updateUser(email:$email,input:{
    nombres:$nombres
    apellidos:$apellidos
    identificacion:$identificacion
    numIdentificacion:$numIdentificacion
    Carrera:$Carrera
    email:$email
    Estado:$Estado
  }) {
    update
    user{
      nombres
      apellidos
      rol
      email
      identificacion
      numIdentificacion
      Carrera
    }
    error{
      path
      message
    }
  }
}
`
export const createProjectql = gql`
mutation newProject($tittle:String!,$description:String!,$Horas:String!,$email:String!){
  createProject(email:$email,input:{
    tittle:$tittle
    description:$description
    Horas:$Horas
  }){
    Project{
      _id
      tittle
      description
    }
    create
    error{
      path
      message
    }
  }
}
`
export const delTeacherql =gql` 
mutation deleteTeacher($idCourse:ID!, $email:String!){
  delTeacher(idCourse:$idCourse,email:$email)
}
`
export const addTeacherql = gql` 
mutation addTeacher($email:String!, $idProject:ID!){
  addTeacher(email:$email,idProject:$idProject) {
    project{
      _id
      tittle
      description
      Horas
      lider{
        nombres
      }
      people{
        nombres
      }
    }
    error{
      path
      message
    }
    add
  }
}
`
export const updateProjectql = gql` 
mutation updateProj($id:ID!,$tittle:String,$description:String,$Horas:String){
  updateProject(id:$id,input:{
    tittle:$tittle
    description:$description
    Horas:$Horas
  }){
    Project{
      tittle
      description
      Horas
    }
    update
    error{
      path
      message
    }
  }
}
`
export const addStudentql =gql ` 
mutation addStude($email:String!,$idProject:ID!){
  addStudent(email:$email,idProject:$idProject){
    project{
      tittle
    }
    add
    error{
      path
      message
    }
  }
}
`
export const delStudentql =gql` 
mutation delStudentql($idProject:ID!, $email:String!){
  delStudent(idProject:$idProject,email:$email)
}
`
export const validateql =gql` 
mutation validateToken($token:String!){
  validate(token:$token) {
    id
    nombres
    email
    rol
    validacion
    Estado
    error{
      path
      message
    }
  }
}
`