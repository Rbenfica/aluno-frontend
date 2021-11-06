import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
 
interface ITurma{
    id: number;
    nome: string;
    ra: string;
    data_de_nascimento: string;
    endereço: string;
    matriculado: boolean;
    idade: string;
}
 
const Detail: React.FC = () => {
 
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [turma, setTurma] = useState<ITurma>()
 
    function back(){
        history.goBack()
    }
 
    async function findTurma(){
        const response = await api.get<ITurma>(`/Turma/${id}`)
        console.log(response)
        setTurma(response.data)
    }
 
    useEffect(() => {
        findTurma()
    }, [id])
 
    return (
        <div className="container">
            <br />
            <div className="turma-header">
                <h1>Dados do aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
 
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{turma?.nome}</Card.Title>
                    
                    <Card.Text>
                    <span>RA: </span>{turma?.ra}
                    <br/>
                    <span>Data de nascimento: </span>{turma?.data_de_nascimento}
                    <br/>
                    <span>Endereço: </span>{turma?.endereço}
                    <br/>
                    <span>Matricula: </span>{turma?.matriculado ? "Matriculado" : "Sem matricula"}
                    <br />
                    <span>Idade: </span>{turma?.idade}
                    </Card.Text>
                </Card.Body>
            </Card>
 
        </div>
    );
}
 
export default Detail;