import { Button } from "ui";
import { useHelloQuery } from "../src/store/services/api";

export default function Web() {
  const { data } = useHelloQuery();

  return (
    <div>
      <h1>{data?.message}</h1>
      <Button />
    </div>
  );
}
