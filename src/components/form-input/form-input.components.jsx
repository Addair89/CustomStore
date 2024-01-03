import {Group, Input, FormInputLabel} from './form-input.styles';

const FormInput = ({ lable, ...otherProps }) => {
    return (
        <Group>

            <Input {...otherProps} />
            {lable && (
              <FormInputLabel shrink={otherProps.value.length}>{lable}</FormInputLabel>
            )}
        </Group> 
    ) 
}

export default FormInput;