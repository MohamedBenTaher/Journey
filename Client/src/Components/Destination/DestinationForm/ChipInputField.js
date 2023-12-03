import React from 'react';
import { Chip, TextField, Box } from '@mui/material';
import { useField } from 'formik';

function ChipInputField({ label, ...props }) {
  const [field, meta, helpers] = useField(props.name);
  console.log(field, helpers);
  const handleAddChip = (chip) => {
    const { tags } = field.value;
    helpers.setValue('tags', [...tags, chip]);
  };

  const handleDeleteChip = (tagToDelete) => {
    const tags = field.value || [];
    helpers.setValue(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box>
      <TextField
        label={label}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
            handleAddChip(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <Box>
        {field.value.tags &&
          field?.value.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteChip(tag)}
              variant="outlined"
              size="small"
              sx={{ marginRight: '4px', marginBottom: '4px' }}
            />
          ))}
      </Box>
    </Box>
  );
}
ChipInputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ChipInputField;
