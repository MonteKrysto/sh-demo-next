import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from "@chakra-ui/react";

interface Props{
  onSubmit: (data: any) => void;
}

const Form: React.FC<Props> = ({ children, onSubmit}) => {
  const { register, handleSubmit, errors, formState } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  )
}

export { Form };
