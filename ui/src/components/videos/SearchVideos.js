import React, { useContext } from 'react';
import { useFormikContext } from 'formik';
import { Input } from '../form_inputs';
import Button from '../common/Button';
import VideosContext from '../../contexts/VideosContext';
import FormVideo from './FormVideo';

const SearchVideos = () => {
  const { setFieldValue, values } = useFormikContext();
  const {
    isValueURL, isUrl, getVideos, loadingVideos,
  } = useContext(VideosContext);

  const urlVideoSearch = () => {
    setFieldValue('search', '');
    getVideos(values);
  };

  return (
    <FormVideo>
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
          disabled={loadingVideos}
        >
          Adicionar
        </Button>
      ) : (
        <Button action="primary" type="submit" disabled={loadingVideos}>
          Buscar
        </Button>
      )}
    </FormVideo>
  );
};

export default SearchVideos;
