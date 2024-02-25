import axios from "axios";

export const ApiUrl = "https://verdureiro-api.onrender.com";

const createUser = async (email, name, password, contact) => {
  try {
    const response = await axios.post(`${ApiUrl}/users`, {
      email: email,
      name: name,
      password: password,
      contact: contact,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${ApiUrl}/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const atualizarUser = async (name, contact, token) => {
  try {
    const response = await axios.patch(
      `${ApiUrl}/users/profile`,
      {
        name: name,
        contact: contact,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const createProduct = async (
  name,
  description,
  category,
  price,
  quantity,
  token
) => {
  try {
    const response = await axios.post(
      `${ApiUrl}/products`,
      {
        name: name,
        description: description,
        category: category,
        price: price,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getProducts = async () => {
  try {
    const response = await axios.get(`${ApiUrl}/products`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const showProduct = async (id, token) => {
  try {
    const response = await axios.get(`${ApiUrl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
const updateProduct = async (
  id,
  name,
  description,
  category,
  price,
  quantity,
  image,
  token
) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (image) {
      formData.append("images", image, image.name);
    }

    const response = await axios.patch(`${ApiUrl}/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};


const deleteProduct = async (id, token ) => {
  try {
    const response = await axios.delete(`${ApiUrl}/products/${id}`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    throw new Error(error.response.data);
  }
}

const getReservations = async (token) => {
  try {
    const response = await axios.get(`${ApiUrl}/reservations`,
      {
        headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

const deleteReservation = async (id, token) => {
  try {
    const response = await axios.delete(`${ApiUrl}/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const createReservation = async (
  id,
  name,
  email,
  address,
  quantityReservation,
  contact
) => {
  try {
    const response = await axios.post(`${ApiUrl}/reservations/${id}`, {
      name: name,
      email: email,
      address: address,
      quantityReservation: quantityReservation,
      contact: contact,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export {
  createUser,
  loginUser,
  atualizarUser,
  createProduct,
  getProducts,
  showProduct,
  updateProduct,
  deleteProduct,
  getReservations,
  deleteReservation,
  createReservation,
};
