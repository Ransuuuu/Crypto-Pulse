import { useCrypto } from "../context/CryptoContext";

export default function LiveNotification() {
  const { notification } = useCrypto();

  if (!notification) return null;

  return (
    <div className="card notification text-center">
      🚨 {notification}
    </div>
  );
}