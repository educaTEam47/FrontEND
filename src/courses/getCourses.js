import React, { useState } from "react";
import Swal from 'sweetalert2'
import {  Button, Table } from 'react-bootstrap';
import { getProjects } from '../queries/queries'
import { useQuery } from '@apollo/client'

function GetCourses() {
    const [tittle, settittle] = useState('')
    const { data } = useQuery(getProjects)
    //console.log(data)
    return (
        <div className="container">
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del Proyecto</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getProjects.map((val, key) => {
                        return (
                            <tr>
                                <td>{key+1}</td>
                                <td>{val.tittle}</td>
                                <td>
                                    <Button className="opciones">Ob</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default GetCourses;