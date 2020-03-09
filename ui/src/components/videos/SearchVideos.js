import React, { useContext } from 'react';
import { useFormikContext } from 'formik';
import { Input } from '../form_inputs';
import Button from '../common/Button';
import VideosContext from '../../contexts/VideosContext';

const SearchVideos = () => {
  const { setFieldValue } = useFormikContext();
  const {
    isValueURL, isUrl, getVideos, values,
  } = useContext(VideosContext);

  const urlVideoSearch = () => {
    setFieldValue('search', '');
    getVideos(values);
  };

  return (
    <div className="flex items-center">
      <Input
        onChange={isValueURL}
        type="text"
        name="search"
        placeholder="link ou título do vídeo"
      />
      {isUrl ? (
        <Button
          action="primary"
          type="button"
          onClick={urlVideoSearch}
        >
          Adicionar
        </Button>
      ) : (
        <Button action="primary" type="submit">
          Buscar
        </Button>
      )}
    </div>
  )
}

export default SearchVideos;
