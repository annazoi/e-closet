import {
  Input as ChakraInput,
  Text,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  useColorModeValue,
} from "@chakra-ui/react";

type InputProps = {
  numberInput?: number;
  text?: string;
  placeholder?: string;
  register?: any;
  error?: any;
} & React.ComponentProps<typeof ChakraInput>;

const Input: React.FC<InputProps> = ({
  numberInput,
  text,
  placeholder,
  register,
  error,
}) => {
  return (
    <>
      {!numberInput ? (
        <>
          <Text mb={2}>{text}</Text>
          <ChakraInput
            {...register}
            {...error}
            mb={5}
            boxShadow={`0 2px 15px 0 ${useColorModeValue("pink", "white")}`}
            placeholder={placeholder}
          />
        </>
      ) : (
        <>
          <Text mb={2}>{text}</Text>
          <NumberInput
            boxShadow={`0 2px 15px 0 ${useColorModeValue("pink", "white")}`}
            defaultValue={numberInput}
            min={5}
            mb={5}
            {...register}
            {...error}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </>
      )}
    </>
  );
};

export default Input;
