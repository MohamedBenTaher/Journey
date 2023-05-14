import { Chip, TextField } from '@material-ui/core';
import { useField } from 'formik';

const ChipInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleDelete = (value) => {
    const currentValues = field.value.filter((v) => v !== value);
    helpers.setValue(currentValues);
  };

  const handleAdd = (event) => {
    const inputValue = event.target.value.trim();
    if (event.key === ' ' && inputValue !== '') {
      const currentValues = [...field.value, inputValue];
      helpers.setValue(currentValues);
      event.target.value = '';
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      onKeyDown={handleAdd}
      InputProps={{
        value: '',
        startAdornment: field.value.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDelete(tag)}
            style={{ margin: '4px' }}
          />
        )),
      }}
    />
  );
};

export default ChipInputField;
