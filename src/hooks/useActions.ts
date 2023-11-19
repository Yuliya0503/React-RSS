import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from './reduxHoooks';
import { setPageItems } from '../Store/Reducers/PageSliceReduser';
import {
  loadingSearchPage,
  loadingdetails,
} from '../Store/Reducers/loadingReduser';
import {
  setRootSearch,
  setSearchCleared,
} from '../Store/Reducers/SearchReduser';
import { pageCurrentUpdate } from '../Store/Reducers/PageCurrentSlice';

interface Actions {
  setPageItems: typeof setPageItems;
  loadingdetails: typeof loadingdetails;
  loadingSearchPage: typeof loadingSearchPage;
  setRootSearch: typeof setRootSearch;
  setSearchCleared: typeof setSearchCleared;
  pageCurrentUpdate: typeof pageCurrentUpdate;
}

const useActions = (): Actions => {
  const dispatch = useAppDispatch();

  return bindActionCreators(
    {
      setPageItems,
      loadingdetails,
      loadingSearchPage,
      setRootSearch,
      setSearchCleared,
      pageCurrentUpdate,
    },
    dispatch
  );
};

export default useActions;
