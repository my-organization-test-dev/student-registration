export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  department: 'CS' | 'IT' | 'SW';
  fileName: string;
  address: Address;
}

export interface Address {
  email: string;
  phoneNumber: string;
  city: string;
  subCity: string;
}
