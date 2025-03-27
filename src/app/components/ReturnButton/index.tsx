'use client';

import { useRouter } from "next/navigation";

import Button from "../Button";
import { returnTransfer } from "./actions";
import { useState } from "react";

type Props = {
  transferId: string;
}

export default function ReturnButton({ transferId }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleReturn = async () => {
    setIsLoading(true);
    await returnTransfer(transferId);
    router.refresh();
    setIsLoading(false);
  };

  return <Button type="button" onClick={handleReturn} isLoading={isLoading}>Devolver</Button>;
} 