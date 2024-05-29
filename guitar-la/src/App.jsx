import { useState } from "react";
import { Footer, Guitar, Header } from "./components";
import { db } from "./data/db";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  const addToCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    //* existe en el carrito de compras
    if (itemExist >= 0) {
      //* no permite adicionar mas productos que el maximo permitido
      if (cart[itemExist].quantity < MAX_ITEMS) {
        const updatedCart = [...cart];
        updatedCart[itemExist].quantity++;
        setCart(updatedCart);
      }
    } else {
      //* no existe en el carrito de compras
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const increaseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const decreaseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
