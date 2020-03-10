import React, { useContext } from 'react';
import { get } from 'lodash';
import { useFormikContext } from 'formik';
import { Input } from '../form_inputs';
import Button from '../common/Button';
import VideosContext from '../../contexts/VideosContext';
import FormVideo from './FormVideo';

const FilterVideos = () => {
  const { handleFilter, isFiltering } = useContext(VideosContext);
  const { values, setFieldValue } = useFormikContext();

  const FilterValues = () => {
    if (isFiltering) {
      setFieldValue('filter', '');
    }
    handleFilter(values);
  };

  return (
    <FormVideo>
      <Input
        type="text"
        name="filter"
        placeholder="palavras-chave"
      />
      <Button disabled={!get(values, 'filter', '')} type="button" onClick={FilterValues}>
        {isFiltering ? 'Limpar filtro' : 'Filtrar'}
      </Button>
    </FormVideo>
  );
};

export default FilterVideos;
