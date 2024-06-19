import { useMemo, Dispatch } from "react";
import type { OrderItemT } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";

type ItemTotalProps = {
  order: OrderItemT[];
  tip: number;
  dispatch: Dispatch<OrderActions>;
};

export const OrderTotals = ({ order, tip, dispatch }: ItemTotalProps) => {
  const subTotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order]);

  const totalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-xl">Totales y propinas:</h2>
        <p>
          Subtotal a pagar:{" "}
          <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
        </p>
        <p>
          Propina:{" "}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Total a pagar:{" "}
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        type="button"
        className="bg-black text-white w-full p-2 mt-5 disabled:opacity-20 uppercase"
        disabled={totalAmount === 0}
        onClick={() => dispatch({ type: "place-order" })}
      >
        Guardar orden
      </button>
    </>
  );
};
