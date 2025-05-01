import severinoImg1 from './severinoImg1.jpg';
import severinoImg2 from './severinoImg2.jpg';
import severinoImg3 from './severinoImg3.jpg';

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
  {
    id: 2,
    url: severinoImg2,
    alt: "Cachorro fofo",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 3,
    url: severinoImg3,
    alt: "Floresta densa",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 4,
    url: severinoImg3,
    alt: "Praia tropical",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 5,
    url: severinoImg2,
    alt: "Cidade à noite",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 6,
    url: severinoImg1,
    alt: "Cidade à noite",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 7,
    url: severinoImg3,
    alt: "Cidade à noite",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 8,
    url: severinoImg1,
    alt: "",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 9,
    url: severinoImg2,
    alt: "Cachorro fofo",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 10,
    url: severinoImg3,
    alt: "Floresta densa",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 11,
    url: severinoImg1,
    alt: "Praia tropical",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 12,
    url: severinoImg2,
    alt: "Cidade à noite",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 13,
    url: severinoImg1,
    alt: "Cidade à noite",
    title: "Severino Cavalcanti de Albuquerque"
  },
  {
    id: 14,
    url: severinoImg3,
    alt: "Cidade à noite",
    title: "Severino Cavalcanti de Albuquerque"
  }
];
