import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import TurmaForm from './pages/Turma/Form';
import TurmaDetail from './pages/Turma/Detail';
import Turma from './pages/Turma';
 
const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/alunos" exact component={Turma} />
            <Route path="/aluno_cadastro" exact component={TurmaForm} />
            <Route path="/aluno_cadastro/:id" exact component={TurmaForm} />
            <Route path="/alunos/:id" exact component={TurmaDetail} />
        </Switch>
    );
}
 
export default Routes;