import React from 'react';
import {Table, Button, Form, Container, Row, Col, Modal} from 'react-bootstrap';

class crud extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            id: '',
            nome : '',
            preco : '',
            nomeatt: '',
            precoatt : '',
            produtos : [],
            produto : [],
            modalAberto: false
        };
    }

    componentDidMount(){
        this.produtos();
    }

    produtos(){
        fetch("http://127.0.0.1:8000/API/produto/")
            .then(response => response.json())
            .then((data) => this.setState({ produtos: data }))
    }

    deletarProduto = (id) => {
        fetch("http://127.0.0.1:8000/API/produto/"+id, {method:'DELETE'})
            .then(response => {
                if (response.ok){
                    this.produtos();
                }
            })
    
    }

    cadastrarProduto = (produto) => {
        fetch("http://127.0.0.1:8000/API/produto/", {
            method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(produto)            
        })
            .then(response => {
                if (response.ok){
                    this.produtos();
                }else{
                    alert('ERRO')
                }
            })
    }    
    submit = () => {
        const produto ={
            nome: this.state.nome,
            preco: this.state.preco
        }
        this.cadastrarProduto(produto);
    }
    adicionarNome = (e) => {
        this.setState({
            nome: e.target.value
        })
    }
    adicionarPreco = (e) => {
        this.setState({
            preco: e.target.value
        })
    }


    abrirModal = (produto) =>{
        fetch("http://127.0.0.1:8000/API/produto/"+produto.id)
            .then(response => response.json())
            .then((data) => this.setState({ produto: data }))
        this.setState({
            modalAberto: true,
            nomeatt: produto.nome,
            precoatt: produto.preco,
            id : produto.id
        })

    }
    atualizarProduto = (produtoatt) => {
        fetch("http://127.0.0.1:8000/API/produto/"+produtoatt.id+"/", {
            method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(produtoatt)            
        })
            .then(response => {
                if (response.ok){
                    this.produtos();
                }else{
                    alert('ERRO')
                }
            })
    }
    atualizar = () => {
        const produtoatt ={
            id: this.state.id,
            nome: this.state.nomeatt,
            preco: this.state.precoatt
        }
        this.atualizarProduto(produtoatt);
        this.fecharModal();
    }
    atualizarNome = (e) => {
        this.setState({
            nomeatt: e.target.value
        })
    }
    atualizarPreco = (e) => {
        this.setState({
            precoatt: e.target.value
        })
    }
    

    fecharModal = () =>{
        this.setState({
            modalAberto: false
        })
    }

    render(){
        return(
            <>
                <Modal show={this.state.modalAberto} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control value={this.state.nomeatt} onChange={this.atualizarNome} type="text" placeholder="Digite o nome do produto" autoFocus/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label> Valor do Produto</Form.Label>
                            <Form.Control value={this.state.precoatt} onChange={this.atualizarPreco} type="number" name="preco" min="0" step="0.01" placeholder="Digite o valor do produto"  />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.atualizar}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Form>
                    <Container>
                        <Row>
                            <Col sm={5}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nome do Produto</Form.Label>
                                    <Form.Control value={this.state.nome} onChange={this.adicionarNome} type="text" name="nome" placeholder="Digite o nome do produto" />
                                </Form.Group>
                            </Col>
                            <Col sm={5}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Preço do Produto</Form.Label>
                                    <Form.Control value={this.state.preco} onChange={this.adicionarPreco} type="number" name="preco" min="0" step="0.01" placeholder="Digite o valor do produto" />
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                            <Button variant="success" type="submit" onClick={this.submit}>
                                Adicionar
                            </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Table striped bordered hover>
                                <thead className="justify-content-center">
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.produtos.map((produto) =>
                                        <tr key={produto.id}>
                                            <td>{produto.nome}</td>
                                            <td>{produto.preco}R$</td>
                                            <td>
                                                <Button variant="warning" onClick={() => this.abrirModal(produto)}>Atualizar</Button>
                                                <Button variant="danger" onClick={() => this.deletarProduto(produto.id)}>Excluir</Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default crud