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
mutation updateUserql($id:ID!,$nombres:String,$apellidos:String,$identificacion:String,$numIdentificacion:String,$Carrera:String,$email:String){
  updateUser(id:$id,input:{
    nombres:$nombres
    apellidos:$apellidos
    identificacion:$identificacion
    numIdentificacion:$numIdentificacion
    Carrera:$Carrera
    email:$email
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
mutation newProject($tittle:String!,$description:String!,$Horas:String!){
  createProject(input:{
    tittle:$tittle
    description:$description
    Horas:$Horas
  }){
    Project{
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
mutation deleteTeacher($idCourse:ID!, $idTeacher:ID!){
  delTeacher(idCourse:$idCourse,idTeacher:$idTeacher)
}
`
export const addTeacherql = gql` 
mutation addTeacher($idTeacher:ID!, $idProject:ID!){
  addTeacher(idTeacher:$idTeacher,idProject:$idProject) {
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
mutation addStude($idStudent:ID!,$idProject:ID!){
  addStudent(idStudent:$idStudent,idProject:$idProject){
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
mutation delStudentql($idProject:ID!, $idStudent:ID!){
  delStudent(idProject:$idProject,idStudent:$idStudent)
}
`
export const validateql =gql` 
mutation validateToken($token:String!){
  validate(token:$token) {
    id
    nombres
    rol
    validacion
    error{
      path
      message
    }
  }
}
`