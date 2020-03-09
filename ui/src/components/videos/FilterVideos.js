import React, { useContext } from 'react';
import { Input } from '../form_inputs'
import Button from '../common/Button';
import { useFormikContext } from 'formik';
import VideosContext from '../../contexts/VideosContext';

const FilterVideos = () => {
  const { handleFilter } = useContext(VideosContext);
  const { values } = useFormikContext();

  return (
    <div className="flex items-center">
      <Input
        type="text"
        name="filter"
        placeholder="palavras-chave"
      />
      <Button type="button" onClick={() => handleFilter(values)}>Filtrar</Button>
    </div>
  )
}

export default FilterVideos;
