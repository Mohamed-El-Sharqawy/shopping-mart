import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../shared/hooks/useProducts";

export default function useProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();

  const product = products.find(p => p.id === parseInt(id || '0'));

  const handleBackToProducts = () => {
    navigate('/');
  };

  return {
    product,
    isLoading,
    handleBackToProducts,
  };
}
