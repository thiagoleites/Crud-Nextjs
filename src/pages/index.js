import { useState } from 'react';
import {
  Box, 
  Flex, 
  Text, 
  Button, 
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
} from '@chakra-ui/react'
import { InputForm } from '../components/Input';

export default function Home() {

  const [clients, setClients] = useState([])
  const [id, setId] = useState(null)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmitCreate = (e) => {
    e.preventDefault();
    if(!name && !email) return

    setClients(clients.concat({_id: new Date().getUTCMilliseconds().toString(), name, email}))
    // setClients(clients.map(client => client._id === id ? {name, email, _id:id} : client))

    setName('')
    setEmail('')
  }

  const handleSubmitUpdateClient = (e) => {
    e.preventDefault();
    setClients(clients.map(client => client._id === id ? {name, email, _id:id} : client))
  }

  const handleDeleteClient = (_id) => {
    setClients(clients.filter(client => client.id !== _id))
  }


  const handleChangeName = (text) => {
    setName(text);
  }
  const handleChangeEmail = (text) => {
    setEmail(text);
  }

  const handleShowUpdateClientForm = (client) => {
    setId(client._id);
    setName(client.name);
    setEmail(client.email);
  }

  return (
    <Box margin="15" padding="25" w="900px" margin="auto">
        <Heading color="black" textAlign="center">
          CRUD
        </Heading>
      <Flex color="white" justifyContent='space-between' margin='5' padding='10'>

          <Text color='black' fontSize="3xl">Lista de usuários</Text>
      <Button colorScheme='blue'>+</Button>
      </Flex>
      <VStack marginY="1rem" as="form" onSubmit={id ? handleSubmitUpdateClient :  handleSubmitCreate}>
        <InputForm 
          label="Nome" 
          name="name" 
          value={name} 
          type="text" 
          placeholder="Digite seu nome" 
          onChange={e => handleChangeName(e.target.value)} 
        />

        <InputForm 
          label="Email" 
          name="email" 
          value={email} 
          type="email" 
          placeholder="Digite seu email" 
          onChange={e => handleChangeEmail(e.target.value)} 
        />

        <Button fontSize="sm" marginY="5" color="white" type="submit" colorScheme="blue" alignSelf="flex-end">
          {id ? 'Atualizar': 'Cadastrar'}
        </Button>
      </VStack>

      <TableContainer>
      <Table variant='simple'>
        <TableCaption>Dados cadastrados</TableCaption>
        <Thead bgColor="blue.200">
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map(client => (
            <Tr key={client.email}>
              <Td>{client.name}</Td>
              <Td>{client.email}</Td>
              <Td>
                <Flex gap="2">
                  <Button onClick={() => handleShowUpdateClientForm(client)} colorScheme="orange" size="sm" fontSize="smaller" color="white">Editar</Button>
                  <Button onClick={() => handleDeleteClient(client._id)} colorScheme="red" size="sm" fontSize="smaller" color="white">Deletar</Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>

    </Box>
  )
}
