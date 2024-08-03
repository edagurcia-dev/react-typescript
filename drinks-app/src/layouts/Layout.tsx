import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { Header, Modal, Notification } from "../components";

export const Layout = () => {
  const loadFavoritesFromLocal = useAppStore(
    (state) => state.loadFavoritesFromLocal
  );

  useEffect(() => {
    loadFavoritesFromLocal();
  }, []);

  return (
    <>
      <Header />

      <main className="container mx-auto py-16">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
};
