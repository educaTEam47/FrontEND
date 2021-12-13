import React from "react";
import { gql } from '@apollo/client'

export const getUsersql = gql`
    query{
        getUsers {
        nombres
        apellidos
        email
        rol
        }
    }
    `
export const getUserql = gql`
query user($id:ID!){
    getUser(id:$id){
        user{
            _id
            nombres
            apellidos
            rol
            email
            identificacion
            numIdentificacion
            Carrera
            cursos{
              _id
              tittle
              description
              Horas
            }
        }
        search
        error{
          path
          message
        }
    }    
}
`
export const getProjects = gql`
query{
    getProjects {
      _id
      tittle
      description
      Horas
    }
  }
`
export const getCourseql = gql`
query getCourse($id:ID!){
  getProject(id:$id){
    tittle
    description
    Horas
    lider{
      _id
      nombres
      apellidos
      email
      rol
    }
    people{
      _id
      nombres
      apellidos
      email
      rol
    }
  }
}
`

