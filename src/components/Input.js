import { FormControl, Input } from '@chakra-ui/react'


export const InputForm = ({ label, name, ...rest }) => {

  return (
    <FormControl id="email" marginY="2rem">
      <formLabel>{label}</formLabel>
      <Input name={name} id={name} {...rest} />
    </FormControl>

  );
}