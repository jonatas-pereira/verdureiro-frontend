/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { createProduct, showProduct, updateProduct } from "../../services/Api";
import { MdOutlineCreate, MdUpload } from "react-icons/md";
import styles from "./product.module.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useParams, useNavigate } from "react-router-dom";
import product from "../../assets/product.png";

const CreateProduct = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [image, setImage] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const produto = async () => {
      if (id) {
        try {
          const response = await showProduct(id, user.token);
          const { name, description, category, price, quantity, images } =
            response;
          setName(name);
          setDescription(description);
          setCategory(category);
          setPrice(price);
          setQuantity(quantity);
          setImage(images);
          setEdit(true);
        } catch (error) {
          console.error(error);
        }
      }
    };
    produto();
  }, [id, user.token]);

  let buttonText;
  if (id && loading) {
    buttonText = "Atualizando...";
  } else if (id) {
    buttonText = "Atualizar";
  } else if (loading) {
    buttonText = "Criando...";
  } else {
    buttonText = "Criar";
  }

  const handleProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    if (edit) {
      try {
        const response = await updateProduct(
          id,
          name,
          description,
          category,
          price,
          quantity,
          imageProduct,
          user.token
        );
        toast.success("Produto atualizado com sucesso");
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        toast.error("Falha ao atualizar produto, erro interno");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (
      name !== "" &&
      description !== "" &&
      category !== "" &&
      price !== null &&
      quantity !== null
    ) {
      try {
        await createProduct(
          name,
          description,
          category,
          price,
          quantity,
          user.token
        );
        toast.success("Produto criado com sucesso");
      } catch (error) {
        console.log(error);
        toast.error("Falha ao criar produto, verifique o nome se já existe");
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Preencha todos os campos");
    }
  };

  const handleFile = (e) => {
    // Tamanho máximo da imagem
    const maxFileSizeMB = 1; 
    if (e.target.files[0]) {
      const imageProduct = e.target.files[0];
      if (imageProduct.size > maxFileSizeMB * 1024 * 1024) {
        alert(`O arquivo deve ter no máximo ${maxFileSizeMB} MB.`);
        return;
      } else {
        setImageProduct(imageProduct);
        setImage(URL.createObjectURL(imageProduct));
      }

    }
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Title name={id ? "Editar produto" : "Criar Produto"}>
          <MdOutlineCreate color="#000" size={25} />
        </Title>
        <div className={styles.container}>
          <form className={styles.form_profile} onSubmit={handleProduct}>
            <label>Name:</label>
            <input
              value={name}
              type="text"
              placeholder="nome do produto"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Descrição:</label>
            <textarea
              className={styles.texDescription}
              value={description}
              rows="4"
              placeholder="descrição do produto"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Categoria:</label>
            <input
              value={category}
              type="text"
              placeholder="verdura ou legume"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label>Preço:</label>
            <input
              value={price}
              type="number"
              placeholder="preço do produto"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Quantidade:</label>
            <input
              value={quantity}
              type="number"
              placeholder="quantidade do produto"
              onChange={(e) => setQuantity(e.target.value)}
            />

            {edit && (
              <label className={styles.uploadImg}>
                <span>
                  <MdUpload color="#fff" size={25} />
                </span>
                <input type="file" accept="image/*" onChange={handleFile} />
                {image === null ? (
                  <img
                    src={product}
                    alt="nenhuma foto"
                    width={250}
                    height={250}
                  />
                ) : (
                  <img
                    src={image}
                    alt="nenhuma foto"
                    width={250}
                    height={250}
                  />
                )}
              </label>
            )}
            <button type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
