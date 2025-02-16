import { ShippingOption } from '@/lib/types/Shipping';

export class ShippingService {
  async calculateShipping(zipCode: string): Promise<ShippingOption[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const options: ShippingOption[] = [
      {
        id: 'PAC',
        name: 'PAC',
        price: 15.90,
        deliveryTime: '5 a 8 dias úteis',
      },
      {
        id: 'SEDEX',
        name: 'SEDEX',
        price: 25.90,
        deliveryTime: '2 a 4 dias úteis',
      },
    ];

    return options;
  }

  validateZipCode(zipCode: string): boolean {
    const zipCodeRegex = /^[0-9]{8}$/;
    return zipCodeRegex.test(zipCode);
  }

  formatZipCode(zipCode: string): string {
    return zipCode.replace(/\D/g, '');
  }
}