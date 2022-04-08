import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux';

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
