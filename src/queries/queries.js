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
            nombres
            apellidos
            rol
            email
            identificacion
            numIdentificacion
            Carrera
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
      tittle
      description
      Horas
    }
  }
`

