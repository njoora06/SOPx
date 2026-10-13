"use client";

import { ToastContainer } from "react-toastify";

/**
 * The one toast container, mounted on the contact page only so other pages
 * don't load the toast library. Colours and offset are set in globals.css.
 */
export function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      theme="dark"
      newestOnTop
      closeOnClick
      pauseOnHover
      limit={3}
    />
  );
}
