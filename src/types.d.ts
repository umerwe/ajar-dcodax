type ErrorResponse = {
  message: string;
};

interface DataProps {
  property: PropertyCardProps | RoomCardProps | AppartmentsCardProps | VehicleCardProps
}

interface AuthLayoutProps {
    FormComponent: ReactNode,
    isVerfication?: boolean
}

interface ListingProps {
  params: Promise<{
    id: string
    category: string
  }>
}

interface ListingData {
    id: string;
    title: string;
    images: string[];
    rating: number;
    reviewCount: number;
    area?: string;
    beds?: number;
    guests?: number;
    passengers?: number;
    features?: string[];
    freeCancellation?: boolean;
}

interface Listing  {
  ratings: {
    count: number;
    average: number;
  };
  _id: string;
  leaser: {
    _id: string;
    name: string;
    profilePicture: string;
    phone: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  status : string
  isGuestFavorite : string
  subCategory: {
    _id: string;
    name: string;
    type: "subCategory";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  zone: string;
  name: string;
  images: string[];
  description: string;
  address: string;
  price: number;
  isActive: boolean;
  language: string;
  fullName: string;
  facilities: string[];
  nearLocation: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

interface Favourite {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  listing: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
