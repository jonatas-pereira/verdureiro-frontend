/* eslint-disable no-unused-vars */
import { useEffect, useState, } from "react";
import { getProducts} from "../../services/Api";
import { FiBookOpen, FiSearch, FiEdit2, FiX } from "react-icons/fi";
import styles from "./dashboard.module.css"
import Header from "../../components/Header";
import Title from "../../components/Title";
import {Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import Modal from "../../components/Modal";

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    const loadProducts = async() => {
      try {
        const data = await getProducts();
        setProducts([]);
        await updateState(data);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
    return () => {
      
    }
  }, []);

  
  const updateState = async (data) => {
    const isProductEmpty = data.size === 0;
    if (!isProductEmpty) {
      let lista = [];
      data.forEach((item) => {
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
      });
      setProducts(products => [...products, ...lista]);
    } else {
      setIsEmpty(true);
    }
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.content}>
          <Title name="Products">
            <FiBookOpen color="#000" size={25} />
          </Title>
          <div className={`${styles.container} ${styles.dashboard}`}>
            <span>Buscando Produtos...</span>
          </div>
        </div>
      </div>
    );
  }
  const toggleModal = (item) => {
    setShowPostModal(!showPostModal);
    setDetail(item);
  }

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Title name="Products">
          <FiBookOpen color="#000" size={25} />
        </Title>

        <>
          {products.length === 0 ? (
            <div className={`${styles.container} ${styles.dashboard}`}>
              <span>Nenhum produto encontrado</span>
              <Link to="/criar" className={styles.criar_produto}>
                <IoAdd color="#fff" size={25} />
                Criar Produto
              </Link>
            </div>
          ) : (
            <>
              <Link to="/criar" className={styles.criar_produto}>
                <IoAdd color="#fff" size={25} />
                Criar Produto
              </Link>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td data-label="Produto">{item.name}</td>
                          <td data-label="Categoria">{item.category}</td>
                          <td data-label="Preço">{item.price} </td>
                          <td data-label="Quantidade">{item.quantity}</td>
                          <td data-label="#">
                            <button
                              onClick={() => toggleModal(item)}
                              className={styles.action}
                              style={{ backgroundColor: "#4435d1" }}
                            >
                              <FiSearch color="#fff" size={17} />
                            </button>

                            <Link
                              to={`/criar/${item.id}`}
                              className={`${styles.action} ${styles.customButton}`}
                              style={{ backgroundColor: "#e8d106" }}
                            >
                              <FiEdit2 color="#fff" size={17} />
                            </Link>
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      </div>

      {showPostModal && (
        <Modal
          conteudo={detail}
          close={() => setShowPostModal(!showPostModal)}
        />
      )}
    </div>
  );
}

export default Dashboard
