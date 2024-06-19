import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";
import { tipOptions } from "../data/tips";

type OrderTipProps = {
  tip: number;
  dispatch: Dispatch<OrderActions>;
};

export const OrderTips = ({ tip, dispatch }: OrderTipProps) => {
  return (
    <div>
      <h3 className="font-black text-xl">Propinas:</h3>

      <form>
        {tipOptions.map((tipOption) => (
          <div key={tipOption.id} className="flex gap-2">
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
              type="radio"
              id={tipOption.id}
              name="tip"
              value={tipOption.value}
              // el signo de + convierte a numero el valor del input si es de tipo number
              onChange={(e) =>
                dispatch({
                  type: "add-tip",
                  payload: { value: +e.target.value },
                })
              }
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
};
