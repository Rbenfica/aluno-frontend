import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './index.css';
 
interface ITurma{
    id: number;
    nome: string;
    ra: string;
    data_de_nascimento: string;
    endereço: string;
    matriculado: boolean;
    idade: string;
}
 
const Turma: React.FC = () => {
 
    const [turma, setTurma] = useState<ITurma[]>([])
    const history = useHistory()
 
    useEffect(() => {
        loadTurma()
    }, [])
 
    async function loadTurma() {
        const response = await api.get('/Turma')
        console.log(response);
        setTurma(response.data)
    }
 /////////////////////////
    function newTurma(){
        history.push('/aluno_cadastro')
    }
 
    function editTurma(id: number){
        history.push(`/aluno_cadastro/${id}`)
    }
 
    function viewTurma(id: number){
        history.push(`/alunos/${id}`)
    }
 
    async function finishedTurma(id: number){
        await api.patch(`/Turma/${id}`)
        loadTurma()
    }
 
    async function deleteTurma(id: number){
        await api.delete(`/Turma/${id}`)
        loadTurma()
    }
 
    return (
        
        <div className="container">
            <br />
            <div className="turma-header">
                <h1>Alunos</h1>
                <Button variant="dark" size="sm" onClick={newTurma}>Incluir novo aluno</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Data de nascimento</th>
                    <th>Endereço</th>
                    <th>Matricula</th>
                    <th>Idade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        turma.map(turma => (
                            <tr key={turma.id}>
                                <td>{turma.id}</td>
                                <td>{turma.nome}</td>
                                <td>{turma.ra}</td>
                                <td>{turma.data_de_nascimento}</td>
                                <td>{turma.endereço}</td>
                                <td>{turma.matriculado ? "Matriculado" : "Sem matricula"}</td>
                                <td>{turma.idade}</td>
                                <td>
                                    <Button size="sm" disabled={turma.matriculado} variant="primary" onClick={() => editTurma(turma.id)}>Editar</Button>{' '}
                                    <Button size="sm" disabled={turma.matriculado} variant="success" onClick={() => finishedTurma(turma.id)}>Matricular</Button>{' '}
                                    <Button size="sm" variant="warning" onClick={() => viewTurma(turma.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteTurma(turma.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
 
export default Turma;