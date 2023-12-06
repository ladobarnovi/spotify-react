import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ELayout, setGlobalLayout } from "store/global/globalSlice";

export function useLayout() {
  const dispatch = useDispatch();
  const layout = useSelector((state: RootState) => state.globalReducer.globalLayout);

  function setLayout(newLayout: ELayout): void {
    dispatch(setGlobalLayout(newLayout));
  }

  return {
    layout,
    setLayout,
  }
}
