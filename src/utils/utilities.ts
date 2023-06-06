import { ProductData } from '../features/products/productsSlice';
import { Category, SortPrice } from '../features/filters/filterSlice';

export const titleShortner = (title: string,num:number) => {
  const originalTitle = title.split(' ');
  const requiredTitle = originalTitle?.slice(0, num).join(' ');
  return requiredTitle;
};

export const filteredByCategory = (
  data: ProductData[],
  selectedCategory: Category
) => {
  if (selectedCategory === 'Show All Products') return data;

  const filteredData = data.filter(item => item.category === selectedCategory);
  return filteredData;
};

export const sortByPrice = (data: ProductData[], sortFrom: SortPrice) => {
  if (sortFrom === 'HIGH_TO_LOW') {
   
    return [...data].sort((a, b) => b.price - a.price);
  } else if (sortFrom === 'LOW_TO_HIGH') {
    
    return [...data].sort((a, b) => a.price - b.price);
  }
  return data;
};

export const filterByRating = (data: ProductData[], rating: number) => {
  return data.filter(item => rating >= item.rating.rate);
};

export const filterDataByPricing = (data: ProductData[], pricing: string) => {
  switch (pricing) {
    case 'Below 200':
      return data.filter(item => item.price < 200);

    case '200 - 400':
      return data.filter(
        product => product.price >= 200 && product.price < 400
      );

    case '400 - 600':
      return data.filter(
        product => product.price >= 400 && product.price < 600
      );

    case '600 - 800':
      return data.filter(
        product => product.price >= 600 && product.price < 800
      );

    case 'Above 800':
      return data.filter(product => product.price >= 800);

    default:
      return data;
  }
};

export const filterBySearch = (data:ProductData[], searchFor:string) => {
  if (searchFor === '') {
    return data;
  } else {
    return data.filter(item =>
      item.title.toLowerCase().includes(searchFor.toLowerCase())
    );
  }
};

