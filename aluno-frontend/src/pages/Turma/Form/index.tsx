import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';
 
interface ITurma{
    nome: string;
    ra: string;
    data_de_nascimento: string;
    endereço: string;
    idade: string;
}
 
const Turma: React.FC = () => {
    
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
 
    const [model, setModel] = useState<ITurma>({
        nome: '',
        ra: '',
        data_de_nascimento: '',
        endereço: '',
        idade: ''
    })
 
    useEffect(() => {
        console.log(id)
        if (id != undefined) {
            findTurma(id)
        }
    }, [id])
 
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
 
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
 
        if (id != undefined) {
            const response = await api.put(`/Turma/${id}`, model)
        }
        else{
            const response = await api.post('/Turma', model)
        }
        back()
    }
 
    function back(){
        history.goBack()
    }
 
    async function findTurma(id: string){
        const response = await api.get(`Turma/${id}`)
        console.log(response)
        setModel({
            nome: response.data.nome,
            ra: response.data.ra,
            data_de_nascimento: response.data.data_de_nascimento,
            endereço: response.data.endereço,
            idade: response.data.idade
        })
    }
 
    return (
        
        <div className="container">
            <br />
            <div className="turma-header">
                <h1>Novo aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome do aluno:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
 
                    <Form.Group>
                        <Form.Label>RA:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="ra"
                            value={model.ra}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de nascimento (DD/MM/AAAA):</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="data_de_nascimento"
                            value={model.data_de_nascimento}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Endereço:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="endereço"
                            value={model.endereço}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Idade:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="idade"
                            value={model.idade}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
 
                    <Button variant="dark" type="submit" className="salvar">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
 
export default Turma;