import { ShippingService } from '@/lib/services/api/ShippingService';

describe('ShippingService', () => {
  let shippingService: ShippingService;
  
  beforeEach(() => {
    shippingService = new ShippingService();
  });

  it('validates zip code format correctly', () => {
    expect(shippingService.validateZipCode('12345678')).toBe(true);
    expect(shippingService.validateZipCode('1234567')).toBe(false);
    expect(shippingService.validateZipCode('123456789')).toBe(false);
    expect(shippingService.validateZipCode('1234567a')).toBe(false);
  });

  it('formats zip code correctly', () => {
    expect(shippingService.formatZipCode('12345-678')).toBe('12345678');
    expect(shippingService.formatZipCode('12.345-678')).toBe('12345678');
    expect(shippingService.formatZipCode('12345678')).toBe('12345678');
  });

  it('calculates shipping options', async () => {
    const options = await shippingService.calculateShipping('12345678');
    
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveProperty('name', 'PAC');
    expect(options[1]).toHaveProperty('name', 'SEDEX');
  });

  it('returns shipping options with correct structure', async () => {
    const options = await shippingService.calculateShipping('12345678');
    
    options.forEach(option => {
      expect(option).toHaveProperty('id');
      expect(option).toHaveProperty('name');
      expect(option).toHaveProperty('price');
      expect(option).toHaveProperty('deliveryTime');
    });
  });
});