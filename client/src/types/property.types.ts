export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GetAllPropertiesResponseData = Property[];

