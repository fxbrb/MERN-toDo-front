import axios from "axios";

export async function updateUser(updateInfos, id) {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/user/update/${id}`,
      updateInfos,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(id) {
  try {
    const { data } = await axios.delete(`/api/user/delete/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
