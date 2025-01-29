import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function useFetchData({
  url,
  method,
}: {
  url: string;
  method: string;
}) {
  const [fetchedData, setFetchedData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState<any>({});

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios(url, { method });
        setFetchedData(response.data);
      } catch (err) {
        setErrors({
          message: (err as any).response?.data.error.message,
          type: (err as any).response?.data.error.details.type,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading, setFetchedData, setErrors, refetch]);

  return { fetchedData, isLoading, errors, setRefetch };
}
