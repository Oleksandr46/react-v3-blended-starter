import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import {  useState } from "react";
import Form from "../Form/Form";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";

export default function App() {

  const [photos, setPhotos]=useState<Photo[] | null>(null);
  const [isLoading, setIsLoading]=useState(false);
  // useEffect(() => {
  //   const getResponse = async () => {
  //     const response = await getPhotos("cat");
  //     console.log(response);
  //   };
  //   getResponse();
  // }, []);
  const handleSubmit = async (value: string) => {
    setIsLoading(true);
    try{
const response = await getPhotos(value);
    if (response.length===0){
      toast.error("Try another querry");
      setPhotos(null);
      return;
    }

    setPhotos(response);
    }
     catch (error){
console.error(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          <Toaster/>
          {isLoading && <Loader />}
         {photos && photos.length>0 && <PhotosGallery photos={photos}/>}
        </Container>
      </Section>
    </>
  );
}
