import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { OrderItemT } from "../types";
import { OrderActions } from "../reducers/order-reducer";

type OrderContentProps = {
  order: OrderItemT[];
  dispatch: Dispatch<OrderActions>;
};

export const OrderContent = ({ order, dispatch }: OrderContentProps) => {
  return (
    <div>
      <h2 className="text-2xl font-black">Consumo</h2>

      <div className="space-y-3 mt-2">
        {order.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-t border-slate-400 py-2 last-of-type:border-b"
          >
            <div>
              <p>
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className="font-black">
                Cantidad: {item.quantity} -{" "}
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            <button
              type="button"
              className="bg-red-500 h-8 w-8 text-white rounded-full"
              onClick={() =>
                dispatch({ type: "remove-item", payload: { id: item.id } })
              }
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
