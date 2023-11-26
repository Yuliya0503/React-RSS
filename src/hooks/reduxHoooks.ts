import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/RootReducer';
import { AppDispatch } from '../Store/Store';
import useActions from './useActions';

export {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useActions };
