import { useAppSelector } from "../hooks";
import {
  filteredByCategory,
  sortByPrice,
  filterByRating,
  filterDataByPricing,
  filterBySearch,
} from '../utils/utilities';

const useFilteredData = () => {
    const data = useAppSelector(state => state.products.productsData);
    const loading = useAppSelector(state => state.products.loading);
    const userSearchValue = useAppSelector(state => state.products.searchValue);

    const selectedCategory = useAppSelector(state => state.filters.category);
    const selectedSortPrice = useAppSelector(state => state.filters.sortPrice);
    const selectedRating = useAppSelector(state => state.filters.rating);
    const selectedPricingCategory = useAppSelector(
      state => state.filters.pricing
    );


    const filteredDataByCategory = filteredByCategory(data, selectedCategory);

    const filteredDataByHL = sortByPrice(
      filteredDataByCategory,
      selectedSortPrice
    );

    const filteredDataByRating = filterByRating(
      filteredDataByHL,
      selectedRating
    );

    const filteredDataByPrice = filterDataByPricing(
      filteredDataByRating,
      selectedPricingCategory
    );

    const filteredData = filterBySearch(
      filteredDataByPrice,
      userSearchValue
    );

  return {
    filteredData,loading
  };
};

export default useFilteredData