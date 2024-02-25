/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import styles from "./reservation.module.css";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiBookmark, FiSearch } from "react-icons/fi";
import { getReservations } from "../../services/Api";
import { format } from "date-fns";
import ModalReservation from "../../components/ModalReservation";

const Reservation = () => {
  const { user } = useContext(AuthContext);

  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await getReservations(user.token);
        setReservation([]);
        await updateState(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadReservations();
    return () => {};
  }, [user.token]);

  const updateState = async (data) => {
    const isReservationEmpty = data.size === 0;
    if (!isReservationEmpty) {
      let lista = [];
      data.forEach((item) => {
        lista.push({
          id: item.id,
          name: item.name,
          email: item.email,
          address: item.address,
          quantityReservation: item.quantityReservation,
          totalPrice: item.totalPrice,
          created_at: format(item.created_at, "MM/dd/yyyy"),
          produto: item.id_product.name,
          active: item.active ? "ATIVA" : "CANCELADA",
          contact: item.contact,
        });
      });
      console.log(lista);
      setReservation((reservation) => [...reservation, ...lista]);
    } else {
      setIsEmpty(true);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.content}>
          <Title name="Reservas">
            <FiBookmark color="#000" size={25} />
          </Title>
          <div className={`${styles.container} ${styles.dashboard}`}>
            <span>Buscando Reservas...</span>
          </div>
        </div>
      </div>
    );
  }

  const toggleModal = (item) => {
    setShowPostModal(!showPostModal);
    setDetail(item);
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Title name="Reservas">
          <FiBookmark color="#000" size={25} />
        </Title>

        <>
          {reservation.length === 0 ? (
            <div className={`${styles.container} ${styles.dashboard}`}>
              <span>Nenhuma reserva encontrada</span>
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Produto</th>
                    <th scope="col">Preço Total</th>
                    <th scope="col">Status</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {reservation.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Cliente">{item.name}</td>
                        <td data-label="Produto">{item.produto}</td>
                        <td data-label="PREÇO TOTAL">{item.totalPrice}$</td>
                        <td data-label="Status">{item.active}</td>
                        <td data-label="#">
                          <button
                            onClick={() => toggleModal(item)}
                            className={styles.action}
                            style={{ backgroundColor: "#4435d1" }}
                          >
                            <FiSearch color="#fff" size={17} />
                          </button>
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
        <ModalReservation
          conteudo={detail}
          close={() => setShowPostModal(!showPostModal)}
        />
      )}
    </div>
  );
};

export default Reservation;
