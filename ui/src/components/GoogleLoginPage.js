import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import DataForm from './form_inputs/DataForm';
import Input from './form_inputs/Input';
import Button from './common/Button';
import VideosContext from '../contexts/VideosContext';
import VideoLabel from './common/VideoLabel';

const GoogleLoginPage = () => {
  const handleSuccess = (teste) => console.log(teste);
  const {
    videos, getVideos, selectedVideos, isUrl,
  } = useContext(VideosContext);

  return (
    <DataForm>
      <GoogleLogin
        clientId="1015749006092-uv2bvjamsihv16u99redcsstnqqjj9vr.apps.googleusercontent.com"
        buttonText="Entrar com sua conta google"
        onSuccess={handleSuccess}
        onFailure={(aaa) => console.log(aaa)}
      />
      <Input
        type="text"
        name="search"
      />
      {selectedVideos.map((video, index) => (
        <div>
          <VideoLabel number={index + 1} label={video.snippet.title} />
        </div>
      ))}
      {
        isUrl ? <Button type="button">Adicionar</Button>
          : <Button type="submit">Pesquisar</Button>
      }
    </DataForm>
  );
};

export default GoogleLoginPage;
