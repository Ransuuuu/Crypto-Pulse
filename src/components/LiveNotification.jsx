import { useCrypto } from "../context/CryptoContext";
import { useState, useEffect } from "react";

export default function LiveNotification() {
  const { notification } = useCrypto();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3800);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification && !visible) return null;

  return (
    <div
      className={
        `card notification text-center transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`
      }
    >
      🚨 {notification}
    </div>
  );
}