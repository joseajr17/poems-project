import severinoImg1 from './severinoImg1.jpg';
// import severinoImg2 from './severinoImg2.jpg';
import severinoImg3 from './severinoImg3.jpg';
import severinoImg4 from './severinoImg4.jpg';


export interface Photo {
  id: number;
  url: string;
  alt: string;
  title: string;
}

export const photosMock: Photo[] = [
  {
    id: 1,
    url: severinoImg1,
    alt: "",
    title: "Severino Cavalcanti de Albuquerque"
  },
  // {
  //   id: 2,
  //   url: severinoImg2,
  //   alt: "Cachorro fofo",
  //   title: "Severino Cavalcanti de Albuquerque"
  // },
  {
    id: 3,
    url: severinoImg3,
    alt: "Floresta densa",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 4,
    url: severinoImg4,
    alt: "Praia tropical",
    title: "Severino Cavalcanti de Albuquerque"
  },
  

];
