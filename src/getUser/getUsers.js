import React from "react";
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsersql } from '../queries/queries'
import { Button, Table } from 'react-bootstrap';
import './getUsers.css'
function GetUsers() {
    const { data } = useQuery(getUsersql)

    return (
        <div className="container">
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getUsers.map((val, key) => {
                        return (
                            <tr>
                                <td>{key+1}</td>
                                <td>{val.nombres}</td>
                                <td>{val.apellidos}</td>
                                <td>{val.email}</td>
                                <td>
                                    <Button className="opciones">Ob</Button>
                                    <Button className="opciones">Not</Button>
                                    <Button className="opciones">Del</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default GetUsers;