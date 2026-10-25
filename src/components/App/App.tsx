import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import { useEffect } from "react";
import Form from "../Form/Form";

export default function App() {
  // useEffect(() => {
  //   const getResponse = async () => {
  //     const response = await getPhotos("cat");
  //     console.log(response);
  //   };
  //   getResponse();
  // }, []);
  const handleSubmit = async (value: string) => {
    const response = await getPhotos(value);
    console.log(response);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
        </Container>
      </Section>
    </>
  );
}
