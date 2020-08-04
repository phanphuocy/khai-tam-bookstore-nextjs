import React, { useEffect } from "react";
import { useAuth } from "../contexts/userContext";
import { useRouter } from "next/router";

export default function ProtectRoute(Component) {
  return () => {
    const { authenticated, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return <div>LOADING FROM ROUTE</div>;
    }

    useEffect(() => {
      if (!authenticated && !loading) router.push("/dang-nhap");
    }, [loading, authenticated]);

    return <Component {...arguments} />;
  };
}
