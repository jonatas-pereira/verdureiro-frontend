/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getProducts } from "../../services/Api";
import CardProduct from "../../components/CardProducts";
import styles from "./verduras.module.css";
import { LiaSearchSolid } from "react-icons/lia";

const VerdurasProduct = ({filtro }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts([]);
        await updateState(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setIsLoading(false);
      }
    };

    
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]); 


  const updateState = async (data) => {
    const isProductEmpty = data.size === 0;

    if (!isProductEmpty) {
      let lista = [];
      const selectedCategory = `${filtro}`;

      data.forEach((item) => {
        if (
          selectedCategory === "" ||
          item.category.toLowerCase() === selectedCategory.toLowerCase()
        ) {
          lista.push({
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            quantity: item.quantity,
            image: item.images,
            created_at: item.created_at,
          });
        }
      });

      setProducts((products) => [...products, ...lista]);
    } else {
      setIsEmpty(true);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.quantity > 0
    );
    setFilteredProducts(filtered);
    setIsEmpty(filtered.length === 0);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className={styles.verdurasContainer}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className={styles.searchBtn} onClick={filterProducts}>
          <LiaSearchSolid color="#fff" size={15}/>
        </button>
      </div>
      <div className={styles.verduras}>
        {isLoading && <p className={styles.message}>Carregando...</p>}
        {!isLoading && isEmpty && (
          <p className={styles.message}>Nenhum produto encontrado.</p>
        )}
        {!isLoading &&
          !isEmpty &&
          filteredProducts.map((product, index) => (
            <CardProduct
              key={index}
              image={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              id={product.id}
            />
          ))}
      </div>
    </main>
  );
};

export default VerdurasProduct;
