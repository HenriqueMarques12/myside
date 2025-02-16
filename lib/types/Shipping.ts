export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

export interface ShippingState {
  zipCode: string;
  selectedOption: string | null;
  options: ShippingOption[];
  isLoading: boolean;
  error: string | null;
}